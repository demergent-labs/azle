pub use source_mapped::SourceMapped;

mod source_mapped;

pub mod get_source_file_info;
pub mod private_get_source_file_info;

pub type Range = (usize, usize);
