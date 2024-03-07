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
        if USE_HEAP {
            let total_bytes = add_asset_data(dest_path, asset_bytes, chunk_number);
            return Ok(total_bytes.try_into().unwrap());
        }
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
        if USE_HEAP {
            return Ok(get_asset_data(
                dest_path,
                start_chunk.try_into().unwrap(),
                num_chunks.try_into().unwrap(),
            ));
        }
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
        if USE_HEAP {
            clear_asset_data(file_name);
            return Ok(());
        }
        let total_chunks = get_total_chunks(file_name);

        for i in 0..total_chunks {
            let chunk_file_path = format!("{}.chunk.{}", file_name, i);
            std::fs::remove_file(chunk_file_path)?
        }
        ic_cdk::println!("Deleted all chunks for {}", file_name);

        Ok(())
    }

    pub fn get_total_chunks(file_name: &str) -> u64 {
        if USE_HEAP {
            return get_asset_total_chunks(file_name);
        }
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

    // TODO remove this as soon as Stable chunks works
    fn get_asset_total_chunks(dest_path: &str) -> u64 {
        UPLOADED_ASSETS
            .with(|uploaded_assets| uploaded_assets.borrow().get(dest_path).unwrap().len())
            .try_into()
            .unwrap()
    }

    // TODO remove this as soon as Stable chunks works
    fn add_asset_data(dest_path: &str, asset_bytes: Vec<u8>, chunk_number: u64) -> usize {
        UPLOADED_ASSETS.with(|uploaded_assets| {
            let mut uploaded_assets_mut = uploaded_assets.borrow_mut();
            if let Some(bytes_map) = uploaded_assets_mut.get_mut(dest_path) {
                // If the key exists, insert the value into the inner HashMap
                bytes_map.insert(chunk_number, asset_bytes);
                bytes_map.values().fold(0, |acc, bytes| acc + bytes.len())
            } else {
                // If the key doesn't exist, initialize a new inner BTreeMap and insert the value
                let mut new_bytes_map = std::collections::BTreeMap::new();
                let len = asset_bytes.len();
                new_bytes_map.insert(chunk_number, asset_bytes);
                uploaded_assets_mut.insert(dest_path.to_string(), new_bytes_map);
                ic_cdk::println!("First chunk processed for {}", dest_path);
                len
            }
        })
    }

    // TODO remove this as soon as Stable chunks works
    fn get_asset_data(dest_path: &str, start_chunk: usize, group_size: usize) -> Vec<u8> {
        UPLOADED_ASSETS.with(|uploaded_assets| {
            let chunk_of_bytes: Vec<u8> = uploaded_assets
                .borrow()
                .get(&dest_path.to_string())
                .unwrap()
                .into_iter()
                .skip(start_chunk)
                .take(group_size)
                .flat_map(|(_, bytes)| bytes.clone())
                .collect();
            chunk_of_bytes
        })
    }

    // TODO remove this as soon as Stable chunks works
    fn clear_asset_data(dest_path: &str) {
        UPLOADED_ASSETS.with(|upload_assets| {
            let mut upload_assets_mut = upload_assets.borrow_mut();
            match upload_assets_mut.get_mut(dest_path) {
                Some(uploaded_asset) => uploaded_asset.clear(),
                None => (),
            }
        });
    }

    }
}
