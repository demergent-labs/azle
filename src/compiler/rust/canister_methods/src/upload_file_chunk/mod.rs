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

            let is_latest_version = check_if_latest_version(&dest_path, timestamp);

            if !is_latest_version {
                return;
            }

            let uploaded_file_len =
                write_chunk(&dest_path, file_bytes, start_index, total_file_len).unwrap();

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
                start_hash(dest_path)
            }
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
                (size, "", false),
                |(remaining_size, selected_suffix, done), suffix| {
                    if done {
                        return (remaining_size, selected_suffix, done);
                    }
                    if remaining_size < 1024.0 {
                        (remaining_size, selected_suffix, true)
                    } else {
                        (remaining_size / 1024.0, suffix, false)
                    }
                },
            );

            format!("{:.2} {}", result.0, result.1)
        }
    }
}
