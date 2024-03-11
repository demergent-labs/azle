use quote::quote;

pub fn get_temp_chunk_utils() -> proc_macro2::TokenStream {
    quote! {
        // Adds the given asset_bytes to the dest_path asset at the chunk number position. Returns the new total length of dest_path asset after the addition
        pub fn write_temp_chunk(
            dest_path: &str,
            asset_bytes: Vec<u8>,
            chunk_number: u64,
        ) -> std::io::Result<u64> {
            let file_path = format_chunk_path(dest_path, chunk_number);
            let mut options = std::fs::OpenOptions::new();
            options.create(true).write(true);

            match std::path::Path::new(dest_path).parent() {
                Some(dir_path) => std::fs::create_dir_all(dir_path)?,
                None => (), //Dir doesn't need to be created
            };

            let mut file = options.open(&file_path)?;
            std::io::Write::write_all(&mut file, &asset_bytes)?;
            drop(file);

            update_file_info(dest_path, asset_bytes.len());

            Ok(get_total_bytes_written(dest_path))
        }

        // Reads and concatenates ordered chunks from the file system. Returns the data.
        pub fn read_temp_chunks(
            dest_path: &str,
            start_chunk: u64,
            num_chunks: u64,
        ) -> std::io::Result<Vec<u8>> {
            let mut all_data = vec![];

            for chunk_num in start_chunk..(start_chunk + num_chunks) {
                let chunk_path = format_chunk_path(dest_path, chunk_num);

                if std::path::Path::new(&chunk_path).exists() {
                    let mut file = std::fs::File::open(&chunk_path)?;
                    let mut chunk_data = vec![];
                    std::io::Read::read_to_end(&mut file, &mut chunk_data)?;
                    drop(file);
                    all_data.extend_from_slice(&chunk_data);
                }
            }
            Ok(all_data)
        }

        pub fn delete_temp_chunks(file_name: &str) -> std::io::Result<()> {
            let total_chunks = get_total_chunks(file_name);

            for i in 0..total_chunks {
                let chunk_file_path = format!("{}.chunk.{}", file_name, i);
                std::fs::remove_file(chunk_file_path)?
            }
            ic_cdk::println!("Deleted all chunks for {}", file_name);

            Ok(())
        }

        pub fn get_total_chunks(file_name: &str) -> u64 {
            let (chunks, _) =
                FILE_INFO.with(|file_info| file_info.borrow().get(file_name).unwrap_or(&(0, 0)).clone());
            chunks
        }

        pub fn format_chunk_path(dest_path: &str, chunk_number: u64) -> String {
            format!("{}.chunk.{}", dest_path, chunk_number)
        }

        fn update_file_info(dest_path: &str, bytes_in_chunk: usize) {
            FILE_INFO.with(|total_bytes_received| {
                let mut total_bytes_received_mut = total_bytes_received.borrow_mut();
                let (chunks, total_bytes) = total_bytes_received_mut
                    .entry(dest_path.to_owned())
                    .or_insert((0, 0));
                *total_bytes += bytes_in_chunk as u64;
                *chunks += 1;
            });
        }

        fn get_total_bytes_written(dest_path: &str) -> u64 {
            FILE_INFO.with(|total_bytes_received| {
                let total_bytes_map = total_bytes_received.borrow();
                let (_, total_bytes) = total_bytes_map.get(dest_path).unwrap();
                *total_bytes
            })
        }

    }
}
