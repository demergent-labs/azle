use quote::quote;

pub fn get_check_if_latest_version_src() -> proc_macro2::TokenStream {
    quote! {
        pub fn check_if_latest_version(dest_path: &str, current_timestamp: Timestamp) -> bool {
            let last_recorded_timestamp = get_timestamp(dest_path);

            if current_timestamp < last_recorded_timestamp {
                // The request is from an earlier upload attempt. Disregard
                return false;
            }

            if current_timestamp > last_recorded_timestamp {
                // The request is from a newer upload attempt. Clean up the previous attempt.
                reset_for_new_upload(dest_path, current_timestamp).unwrap();
            }

            true
        }

        fn get_timestamp(path: &str) -> Timestamp {
            FILE_INFO.with(|uploaded_file_timestamps_map| {
                match uploaded_file_timestamps_map.borrow().get(path) {
                    Some((timestamp, _, _, _)) => timestamp.clone(),
                    None => 0,
                }
            })
        }

        #[ic_cdk_macros::update(guard = guard_against_non_controllers)]
        pub fn clear_file_and_info(path: String) {
            reset_for_new_upload(&path, 0).unwrap()
        }

        fn reset_for_new_upload(path: &str, timestamp: Timestamp) -> std::io::Result<()> {
            delete_if_exists(path)?;
            initialize_file_info(path, timestamp);
            Ok(())
        }

        fn initialize_file_info(path: &str, timestamp: Timestamp) {
            FILE_INFO.with(|file_info| {
                let mut file_info_mut = file_info.borrow_mut();

                file_info_mut.insert(path.to_string(), (timestamp, 0, None, 0));
            });
        }

        fn delete_if_exists(path: &str) -> std::io::Result<()> {
            if std::fs::metadata(path).is_ok() {
                std::fs::remove_file(path)?;
            }
            Ok(())
        }

    }
}
