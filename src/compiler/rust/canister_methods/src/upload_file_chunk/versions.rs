use quote::quote;

pub fn get_check_if_latest_version_src() -> proc_macro2::TokenStream {
    quote! {
        pub fn check_if_latest_version(dest_path: &str, current_timestamp: u64) -> bool {
            let last_recorded_timestamp = FILE_INFO.with(|uploaded_file_timestamps_map| {
                match uploaded_file_timestamps_map.borrow().get(dest_path) {
                    Some((timestamp, _, _)) => timestamp.clone(),
                    None => 0,
                }
            });
            if current_timestamp < last_recorded_timestamp {
                // The request is from an earlier upload attempt. Disregard
                return false;
            }
            if current_timestamp > last_recorded_timestamp {
                // The request is from a newer upload attempt. Clean up the previous attempt.
                if let Err(err) = reset_for_new_upload(dest_path, current_timestamp) {
                    // TODO error handling?
                    // These files may clutter the file system and take up space but otherwise are harmless.
                    // Unless they don't get overwritten properly and the chunk-writer tries to use them to create the next version of this file.
                    ic_cdk::println!(
                        "WARNING: Failed to delete file {} uploaded at {}. {}",
                        dest_path,
                        current_timestamp,
                        err
                    );
                }
            }
            true
        }

        fn reset_for_new_upload(path: &str, timestamp: u64) -> std::io::Result<()> {
            FILE_INFO.with(|file_info| {
                let mut file_info_mut = file_info.borrow_mut();

                file_info_mut.insert(path.to_string(), (timestamp, 0, vec![]));
            });
            // TODO check if the file exists
            std::fs::remove_file(path)?;
            Ok(())
        }

    }
}
