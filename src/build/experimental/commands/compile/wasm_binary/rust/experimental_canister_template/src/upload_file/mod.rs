use std::{cell::RefCell, collections::BTreeMap};

mod bytes_to_human_readable;
mod file_info;
mod hash;
mod reset;
mod upload_file_chunk;

pub use hash::{get_file_hash, init_hashes};
pub use reset::reset_for_new_upload;
pub use upload_file_chunk::upload_file_chunk;

type BytesHashed = u64;
type BytesReceived = u64;
type Hash = Option<Vec<u8>>;
type Timestamp = u64;

thread_local! {
    static FILE_INFO: RefCell<BTreeMap<String, (Timestamp, BytesReceived, Hash, BytesHashed)>> = RefCell::new(BTreeMap::new());
}
