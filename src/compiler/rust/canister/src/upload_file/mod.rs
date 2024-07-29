use wasmedge_quickjs::AsObject;

use crate::chunk;

mod bytes_to_human_readable;
mod file_info;
mod hash;
mod reset;
mod upload_file_chunk;

pub use hash::hash_file;
pub use reset::reset_for_new_upload;
pub use upload_file_chunk::upload_file_chunk;

pub type Timestamp = u64;
