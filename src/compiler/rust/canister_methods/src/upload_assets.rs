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
                delete_temp_chunks(&dest_path);
            } else if timestamp < *upload_assets_timestamp {
                // The request is from an earlier upload attempt. Disregard
                return false;
            }
            true
        });

        if !is_current_time_stamp {
            return;
        }

        let uploaded_asset_len = write_temp_chunk(&dest_path, asset_bytes, chunk_number) as u64;

        ic_cdk::println!(
            "Length: {}/{} ",
            bytes_to_human_readable(uploaded_asset_len),
            bytes_to_human_readable(total_len)
        );

        if uploaded_asset_len == total_len {
            ic_cdk::println!("UPLOAD COMPLETE for {}", dest_path);
            ic_cdk::println!("{} chunks uploaded for {}", get_total_chunks(dest_path), dest_path);
            let delay = core::time::Duration::new(0, 0);
            let write_closure = move || write_file_by_parts(dest_path);
            ic_cdk_timers::set_timer(delay, write_closure);
        }
    }

    fn write_file_by_parts(dest_path: String) {
        let bytes_per_chunk = get_first_chunk_size(&dest_path);

        // TODO Before having the stable file storage hooked up 100 worked. For right now 25 seems to be working. I think we could do more but I want to get everything in place before spending a lot of time fine tuning it
        let limit: u64 = 25 * 1024 * 1024; // The limit is somewhere between 150 and 155 before we run out of instructions.
        let group_size = limit / bytes_per_chunk as u64;

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

    fn write_group_of_file_chunks(dest_path: String, start_chunk: u64, group_size: u64) {
        // TODO I am assuming this function to be called by write_file_by_parts so when we get here the file should already exist and be empty and ready to write to. That way we don't have to worry about clearing the file on the first write or anything like that.
        if start_chunk == 0 {
            ic_cdk::println!("START writing: {}", dest_path);
        } else {
            ic_cdk::println!("Continue writing: {}", dest_path);
        }
        let chunk_of_bytes: Vec<u8> = read_temp_chunks(&dest_path, start_chunk, group_size);

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

        let total_chunk_count = get_total_chunks(&dest_path);
        ic_cdk::print(format!(
            "{} of {} chunks written!",
            start_chunk + group_size,
            total_chunk_count
        ));
        // flush the buffer to ensure all data is written immediately
        std::io::Write::flush(&mut file).unwrap();

        let delay = core::time::Duration::new(0, 0);
        if start_chunk + group_size >= total_chunk_count {
            ic_cdk::println!(
                "{} + {} = {} >= {}",
                start_chunk,
                group_size,
                start_chunk + group_size,
                total_chunk_count
            );
            ic_cdk::println!("Finished writing to {}", dest_path);
            delete_temp_chunks(&dest_path);
            let hash_closure = move || hash_file(dest_path);
            ic_cdk_timers::set_timer(delay, hash_closure);
        } else {
            let closure =
                move || write_group_of_file_chunks(dest_path, start_chunk + group_size, group_size);
            ic_cdk_timers::set_timer(delay, closure);
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

    // Adds the given asset_bytes to the dest_path asset at the chunk number position. Returns the new total length of dest_path asset after the addition
    fn write_temp_chunk(dest_path: &String, asset_bytes: Vec<u8>, chunk_number: u64) -> u64 {
        let file_path = format!("{}.chunk.{}", dest_path, chunk_number);
        ic_cdk::println!("writing chunk {} of {} to {}", chunk_number, dest_path, file_path);
        let mut options = std::fs::OpenOptions::new();
        options.create(true).write(true);

        let dir_path = std::path::Path::new(dest_path.as_str()).parent().unwrap();
        std::fs::create_dir_all(dir_path).unwrap();

        let mut file = options.open(&file_path).unwrap();
        std::io::Write::write_all(&mut file, &asset_bytes).unwrap();

        let total_bytes = FILE_INFO.with(|total_bytes_received| {
            let mut total_bytes_received_mut = total_bytes_received.borrow_mut();
            let (chunks, total_bytes) = total_bytes_received_mut
                .entry(dest_path.to_owned())
                .or_insert((0, 0));
            *total_bytes += asset_bytes.len() as u64;
            *chunks += 1;
            total_bytes.clone()
        });
        get_total_chunks(dest_path);

        ic_cdk::println!(
            "File: {}. Chunk: {}. Total chunks processed: {}",
            dest_path,
            chunk_number,
            total_bytes
        );

        total_bytes
    }

    fn get_total_chunks(file_name: &str) -> u64 {
        let (chunks, total_bytes_received) = FILE_INFO.with(|file_info| {
            file_info.borrow().get(file_name).unwrap().clone()
        });
        ic_cdk::println!("Chunks: {} | Total Bytes: {}", chunks, total_bytes_received);
        chunks
    }

    // Reads and concatenates ordered chunks from the file system. Returns the data.
    fn read_temp_chunks(dest_path: &str, start_chunk: u64, num_chunks: u64) -> Vec<u8> {
        let mut all_data = Vec::new();
        for chunk_num in start_chunk..(start_chunk + num_chunks) {
            let chunk_path = format!("{}.chunk.{}", dest_path, chunk_num);
            ic_cdk::println!("Reading from {}", chunk_path);
            let mut file = std::fs::File::open(&chunk_path).unwrap();
            let mut chunk_data = Vec::new();
            std::io::Read::read_to_end(&mut file, &mut chunk_data).unwrap();
            all_data.extend_from_slice(&chunk_data);
        }
        all_data
    }

    fn delete_temp_chunks(file_name: &str) {
        // TODO figure out how to delete all of the chunks
        // Construct the base directory for chunks
        let chunk_dir = format!("{}.chunks", file_name);

        // Attempt to remove all files within the chunk directory
        // for entry in std::fs::read_dir(&chunk_dir).unwrap() {
        //     let entry = entry.unwrap();
        //     let path = entry.path();
        //     if path.is_file() {
        //         std::fs::remove_file(path).unwrap();
        //     }
        // }

        // Finally, remove the empty chunk directory
        // std::fs::remove_dir_all(chunk_dir).unwrap();
        ic_cdk::println!("Deleted all chunks for {}", file_name);
    }

    // Gets the size of the first chunk for a file. Returns the size in bytes or an error.
    fn get_first_chunk_size(file_path: &str) -> u64 {
        read_temp_chunks(file_path, 0, 1).len() as u64
    }

    }
}
