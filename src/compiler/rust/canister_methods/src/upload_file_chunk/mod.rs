pub mod versions;
pub mod write_chunk;

use quote::quote;

use crate::hash_file;

pub fn get_upload_file_chunk() -> proc_macro2::TokenStream {
    let write_chunk_src = write_chunk::get_write_chunk();
    let check_if_latest_version_src = versions::get_check_if_latest_version_src();
    let hash_file_src = hash_file::get_hash_file();

    quote! {
        #write_chunk_src
        #check_if_latest_version_src
        #hash_file_src

        #[ic_cdk_macros::update]
        pub fn upload_file_chunk(
            dest_path: String,
            timestamp: u64,
            start_index: u64,
            file_bytes: Vec<u8>,
            total_file_len: u64,
        ) {
            if !ic_cdk::api::is_controller(&ic_cdk::api::caller()) {
                panic!("Must be a controller to upload files!");
            }

            let is_current_timestamp = verify_latest_version(&dest_path, timestamp);

            if !is_current_timestamp {
                return;
            }

            let uploaded_file_len = match write_chunk(&dest_path, file_bytes, start_index, total_file_len) {
                Ok(len) => len as u64,
                Err(err) => {
                    ic_cdk::println!("Error writing chunk: {}", err);
                    panic!("{}", err)
                }
            };

            ic_cdk::println!(
                "upload_file_chunk: {} | {}/{} ",
                dest_path,
                bytes_to_human_readable(uploaded_file_len),
                bytes_to_human_readable(total_file_len)
            );

            if uploaded_file_len == total_file_len {
                ic_cdk::println!(
                    "upload_file_chunk: Finished {}. Spawning hash task\n",
                    dest_path
                );

                let delay = core::time::Duration::new(0, 0);
                let hash_closure = || hash_file(dest_path);
                ic_cdk_timers::set_timer(delay, hash_closure);
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
