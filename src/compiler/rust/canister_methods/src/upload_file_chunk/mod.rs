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

        #[ic_cdk_macros::update(guard = guard_against_non_controllers)]
        pub fn upload_file_chunk(
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
                bytes_to_human_readable(uploaded_file_len),
                bytes_to_human_readable(total_file_len),
                percentage_complete
            );

            if uploaded_file_len == total_file_len {
                start_hash(dest_path)
            }
        }

        pub fn guard_against_non_controllers() -> Result<(), String> {
            if ic_cdk::api::is_controller(&ic_cdk::api::caller()) {
                return Ok(());
            }
            return Err("Not Authorized: only controllers of this canister may call this method".to_string());
        }

        pub fn start_hash(dest_path: String) {
            let delay = core::time::Duration::new(0, 0);
            let hash_closure = || hash_file(dest_path);
            ic_cdk_timers::set_timer(delay, hash_closure);
        }

        pub fn bytes_to_human_readable(size_in_bytes: u64) -> String {
            let suffixes = ["B", "KiB", "MiB", "GiB"];
            let size = size_in_bytes as f64;

            let result = suffixes.iter().fold(
                (size, suffixes[0], false),
                |(remaining_size, selected_suffix, done), suffix| {
                    if done {
                        return (remaining_size, selected_suffix, done);
                    }
                    if remaining_size < 1024.0 {
                        (remaining_size, suffix, true)
                    } else {
                        (remaining_size / 1024.0, suffix, false)
                    }
                },
            );

            format!("{:.2} {}", result.0, result.1)
        }
    }
}
