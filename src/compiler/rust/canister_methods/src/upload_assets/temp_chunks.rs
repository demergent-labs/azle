use quote::quote;

pub fn get_temp_chunk_utils() -> proc_macro2::TokenStream {
    quote! {
    const USE_HEAP: bool = true;
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

        let total_bytes = FILE_INFO.with(|total_bytes_received| {
            let mut total_bytes_received_mut = total_bytes_received.borrow_mut();
            let (chunks, total_bytes) = total_bytes_received_mut
                .entry(dest_path.to_owned())
                .or_insert((0, 0));
            *total_bytes += asset_bytes.len() as u64;
            *chunks += 1;
            total_bytes.clone()
        });

        Ok(total_bytes)
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

    // TODO delete this when done troubleshooting
    pub fn test_read_temp_chunk(
        dest_path: &str,
        chunk_number: u64,
        verbose: bool,
    ) -> std::io::Result<()> {
        if USE_HEAP {
            return Ok(());
        }
        let chunk_path = format_chunk_path(dest_path, chunk_number);

        let exists = std::path::Path::new(&chunk_path).exists();
        if !exists {
            return Err(std::io::Error::new(
                std::io::ErrorKind::Other,
                "File doesn't exists",
            ));
        }
        if verbose {
            ic_cdk::println!("Start test read for {}", chunk_path);
            ic_cdk::println!("Exists? {}", exists);
            match std::fs::metadata(dest_path) {
                Ok(metadata) => {
                    ic_cdk::println!("Is Dir?: {}", metadata.is_dir());
                    ic_cdk::println!("Is File? {}", metadata.is_file());
                    ic_cdk::println!("Modified: {:?}", metadata.modified()?);
                }
                Err(err) => {
                    ic_cdk::println!("Error getting the metadata: {}", err)
                }
            };
        }
        let mut buffer = [0, 0, 0, 0];
        let mut file = std::fs::File::open(&chunk_path)?;
        std::io::Read::read(&mut file, &mut buffer)?;
        drop(file);

        Ok(())
    }
    }
}
