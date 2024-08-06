use wasmedge_quickjs::AsObject;

mod bytes_to_human_readable;
mod file_info;
mod hash;
mod reset;
mod upload_file_chunk;

pub use hash::get_file_hash;
pub use hash::init_hashes;
pub use reset::reset_for_new_upload;
pub use upload_file_chunk::upload_file_chunk;

pub type Timestamp = u64;
