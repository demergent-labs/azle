use std::{
    cell::RefCell,
    collections::{BTreeMap, HashMap},
};

use wasmedge_quickjs::AsObject;

use crate::chunk;

type Timestamp = u64;
type Hash = Option<Vec<u8>>;
type BytesReceived = u64;
type BytesHashed = u64;

thread_local! {
    static FILE_INFO: RefCell<BTreeMap<String, (Timestamp, BytesReceived, Hash, BytesHashed)>> = RefCell::new(BTreeMap::new());
}

pub async fn upload_file_chunk(
    dest_path: String,
    timestamp: u64,
    start_index: u64,
    file_bytes: Vec<u8>,
    total_file_len: u64,
) {
    let is_latest_version = check_if_latest_version(&dest_path, timestamp);

    if !is_latest_version {
        return;
    }

    let uploaded_file_len =
        write_chunk(&dest_path, file_bytes, start_index, total_file_len).unwrap();

    let percentage_complete = uploaded_file_len as f64 / total_file_len.max(1) as f64 * 100.0;
    ic_cdk::println!(
        "Received chunk: {} | {}/{} : {:.2}%",
        dest_path,
        bytes_to_human_readable(uploaded_file_len),
        bytes_to_human_readable(total_file_len),
        percentage_complete
    );

    if uploaded_file_len == total_file_len {
        chunk::chunk().await;
        hash_file(&dest_path).await;
    }
}

pub fn reset_for_new_upload(path: &str, timestamp: Timestamp) -> std::io::Result<()> {
    delete_if_exists(path)?;
    initialize_file_info(path, timestamp);
    Ok(())
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

fn bytes_to_human_readable(size_in_bytes: u64) -> String {
    let suffixes = ["B", "KiB", "MiB", "GiB"];
    let size = size_in_bytes as f64;

    let result = suffixes.iter().fold(
        (size, suffixes[0], false),
        |(remaining_size, selected_suffix, done), suffix| {
            if done {
                return (remaining_size, selected_suffix, done);
            }
            if remaining_size < 1024.0 {
                (remaining_size, suffix, true)
            } else {
                (remaining_size / 1024.0, suffix, false)
            }
        },
    );

    format!("{:.2} {}", result.0, result.1)
}

// Adds the given file_bytes to the chunked file at the chunk number position.
// Returns the new total length of chunked file after the addition
fn write_chunk(
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

    Ok(set_bytes_received(path, file_bytes.len()))
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

fn set_bytes_received(dest_path: &str, bytes_in_chunk: usize) -> u64 {
    FILE_INFO.with(|total_bytes_received| {
        let mut total_bytes_received_mut = total_bytes_received.borrow_mut();
        match total_bytes_received_mut.get_mut(dest_path) {
            Some((_, total_bytes, _, _)) => {
                *total_bytes += bytes_in_chunk as u64;
                *total_bytes
            }
            None => panic!("Couldn't find file info for {}", dest_path),
        }
    })
}

fn check_if_latest_version(dest_path: &str, current_timestamp: Timestamp) -> bool {
    let last_recorded_timestamp = get_timestamp(dest_path);

    if current_timestamp < last_recorded_timestamp {
        // The request is from an earlier upload attempt. Disregard
        return false;
    }

    if current_timestamp > last_recorded_timestamp {
        // The request is from a newer upload attempt. Clean up the previous attempt.
        reset_for_new_upload(dest_path, current_timestamp).unwrap();
    }

    true
}

fn get_timestamp(path: &str) -> Timestamp {
    FILE_INFO.with(|uploaded_file_timestamps_map| {
        match uploaded_file_timestamps_map.borrow().get(path) {
            Some((timestamp, _, _, _)) => timestamp.clone(),
            None => 0,
        }
    })
}

fn initialize_file_info(path: &str, timestamp: Timestamp) {
    FILE_INFO.with(|file_info| {
        let mut file_info_mut = file_info.borrow_mut();

        file_info_mut.insert(path.to_string(), (timestamp, 0, None, 0));
    });
}

fn delete_if_exists(path: &str) -> std::io::Result<()> {
    if std::fs::metadata(path).is_ok() {
        std::fs::remove_file(path)?;
    }
    Ok(())
}

async fn hash_file(path: &str) {
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
            bytes_to_human_readable(position),
            bytes_to_human_readable(file_length),
            percentage
        );

        std::io::Seek::seek(&mut file, std::io::SeekFrom::Start(position)).unwrap();

        let mut buffer = vec![0; limit];
        let bytes_read = std::io::Read::read(&mut file, &mut buffer).unwrap();

        let previous_hash = get_partial_file_hash(path);

        if bytes_read != 0 {
            let new_hash = hash_chunk_with(&buffer, previous_hash.as_ref());
            set_partial_hash(path, new_hash);
            set_bytes_hashed(path, position + bytes_read as u64);
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
            clear_file_info(path);
            break;
        }
    }
}

fn get_partial_file_hash(path: &str) -> Option<Vec<u8>> {
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

fn set_bytes_hashed(path: &str, bytes_hashed: u64) {
    FILE_INFO.with(|file_info| {
        let mut file_info_mut = file_info.borrow_mut();
        if let Some(file_info_entry) = file_info_mut.get_mut(path) {
            file_info_entry.3 = bytes_hashed;
        }
    });
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
