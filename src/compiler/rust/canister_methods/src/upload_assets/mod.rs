pub mod temp_chunks;

use quote::quote;

pub fn get_upload_assets() -> proc_macro2::TokenStream {
    let temp_chunks_utils = temp_chunks::get_temp_chunk_utils();

    quote! {
    #temp_chunks_utils

    #[ic_cdk_macros::update]
    pub fn upload_asset(
        dest_path: String,
        timestamp: u64,
        chunk_number: u64,
        asset_bytes: Vec<u8>,
        total_len: u64,
    ) {
        let is_current_timestamp = verify_latest_version(&dest_path, timestamp);

        if !is_current_timestamp {
            return;
        }

        let uploaded_asset_len = match write_temp_chunk(&dest_path, asset_bytes, chunk_number) {
            Ok(len) => len as u64,
            Err(err) => {
                ic_cdk::println!("Error writing temp chunk: {}", err);
                panic!("{}", err)
            }
        };

        match test_read_temp_chunk(&dest_path, chunk_number, false) {
            Ok(_) => (),
            Err(err) => panic!("There was a problem with the verification: {}", err),
        };

        ic_cdk::println!(
            "Uploaded: {} | Length: {}/{} ",
            format_chunk_path(&dest_path, chunk_number),
            bytes_to_human_readable(uploaded_asset_len),
            bytes_to_human_readable(total_len)
        );

        if uploaded_asset_len == total_len {
            ic_cdk::println!(
                "UPLOAD OF ALL {} CHUNKS COMPLETE for {}",
                get_total_chunks(&dest_path),
                dest_path
            );
            let delay = core::time::Duration::new(0, 0);
            ic_cdk::println!("Spawning writer for {}", dest_path);
            let write_closure = move || write_file_by_parts(dest_path);
            ic_cdk_timers::set_timer(delay, write_closure);
        }
    }

    fn write_file_by_parts(dest_path: String) {
        let bytes_per_chunk = get_first_chunk_size(&dest_path);

        // TODO Before having the stable file storage hooked up 100 worked. For right now 50 seems to be working. It may need to be less once we have more file writing involved
        let total_chunks = get_total_chunks(&dest_path);
        let limit: u64 = 50 * 1024 * 1024; // The limit is somewhere between 150 and 155 before we run out of instructions.
        let group_size = std::cmp::min(total_chunks, limit / bytes_per_chunk as u64);

        let dir_path = std::path::Path::new(dest_path.as_str()).parent().unwrap();

        std::fs::create_dir_all(dir_path).unwrap();

        // Create the file, or clear it if it already exists
        let file = std::fs::OpenOptions::new()
            .write(true)
            .truncate(true)
            .create(true)
            .open(&dest_path)
            .unwrap();

        drop(file); // Only open the file long enough to create it

        let delay = core::time::Duration::new(0, 0);
        let closure = move || write_group_of_file_chunks(dest_path, 0, group_size);
        ic_cdk_timers::set_timer(delay, closure);
    }

    fn write_group_of_file_chunks(dest_path: String, start_chunk: u64, group_size: u64) {
        // TODO I am assuming this function to be called by write_file_by_parts so when we get here the file should already exist and be empty and ready to write to. That way we don't have to worry about clearing the file on the first write or anything like that.
        let chunk_of_bytes = match read_temp_chunks(&dest_path, start_chunk, group_size) {
            Ok(bytes) => bytes,
            Err(err) => {
                ic_cdk::println!("Error reading temp chunks: {}", err);
                panic!("{}", err)
            }
        };
        debug("Finish chunk read");

        if let Err(err) = append_chunk_to(&dest_path, &chunk_of_bytes) {
            ic_cdk::println!(
                "Failed to write chunks {}-{} to {}. {}",
                start_chunk,
                start_chunk + group_size,
                dest_path,
                err
            );
            panic!("{}", err)
        }
        debug("Finished appending chunk");

        let total_chunk_count = get_total_chunks(&dest_path);
        ic_cdk::println!(
            "Wrote {} of {} from {} chunks (of {}) starting at {}",
            bytes_to_human_readable(chunk_of_bytes.len() as u64),
            dest_path,
            group_size,
            total_chunk_count,
            start_chunk
        );

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
            if let Err(err) = delete_temp_chunks(&dest_path) {
                // TODO error handling?
                // These files may clutter the file system and take up space but otherwise are harmless.
                // Unless they don't get overwritten properly and the chunk-writer tries to use them to create the next version of this file.
                ic_cdk::println!(
                    "WARNING: Failed to delete temp chunks for {}. {}",
                    dest_path,
                    err
                );
            }
            let hash_closure = move || hash_file(dest_path);
            ic_cdk_timers::set_timer(delay, hash_closure);
        } else {
            let closure =
                move || write_group_of_file_chunks(dest_path, start_chunk + group_size, group_size);
            ic_cdk_timers::set_timer(delay, closure);
        }
    }

    fn append_chunk_to(dest_path: &str, chunk_of_bytes: &[u8]) -> std::io::Result<()> {
        let mut file = std::fs::OpenOptions::new()
            .write(true)
            .append(true)
            .open(&dest_path)?;

        std::io::Write::write_all(&mut file, &chunk_of_bytes)?;

        // flush the buffer to ensure all data is written immediately
        std::io::Write::flush(&mut file)?;
        drop(file);

        Ok(())
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

    // Gets the size of the first chunk for a file. Returns the size in bytes or an error.
    fn get_first_chunk_size(file_path: &str) -> u64 {
        read_temp_chunks(file_path, 0, 1).unwrap_or(vec![]).len() as u64
    }

    fn verify_latest_version(dest_path: &str, timestamp: u64) -> bool {
        UPLOADED_ASSETS_TIMESTAMP.with(|upload_assets_timestamp_map| {
            let mut upload_assets_timestamp_map_mut = upload_assets_timestamp_map.borrow_mut();
            let upload_assets_timestamp = match upload_assets_timestamp_map_mut.get_mut(dest_path) {
                Some(timestamp) => timestamp,
                None => &0,
            };

            if timestamp > *upload_assets_timestamp {
                // The request is from a newer upload attempt. Clean up the previous attempt.
                upload_assets_timestamp_map_mut.insert(dest_path.to_string(), timestamp);
                if let Err(err) = delete_temp_chunks(dest_path) {
                    // TODO error handling?
                    // These files may clutter the file system and take up space but otherwise are harmless.
                    // Unless they don't get overwritten properly and the chunk-writer tries to use them to create the next version of this file.
                    ic_cdk::println!(
                        "WARNING: Failed to delete temp chunks for {}. {}",
                        dest_path,
                        err
                    );
                }
                true
            } else if timestamp < *upload_assets_timestamp {
                // The request is from an earlier upload attempt. Disregard
                false
            } else {
                // The request is from the current upload attempt.
                true
            }
        })
    }

    fn debug(message: &str) {
        let debug = false;
        if debug {
            ic_cdk::println!("{}", message)
        }
    }
    }
}
