use crate::upload_file::{Timestamp, FILE_INFO};

pub fn initialize_file_info(path: &str, timestamp: Timestamp) {
    FILE_INFO.with(|file_info| {
        let mut file_info_mut = file_info.borrow_mut();

        file_info_mut.insert(path.to_string(), (timestamp, 0, None, 0));
    });
}

pub fn get_partial_file_hash(path: &str) -> Option<Vec<u8>> {
    FILE_INFO
        .with(|file_info| Some(file_info.borrow().get(path)?.2.clone()))
        .flatten()
}

pub fn set_partial_hash(path: &str, hash: Vec<u8>) {
    FILE_INFO.with(|file_hashes| {
        if let Some(entry) = file_hashes.borrow_mut().get_mut(path) {
            entry.2 = Some(hash);
        } else {
            panic!("Couldn't find file info for {}", path)
        }
    });
}

pub fn clear_file_info(path: &str) {
    FILE_INFO.with(|file_info| file_info.borrow_mut().remove(path));
}

pub fn set_bytes_hashed(path: &str, bytes_hashed: u64) {
    FILE_INFO.with(|file_info| {
        let mut file_info_mut = file_info.borrow_mut();
        if let Some(file_info_entry) = file_info_mut.get_mut(path) {
            file_info_entry.3 = bytes_hashed;
        }
    });
}

pub fn set_bytes_received(dest_path: &str, bytes_in_chunk: usize) -> u64 {
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

pub fn get_timestamp(path: &str) -> Timestamp {
    FILE_INFO.with(|uploaded_file_timestamps_map| {
        match uploaded_file_timestamps_map.borrow().get(path) {
            Some((timestamp, _, _, _)) => timestamp.clone(),
            None => 0,
        }
    })
}
