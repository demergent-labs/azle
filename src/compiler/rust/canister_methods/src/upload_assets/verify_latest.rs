use quote::quote;

pub fn get_verify_latest() -> proc_macro2::TokenStream {
    quote! {
        pub fn verify_latest_version(dest_path: &str, current_timestamp: u64) -> bool {
            let last_recorded_timestamp = UPLOADED_FILE_TIMESTAMPS.with(|uploaded_file_timestamps_map| {
                match uploaded_file_timestamps_map.borrow().get(dest_path) {
                    Some(timestamp) => timestamp.clone(),
                    None => 0,
                }
            });
            if current_timestamp > last_recorded_timestamp {
                // The request is from a newer upload attempt. Clean up the previous attempt.
                if let Err(err) = reset_for_new_upload(dest_path, current_timestamp) {
                    // TODO error handling?
                    // These files may clutter the file system and take up space but otherwise are harmless.
                    // Unless they don't get overwritten properly and the chunk-writer tries to use them to create the next version of this file.
                    ic_cdk::println!(
                        "WARNING: Failed to delete file {} uploaded at {}. {}",
                        dest_path,
                        current_timestamp
                        err
                    );
                }
                true
            } else if current_timestamp < last_recorded_timestamp {
                // The request is from an earlier upload attempt. Disregard
                false
            } else {
                // The request is from the current upload attempt.
                true
            }
        }

        fn reset_for_new_upload(path: &str, timestamp: u64) -> std::io::Result<()> {
            UPLOADED_FILE_TIMESTAMPS.with(|upload_file_timestamps_map| {
                let mut upload_file_timestamps_map_mut = upload_file_timestamps_map.borrow_mut();

                upload_file_timestamps_map_mut.insert(path.to_string(), timestamp);
            });
            // TODO check if the file exists
            std::fs::remove_file(path)?;
            Ok(())
        }

    }
}
