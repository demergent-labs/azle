use quote::quote;

pub fn get_write_file_by_parts() -> proc_macro2::TokenStream {
    quote! {
        pub fn write_file_by_parts(dest_path: String) {
            init_file(&dest_path);

            let group_size = get_group_size(&dest_path);

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
                ic_cdk::println!("Finished writing to {}", dest_path);
                // Clear temp chunks
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

        // Gets the size of the first chunk for a file. Returns the size in bytes or an error.
        fn get_first_chunk_size(file_path: &str) -> u64 {
            // TODO if we switch to writing directly to the files this may no longer work
            read_temp_chunks(file_path, 0, 1).unwrap_or(vec![]).len() as u64
        }

        fn get_group_size(path: &str) -> u64 {
            let bytes_per_chunk = get_first_chunk_size(path);

            let total_chunks = get_total_chunks(path);
            // TODO Before having the stable file storage hooked up 100 worked. For right now 50 seems to be working. It may need to be less once we have more file writing involved
            let limit: u64 = 50 * 1024 * 1024;
            std::cmp::min(total_chunks, limit / bytes_per_chunk as u64)
        }

        fn init_file(path: &str) {
            let dir_path = std::path::Path::new(path).parent().unwrap();
            std::fs::create_dir_all(dir_path).unwrap();

            // Create the file, or clear it if it already exists
            std::fs::OpenOptions::new()
                .write(true)
                .truncate(true)
                .create(true)
                .open(path)
                .unwrap();
        }

    }
}
