pub mod temp_chunks;
pub mod verify_latest;
pub mod write_file_by_parts;

use quote::quote;

use crate::hash_file;

pub fn get_upload_assets() -> proc_macro2::TokenStream {
    let temp_chunks_utils_src = temp_chunks::get_temp_chunk_utils();
    let verify_latest_src = verify_latest::get_verify_latest();
    let write_file_by_parts_src = write_file_by_parts::get_write_file_by_parts();
    let hash_file_src = hash_file::get_hash_file();

    quote! {
        #temp_chunks_utils_src
        #verify_latest_src
        #write_file_by_parts_src
        #hash_file_src

        #[ic_cdk_macros::update]
        pub fn upload_asset(
            dest_path: String,
            timestamp: u64,
            chunk_number: u64,
            asset_bytes: Vec<u8>,
            total_len: u64,
        ) {
            let is_current_timestamp = verify_latest_version(&dest_path, timestamp);

            if !is_current_timestamp {
                return;
            }

            let uploaded_asset_len = match write_temp_chunk(&dest_path, asset_bytes, chunk_number) {
                Ok(len) => len as u64,
                Err(err) => {
                    ic_cdk::println!("Error writing temp chunk: {}", err);
                    panic!("{}", err)
                }
            };

            ic_cdk::println!(
                "Uploaded: {} | Length: {}/{} ",
                format_chunk_path(&dest_path, chunk_number),
                bytes_to_human_readable(uploaded_asset_len),
                bytes_to_human_readable(total_len)
            );

            if uploaded_asset_len == total_len {
                ic_cdk::println!(
                    "UPLOAD OF ALL {} CHUNKS COMPLETE for {}. Spawning writer",
                    get_total_chunks(&dest_path),
                    dest_path
                );

                let delay = core::time::Duration::new(0, 0);
                let write_closure = move || write_file_by_parts(dest_path);
                ic_cdk_timers::set_timer(delay, write_closure);
            }
        }

        pub fn bytes_to_human_readable(size_in_bytes: u64) -> String {
            let suffixes = ["B", "KiB", "MiB", "GiB"];
            let mut size = size_in_bytes as f64;

            for suffix in suffixes.iter() {
                if size < 1024.0 {
                    return format!("{:.2} {}", size as f64, suffix);
                }
                size /= 1024.0;
            }

            format!("{:.2} {}", size as f64, suffixes.last().unwrap())
        }
    }
}
