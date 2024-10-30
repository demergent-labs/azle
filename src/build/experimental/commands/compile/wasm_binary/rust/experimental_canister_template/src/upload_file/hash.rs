use std::collections::HashMap;

use crate::chunk;
use crate::upload_file::bytes_to_human_readable;
use crate::upload_file::file_info;

pub fn init_hashes() -> Result<(), std::io::Error> {
    save_hashes(&HashMap::new())
}

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

pub async fn hash_file(path: &str) {
    clear_file_hash(path);

    let file_length = std::fs::metadata(path).unwrap().len();
    let limit = 75 * 1024 * 1024; // This limit will be determine by how much hashing an update method can do without running out of cycles. It runs out somewhere between 75 and 80
                                  // This limit must be the same as on the node side or else the hashes will not match
    let mut file = std::fs::File::open(path).unwrap();

    let mut position = 0;

    loop {
        let percentage = position / file_length.max(1) * 100;
        ic_cdk::println!(
            "Hashing: {} | {}/{} : {:.2}%",
            path,
            bytes_to_human_readable::bytes_to_human_readable(position),
            bytes_to_human_readable::bytes_to_human_readable(file_length),
            percentage
        );

        std::io::Seek::seek(&mut file, std::io::SeekFrom::Start(position)).unwrap();

        let mut buffer = vec![0; limit];
        let bytes_read = std::io::Read::read(&mut file, &mut buffer).unwrap();

        let previous_hash = file_info::get_partial_file_hash(path);

        if bytes_read != 0 {
            let new_hash = hash_chunk_with(&buffer, previous_hash.as_ref());
            file_info::set_partial_hash(path, new_hash);
            file_info::set_bytes_hashed(path, position + bytes_read as u64);
            position += bytes_read as u64;
            chunk::chunk().await;
            continue;
        } else {
            // No more bytes to hash, set as final hash for this file
            let final_hash = match previous_hash {
                Some(hash) => hash,
                None => {
                    let empty_file_hash = hash_chunk_with(&[], None);
                    empty_file_hash
                }
            };
            chunk::chunk().await;
            set_file_hash(path, final_hash);
            file_info::clear_file_info(path);
            break;
        }
    }
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

fn get_file_hash_path() -> std::path::PathBuf {
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
    let buffer = std::fs::read(file_hash_path)?;

    Ok(serde_json::from_slice(&buffer)?)
}

fn save_hashes(file_hashes: &HashMap<String, Vec<u8>>) -> Result<(), std::io::Error> {
    let data = serde_json::to_vec(file_hashes)?;

    std::fs::write(get_file_hash_path(), data)
}
