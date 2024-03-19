use quote::quote;

pub fn get_write_chunk() -> proc_macro2::TokenStream {
    quote! {
        // Adds the given file_bytes to the chunked file at the chunk number position.
        // Returns the new total length of chunked file after the addition
        pub fn write_chunk(
            path: &str,
            file_bytes: Vec<u8>,
            start_index: u64,
            file_len: u64,
        ) -> std::io::Result<u64> {
            match std::path::Path::new(path).parent() {
                Some(dir_path) => std::fs::create_dir_all(dir_path)?,
                None => (), //Dir doesn't need to be created
            };

            let mut file: std::fs::File = match std::fs::OpenOptions::new().write(true).open(path) {
                Ok(file) => file,
                Err(_) => init_file(path, file_len)?,
            };

            std::io::Seek::seek(&mut file, std::io::SeekFrom::Start(start_index))?;
            std::io::Write::write_all(&mut file, &file_bytes)?;
            drop(file);

            update_file_info(path, file_bytes.len());

            Ok(get_total_bytes_written(path))
        }

        fn init_file(path: &str, file_len: u64) -> std::io::Result<std::fs::File> {
            let new_file = std::fs::OpenOptions::new()
                .create(true)
                .write(true)
                .truncate(true)
                .open(&path)?;
            new_file.set_len(file_len)?;
            Ok(new_file)
        }

        fn update_file_info(dest_path: &str, bytes_in_chunk: usize) {
            FILE_INFO.with(|total_bytes_received| {
                let mut total_bytes_received_mut = total_bytes_received.borrow_mut();
                let total_bytes = total_bytes_received_mut
                    .entry(dest_path.to_owned())
                    .or_insert(0);
                *total_bytes += bytes_in_chunk as u64;
            });
        }

        fn get_total_bytes_written(dest_path: &str) -> u64 {
            FILE_INFO.with(|total_bytes_received| {
                let total_bytes_map = total_bytes_received.borrow();
                let total_bytes = total_bytes_map.get(dest_path).unwrap();
                *total_bytes
            })
        }

    }
}
