use quote::quote;

pub fn get_hash_file() -> proc_macro2::TokenStream {
    quote! {
        pub fn hash_file(path: String) {
            clear_file_hash(&path);
            hash_file_by_parts(&path, 0)
        }

        #[ic_cdk_macros::query(guard = guard_against_non_controllers)]
        pub fn get_file_hash(path: String) -> Option<String> {
            Some(
                load_hashes()
                    .unwrap()
                    .get(&path)?
                    .iter()
                    .map(|bytes| format!("{:02x}", bytes))
                    .collect(),
            )
        }

        #[ic_cdk_macros::query(guard = guard_against_non_controllers)]
        pub fn get_hash_status(path: String) -> Option<(u64, u64)> {
            Some((get_bytes_hashed(&path), get_file_size(&path)?))
        }

        fn hash_file_by_parts(path: &str, position: u64) {
            let file_length = std::fs::metadata(path).unwrap().len();
            let percentage = position / file_length.max(1) * 100;
            ic_cdk::println!(
                "Hashing: {} | {}/{} : {:.2}%",
                path,
                bytes_to_human_readable(position),
                bytes_to_human_readable(file_length),
                percentage
            );
            let mut file = std::fs::File::open(&path).unwrap();

            std::io::Seek::seek(&mut file, std::io::SeekFrom::Start(position)).unwrap();

            // Read the bytes
            let limit = 75 * 1024 * 1024; // This limit will be determine by how much hashing an update method can do without running out of cycles. It runs out somewhere between 75 and 80
            // This limit must be the same as on the node side or else the hashes will not match
            let mut buffer = vec![0; limit];
            let bytes_read = std::io::Read::read(&mut file, &mut buffer).unwrap();

            let previous_hash = get_partial_file_hash(path);

            if bytes_read != 0 {
                let new_hash = hash_chunk_with(&buffer, previous_hash.as_ref());
                set_partial_hash(path, new_hash);
                set_bytes_hashed(path, position + bytes_read as u64);
                spawn_hash_by_parts(path.to_string(), position + bytes_read as u64)
            } else {
                // No more bytes to hash, set as final hash for this file
                let final_hash = match previous_hash {
                    Some(hash) => hash,
                    None => {
                        let empty_file_hash = hash_chunk_with(&[], None);
                        empty_file_hash
                    }
                };
                set_file_hash(path, final_hash);
                clear_file_info(path);
            }
        }

        fn spawn_hash_by_parts(path: String, position: u64) {
            let delay = core::time::Duration::new(0, 0);
            let closure = move || hash_file_by_parts(&path, position);
            ic_cdk_timers::set_timer(delay, closure);
        }

        pub fn get_partial_file_hash(path: &str) -> Option<Vec<u8>> {
            FILE_INFO
                .with(|file_info| Some(file_info.borrow().get(path)?.2.clone()))
                .flatten()
        }

        fn set_partial_hash(path: &str, hash: Vec<u8>) {
            FILE_INFO.with(|file_hashes| {
                if let Some(entry) = file_hashes.borrow_mut().get_mut(path) {
                    entry.2 = Some(hash);
                } else {
                    panic!("Couldn't find file info for {}", path)
                }
            });
        }

        fn clear_file_info(path: &str) {
            FILE_INFO.with(|file_info| file_info.borrow_mut().remove(path));
        }

        fn clear_file_hash(path: &str) {
            let mut file_hashes = load_hashes().unwrap();
            file_hashes.remove(path);
            save_hashes(&file_hashes).unwrap();
        }

        fn set_file_hash(path: &str, hash: Vec<u8>) {
            let mut file_hashes = load_hashes().unwrap();
            file_hashes.insert(path.to_string(), hash);
            save_hashes(&file_hashes).unwrap();
        }

        fn get_bytes_hashed(path: &str) -> u64 {
            FILE_INFO.with(|file_info| {
                let file_info = file_info.borrow();
                match file_info.get(path) {
                    Some(file_info) => file_info.clone().3,
                    None => get_file_size(path).unwrap(),
                }
            })
        }

        fn set_bytes_hashed(path: &str, bytes_hashed: u64) {
            FILE_INFO.with(|file_info| {
                let mut file_info_mut = file_info.borrow_mut();
                if let Some(file_info_entry) = file_info_mut.get_mut(path) {
                    file_info_entry.3 = bytes_hashed;
                }
            });
        }

        fn get_file_size(path: &str) -> Option<u64> {
            match std::fs::metadata(path) {
                Ok(metadata) => Some(metadata.len()),
                Err(_) => None,
            }
        }

        pub fn get_file_hash_path() -> std::path::PathBuf {
            std::path::Path::new(".config")
                .join("azle")
                .join("file_hashes.json")
        }

        fn hash_chunk_with(data: &[u8], previous_hash: Option<&Vec<u8>>) -> Vec<u8> {
            let mut h: sha2::Sha256 = sha2::Digest::new();
            sha2::Digest::update(&mut h, data);
            if let Some(hash) = previous_hash {
                sha2::Digest::update(&mut h, hash);
            }
            sha2::Digest::finalize(h).to_vec()
        }

        fn load_hashes() -> Result<HashMap<String, Vec<u8>>, std::io::Error> {
            let file_hash_path = get_file_hash_path();
            if !file_hash_path.exists() {
                // If File doesn't exist yet return empty hash map
                return Ok(HashMap::new());
            }
            let buffer = std::fs::read(file_hash_path)?;

            Ok(if buffer.is_empty() {
                // If File is empty return empty hash map
                HashMap::new()
            } else {
                serde_json::from_slice(&buffer)?
            })
        }

        fn save_hashes(file_hashes: &HashMap<String, Vec<u8>>) -> Result<(), std::io::Error> {
            let data = serde_json::to_vec(file_hashes)?;

            std::fs::write(get_file_hash_path(), data)
        }

    }
}
