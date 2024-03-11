use quote::quote;

pub fn get_hash_file() -> proc_macro2::TokenStream {
    quote! {
        pub fn hash_file(path: String) {
            ic_cdk::println!("START HASH FILE");
            clear_partial_hash(&path);
            clear_file_hash(&path);
            hash_file_by_parts(path, 0)
        }

        #[ic_cdk_macros::query]
        pub fn get_file_hash(path: String) -> String {
            load_hashes()
                .unwrap()
                .get(&path)
                .unwrap()
                .iter()
                .map(|bytes| format!("{:02x}", bytes))
                .collect()
        }

        // TODO get rid of this when testing is done.
        #[ic_cdk_macros::query]
        pub fn get_file_hashes() -> Vec<String> {
            load_hashes()
                .unwrap()
                .iter()
                .map(|(path, bytes)| {
                    format!(
                        "{}: {}",
                        path,
                        bytes
                            .iter()
                            .map(|bytes| format!("{:02x}", bytes))
                            .collect::<String>()
                    )
                })
                .collect()
        }

        fn hash_file_by_parts(path: String, position: u64) {
            ic_cdk::println!(
                "Hash {} starting at: {}",
                path,
                bytes_to_human_readable(position)
            );
            let mut file = std::fs::File::open(&path).unwrap();

            std::io::Seek::seek(&mut file, std::io::SeekFrom::Start(position)).unwrap();

            // Read the bytes
            // TODO Before having the stable file storage hooked up 120 worked. For right now 60 seems to be working. I think we could do more but I want to get everything in place before spending a lot of time fine tuning it
            let limit = 60 * 1024 * 1024; // This limit will be determine by how much hashing an update method can do without running out of cycles. It runs out somewhere between 120 and 125
            // This limit must be the same as on the node side or else the hashes will not match
            let mut buffer = vec![0; limit];
            let bytes_read = std::io::Read::read(&mut file, &mut buffer);

            let previous_hash = get_partial_file_hash(&path);

            match bytes_read {
                Ok(bytes_read) => {
                    if bytes_read != 0 {
                        let new_hash = hash_chunk_with(&buffer, previous_hash.as_ref());
                        set_partial_hash(&path, new_hash);
                        let delay = core::time::Duration::new(0, 0);
                        let closure = move || hash_file_by_parts(path, position + bytes_read as u64);
                        ic_cdk_timers::set_timer(delay, closure);
                    } else {
                        // No more bytes to hash, set as final hash for this file
                        match previous_hash {
                            Some(hash) => {
                                set_file_hash(&path, hash);
                                ic_cdk::println!("Finish hashing");
                                clear_partial_hash(&path);
                                ic_cdk::println!("Partial hash cleared");
                            }
                            None => ic_cdk::println!("WARNING: No hash was found for {}", path),
                        }
                    }
                }
                Err(err) => panic!("Error reading file: {}", err),
            }
        }

        pub fn get_partial_file_hash(path: &String) -> Option<Vec<u8>> {
            PARTIAL_FILE_HASHES.with(|file_hashes| file_hashes.borrow().get(path).cloned())
        }

        fn set_partial_hash(path: &String, hash: Vec<u8>) {
            PARTIAL_FILE_HASHES.with(|file_hashes| file_hashes.borrow_mut().insert(path.clone(), hash));
        }

        fn clear_partial_hash(path: &String) {
            PARTIAL_FILE_HASHES.with(|file_hashes| file_hashes.borrow_mut().remove(path));
        }

        fn clear_file_hash(path: &String) {
            let mut file_hashes = load_hashes().unwrap();
            file_hashes.remove(path);
            save_hashes(&file_hashes).unwrap();
        }

        fn set_file_hash(path: &String, hash: Vec<u8>) {
            let mut file_hashes = load_hashes().unwrap();
            file_hashes.insert(path.clone(), hash);
            save_hashes(&file_hashes).unwrap();
        }

        fn hash_chunk_with(data: &[u8], previous_hash: Option<&Vec<u8>>) -> Vec<u8> {
            let mut h = <sha2::Sha256 as sha2::Digest>::new();
            sha2::Digest::update(&mut h, data);
            if let Some(hash) = previous_hash {
                sha2::Digest::update(&mut h, hash);
            }
            sha2::Digest::finalize(h).to_vec()
        }

        fn load_hashes() -> Result<HashMap<String, Vec<u8>>, std::io::Error> {
            let mut file_hashes = HashMap::new();
            // Check if the file exists
            if !std::path::Path::new(FILE_HASH_PATH).exists() {
                return Ok(file_hashes);
            }
            let mut file = std::fs::File::open(FILE_HASH_PATH)?;

            let mut data = Vec::new();
            std::io::Read::read_to_end(&mut file, &mut data)?;

            if !data.is_empty() {
                file_hashes = serde_json::from_slice(&data)?; // (Example using serde)
            }

            Ok(file_hashes)
        }

        fn save_hashes(file_hashes: &HashMap<String, Vec<u8>>) -> Result<(), std::io::Error> {
            let data = serde_json::to_vec(file_hashes)?; // (Example using serde)

            let mut file = std::fs::OpenOptions::new()
                .create(true)
                .write(true)
                .open(FILE_HASH_PATH)?;
            std::io::Write::write_all(&mut file, &data)?;

            Ok(())
        }

    }
}
