use quote::quote;

pub fn get_upload_assets() -> proc_macro2::TokenStream {
    quote! {
        #[ic_cdk_macros::update]
        pub fn upload_asset(
            dest_path: String,
            timestamp: u64,
            chunk_number: u64,
            asset_bytes: Vec<u8>,
            total_len: u64,
        ) {
            let is_current_time_stamp = UPLOADED_ASSETS_TIMESTAMP.with(|upload_assets_timestamp_map| {
                let mut upload_assets_timestamp_map_mut = upload_assets_timestamp_map.borrow_mut();
                let upload_assets_timestamp = match upload_assets_timestamp_map_mut.get_mut(&dest_path) {
                    Some(timestamp) => timestamp,
                    None => &0,
                };

                if timestamp > *upload_assets_timestamp {
                    upload_assets_timestamp_map_mut.insert(dest_path.clone(), timestamp);
                    clear_asset_data(&dest_path);
                } else if timestamp < *upload_assets_timestamp {
                    // The request is from an earlier upload attempt. Disregard
                    return false;
                }
                true
            });

            if !is_current_time_stamp {
                return;
            }

            let uploaded_asset_len = add_asset_data(&dest_path, asset_bytes, chunk_number) as u64;

            ic_cdk::println!(
                "Length: {}/{} ",
                bytes_to_human_readable(uploaded_asset_len),
                bytes_to_human_readable(total_len)
            );

            if uploaded_asset_len == total_len {
                let delay = core::time::Duration::new(0, 0);
                let write_closure = move || write_file_by_parts(dest_path);
                ic_cdk_timers::set_timer(delay, write_closure);
            }
        }

        fn write_file_by_parts(dest_path: String) {
            let bytes_per_chunk = UPLOADED_ASSETS.with(|uploaded_assets| {
                match uploaded_assets.borrow().get(&dest_path).unwrap().get(&0) {
                    Some(first_bytes) => first_bytes.len(),
                    None => 0,
                }
            });

            // TODO Before having the stable file storage hooked up 100 worked. For right now 25 seems to be working. I think we could do more but I want to get everything in place before spending a lot of time fine tuning it
            let limit = 25 * 1024 * 1024; // The limit is somewhere between 150 and 155 before we run out of instructions.
            let group_size = limit / bytes_per_chunk;

            let dir_path = std::path::Path::new(dest_path.as_str()).parent().unwrap();

            std::fs::create_dir_all(dir_path).unwrap();

            // Create the file, or clear it if it already exists
            std::fs::OpenOptions::new()
                .write(true)
                .truncate(true)
                .create(true)
                .open(&dest_path)
                .unwrap();

            let delay = core::time::Duration::new(0, 0);
            let closure = move || write_group_of_file_chunks(dest_path, 0, group_size);
            ic_cdk_timers::set_timer(delay, closure);
        }

        fn write_group_of_file_chunks(dest_path: String, start_chunk: usize, group_size: usize) {
            // TODO I am assuming this function to be called by write_file_by_parts so when we get here the file should already exist and be empty and ready to write to. That way we don't have to worry about clearing the file on the first write or anything like that.
            let write_complete = UPLOADED_ASSETS.with(|uploaded_assets| {
                if start_chunk == 0 {
                    ic_cdk::println!("START writing: {}", dest_path);
                } else {
                    ic_cdk::println!("Continue writing: {}", dest_path);
                }
                let chunk_of_bytes: Vec<u8> = uploaded_assets
                    .borrow()
                    .get(&dest_path)
                    .unwrap()
                    .into_iter()
                    .skip(start_chunk)
                    .take(group_size)
                    .flat_map(|(_, bytes)| bytes.clone())
                    .collect();

                ic_cdk::println!(
                    "Preparing to write {} bytes to {}",
                    bytes_to_human_readable(chunk_of_bytes.len() as u64),
                    dest_path
                );

                let mut file = std::fs::OpenOptions::new()
                    .write(true)
                    .append(true)
                    .open(&dest_path)
                    .unwrap();

                std::io::Write::write_all(&mut file, &chunk_of_bytes).unwrap();

                let total_chunk_count = uploaded_assets.borrow().get(&dest_path).unwrap().len();
                ic_cdk::print(format!(
                    "{} of {} chunks written!",
                    start_chunk + group_size,
                    total_chunk_count
                ));
                // flush the buffer to ensure all data is written immediately
                std::io::Write::flush(&mut file).unwrap();

                if start_chunk + group_size >= total_chunk_count {
                    ic_cdk::println!(
                        "{} + {} = {} >= {}",
                        start_chunk,
                        group_size,
                        start_chunk + group_size,
                        total_chunk_count
                    );
                    ic_cdk::println!("Finished writing to {}", dest_path);
                    let mut uploaded_assets_mut = uploaded_assets.borrow_mut();
                    uploaded_assets_mut.remove(&dest_path);
                    if uploaded_assets_mut.len() == 0 {
                        ic_cdk::println!("All assets uploaded and cache is cleared.");
                    }
                    true
                } else {
                    false
                }
            });

            let delay = core::time::Duration::new(0, 0);
            if !write_complete {
                let closure =
                    move || write_group_of_file_chunks(dest_path, start_chunk + group_size, group_size);
                ic_cdk_timers::set_timer(delay, closure);
            } else {
                let hash_closure = move || hash_file(dest_path);
                ic_cdk_timers::set_timer(delay, hash_closure);
            }
        }

        pub fn bytes_to_human_readable(size_in_bytes: u64) -> String {
            let suffixes = ["B", "KiB", "MiB", "GiB"];
            let mut size = size_in_bytes as f64;

            for suffix in suffixes.iter() {
                if size < 1024.0 {
                    return format!("{:.2} {}", size as f64, suffix);
                }
                size /= 1024.0;
            }

            format!("{:.2} {}", size as f64, suffixes.last().unwrap())
        }

        fn clear_asset_data(dest_path: &String) {
            UPLOADED_ASSETS.with(|upload_assets| {
                let mut upload_assets_mut = upload_assets.borrow_mut();
                match upload_assets_mut.get_mut(dest_path) {
                    Some(uploaded_asset) => uploaded_asset.clear(),
                    None => (),
                }
            });
        }

        // Adds the given asset_bytes to the dest_path asset at the chunk number position. Returns the new total length of dest_path asset after the addition
        fn add_asset_data(dest_path: &String, asset_bytes: Vec<u8>, chunk_number: u64) -> usize {
            UPLOADED_ASSETS.with(|uploaded_assets| {
                let mut uploaded_assets_mut = uploaded_assets.borrow_mut();
                if let Some(bytes_map) = uploaded_assets_mut.get_mut(dest_path) {
                    // If the key exists, insert the value into the inner HashMap
                    bytes_map.insert(chunk_number, asset_bytes);
                    ic_cdk::println!(
                        "File: {}. Chunk: {}. Total chunks processed: {}",
                        dest_path,
                        chunk_number,
                        bytes_map.len()
                    );
                    bytes_map.values().fold(0, |acc, bytes| acc + bytes.len())
                } else {
                    // If the key doesn't exist, initialize a new inner BTreeMap and insert the value
                    let mut new_bytes_map = std::collections::BTreeMap::new();
                    let len = asset_bytes.len();
                    new_bytes_map.insert(chunk_number, asset_bytes);
                    uploaded_assets_mut.insert(dest_path.clone(), new_bytes_map);
                    ic_cdk::println!("First chunk processed for {}", dest_path);
                    len
                }
            })
        }
    }
}
