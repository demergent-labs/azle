use wasmedge_quickjs::AsObject;

use crate::chunk;

mod bytes_to_human_readable;
mod file_info;
pub mod hash;
pub mod reset;
pub mod upload_file_chunk;

pub type Timestamp = u64;
