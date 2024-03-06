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
            "Wrote: {} | Length: {}/{} ",
            format_chunk_path(&dest_path, chunk_number),
            bytes_to_human_readable(uploaded_asset_len),
            bytes_to_human_readable(total_len)
        );

        if uploaded_asset_len == total_len {
            ic_cdk::println!("UPLOAD COMPLETE for {}", dest_path);
            ic_cdk::println!(
                "{} chunks uploaded for {}",
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

        // TODO Before having the stable file storage hooked up 100 worked. For right now 25 seems to be working. I think we could do more but I want to get everything in place before spending a lot of time fine tuning it
        let total_chunks = get_total_chunks(&dest_path);
        let limit: u64 = 25 * 1024 * 1024; // The limit is somewhere between 150 and 155 before we run out of instructions.
        let group_size = std::cmp::min(total_chunks, limit / bytes_per_chunk as u64);
        let group_size = 1;

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
        if start_chunk == 0 {
            ic_cdk::println!("START writing: {}", dest_path);
        } else {
            ic_cdk::println!("Continue writing: {}", dest_path);
        }
        ic_cdk::println!(
            "Attempting to read {} chunks starting at {}",
            group_size,
            start_chunk
        );
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

        ic_cdk::println!("Finished appending chunk");

        let total_chunk_count = get_total_chunks(&dest_path);
        ic_cdk::print(format!(
            "{} of {} chunks written!",
            start_chunk + group_size,
            total_chunk_count
        ));

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
        ic_cdk::println!(
            "Preparing to write {} bytes to {}",
            bytes_to_human_readable(chunk_of_bytes.len() as u64),
            dest_path
        );

        ic_cdk::println!("Just to make sure here is another print");

        let mut file = std::fs::OpenOptions::new();

        ic_cdk::println!("We made the new thing");

        let file = file.write(true);

        ic_cdk::println!("We made the write thing");

        let file = file.append(true);

        ic_cdk::println!("We made the append thing");

        let mut file = file.open(&dest_path)?;

        ic_cdk::println!("{} opened successfully for writing", dest_path);

        std::io::Write::write_all(&mut file, &chunk_of_bytes)?;

        ic_cdk::println!("wrote all successfully to {}", dest_path);

        // flush the buffer to ensure all data is written immediately
        std::io::Write::flush(&mut file)?;
        drop(file);

        ic_cdk::println!("flushed file whatever that means");

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

    fn test_read_temp_chunk(dest_path: &str, chunk_number: u64, verbose: bool) -> std::io::Result<()> {
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

    // Adds the given asset_bytes to the dest_path asset at the chunk number position. Returns the new total length of dest_path asset after the addition
    fn write_temp_chunk(
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

    fn get_total_chunks(file_name: &str) -> u64 {
        let (chunks, total_bytes_received) =
            FILE_INFO.with(|file_info| file_info.borrow().get(file_name).unwrap_or(&(0, 0)).clone());
        chunks
    }

    // Reads and concatenates ordered chunks from the file system. Returns the data.
    fn read_temp_chunks(
        dest_path: &str,
        start_chunk: u64,
        num_chunks: u64,
    ) -> std::io::Result<Vec<u8>> {
        let mut all_data = vec![];

        for chunk_num in start_chunk..(start_chunk + num_chunks) {
            let chunk_path = format_chunk_path(dest_path, chunk_num);
            ic_cdk::println!("Reading from {}", chunk_path);

            if std::path::Path::new(&chunk_path).exists() {
                ic_cdk::println!("{} exits!", chunk_path);
                let mut file = std::fs::File::open(&chunk_path)?;
                ic_cdk::println!("{} was opened successfully!", chunk_path);
                let mut chunk_data = vec![];
                std::io::Read::read_to_end(&mut file, &mut chunk_data)?;
                drop(file);
                ic_cdk::println!("{} was read successfully!", chunk_path);
                all_data.extend_from_slice(&chunk_data);
            }
        }
        ic_cdk::println!("Finished Reading batch of temp chunks");
        Ok(all_data)
    }

    fn delete_temp_chunks(file_name: &str) -> std::io::Result<()> {
        let total_chunks = get_total_chunks(file_name);

        for i in 0..total_chunks {
            let chunk_file_path = format!("{}.chunk.{}", file_name, i);
            std::fs::remove_file(chunk_file_path)?
        }
        ic_cdk::println!("Deleted all chunks for {}", file_name);

        Ok(())
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

    fn format_chunk_path(dest_path: &str, chunk_number: u64) -> String {
        format!("{}.chunk.{}", dest_path, chunk_number)
    }
    }
}
