use crate::chunk;
use crate::upload_file::bytes_to_human_readable;
use crate::upload_file::file_info;
use crate::upload_file::hash;
use crate::upload_file::reset;
use crate::upload_file::Timestamp;

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
        bytes_to_human_readable::bytes_to_human_readable(uploaded_file_len),
        bytes_to_human_readable::bytes_to_human_readable(total_file_len),
        percentage_complete
    );

    if uploaded_file_len == total_file_len {
        chunk::chunk().await;
        hash::hash_file(&dest_path).await;
    }
}

fn check_if_latest_version(dest_path: &str, current_timestamp: Timestamp) -> bool {
    let last_recorded_timestamp = file_info::get_timestamp(dest_path);

    if current_timestamp < last_recorded_timestamp {
        // The request is from an earlier upload attempt. Disregard
        return false;
    }

    if current_timestamp > last_recorded_timestamp {
        // The request is from a newer upload attempt. Clean up the previous attempt.
        reset::reset_for_new_upload(dest_path, current_timestamp).unwrap();
    }

    true
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

    Ok(file_info::set_bytes_received(path, file_bytes.len()))
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
