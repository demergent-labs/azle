use crate::upload_file::file_info;
use crate::upload_file::Timestamp;

pub fn reset_for_new_upload(path: &str, timestamp: Timestamp) -> std::io::Result<()> {
    delete_if_exists(path)?;
    file_info::initialize_file_info(path, timestamp);
    Ok(())
}

fn delete_if_exists(path: &str) -> std::io::Result<()> {
    if std::fs::metadata(path).is_ok() {
        std::fs::remove_file(path)?;
    }
    Ok(())
}
