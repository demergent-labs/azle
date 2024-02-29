// TODO we need an easy way to see the expanded file now
// TODO perhaps we should automatically do this and store it in the filesystem for easy retrieval?

use std::fs;

use proc_macro::TokenStream;
use proc_macro2::Ident;
use quote::{format_ident, quote};
use serde::{Deserialize, Serialize};

trait ToIdent {
    fn to_ident(&self) -> Ident;
}

impl ToIdent for String {
    fn to_ident(&self) -> Ident {
        format_ident!("{}", self)
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct CompilerInfo {
    canister_methods: CanisterMethods,
    env_vars: Vec<(String, String)>,
}

#[derive(Debug, Serialize, Deserialize)]
struct CanisterMethods {
    init: Option<CanisterMethod>,
    post_upgrade: Option<CanisterMethod>,
    pre_upgrade: Option<CanisterMethod>,
    inspect_message: Option<CanisterMethod>,
    heartbeat: Option<CanisterMethod>,
    queries: Vec<CanisterMethod>,
    updates: Vec<CanisterMethod>,
}

#[derive(Debug, Serialize, Deserialize)]
struct CanisterMethod {
    name: String,
    composite: Option<bool>,
    guard_name: Option<String>,
}

#[proc_macro]
pub fn canister_methods(_: TokenStream) -> TokenStream {
    let compiler_info = get_compiler_info("canister/src/compiler_info.json").unwrap();

    let env_vars: Vec<_> = compiler_info
        .env_vars
        .iter()
        .map(|(key, value)| quote!((#key, #value)))
        .collect();

    let init_method_call = compiler_info.canister_methods.init.map(|init_method| {
        let js_function_name = &init_method.name;

        quote!(execute_js(#js_function_name, true);)
    });

    let init_method = quote! {
        #[ic_cdk_macros::init]
        fn init() {
            ic_wasi_polyfill::init(&[], &[#(#env_vars),*]);

            ASSETS_DIR.extract("/").unwrap();

            initialize_js(std::str::from_utf8(MAIN_JS).unwrap(), true);
        }
    };

    let post_upgrade_method_call =
        compiler_info
            .canister_methods
            .post_upgrade
            .map(|post_upgrade_method| {
                let js_function_name = &post_upgrade_method.name;

                quote!(execute_js(#js_function_name, true);)
            });

    let post_upgrade_method = quote! {
        #[ic_cdk_macros::post_upgrade]
        fn post_upgrade() {
            ic_wasi_polyfill::init(&[], &[#(#env_vars),*]);

            ASSETS_DIR.extract("/").unwrap();

            initialize_js(std::str::from_utf8(MAIN_JS).unwrap(), false);
        }
    };

    let pre_upgrade_method = compiler_info
        .canister_methods
        .pre_upgrade
        .map(|canister_method| {
            let rust_function_name = canister_method.name.to_ident();
            let js_function_name = &canister_method.name;

            quote! {
                #[ic_cdk_macros::pre_upgrade]
                fn #rust_function_name() {
                    execute_js(#js_function_name, false);
                }
            }
        });

    let inspect_message_method =
        compiler_info
            .canister_methods
            .inspect_message
            .map(|canister_method| {
                let rust_function_name = canister_method.name.to_ident();
                let js_function_name = &canister_method.name;

                quote! {
                    #[ic_cdk_macros::inspect_message]
                    fn #rust_function_name() {
                        execute_js(#js_function_name, true);
                    }
                }
            });

    let heartbeat_method = compiler_info
        .canister_methods
        .heartbeat
        .map(|canister_method| {
            let rust_function_name = canister_method.name.to_ident();
            let js_function_name = &canister_method.name;

            quote! {
                #[ic_cdk_macros::heartbeat]
                fn #rust_function_name() {
                    execute_js(#js_function_name, false);
                }
            }
        });

    let query_methods = compiler_info
        .canister_methods
        .queries
        .iter()
        .map(|canister_method| {
            let rust_function_name = canister_method.name.to_ident();
            let js_function_name = &canister_method.name;
            let is_composite = canister_method.composite.unwrap_or(false);

            let (guard_attribute, guard_function) = if let Some(guard_name) = &canister_method.guard_name
            {
                get_guard_token_stream(guard_name)
            } else {
                (quote!(), quote!())
            };

            quote! {
                #[ic_cdk_macros::query(manual_reply = true, composite = #is_composite #guard_attribute)]
                fn #rust_function_name() {
                    execute_js(#js_function_name, true);
                }

                #guard_function
            }
        });

    let update_methods = compiler_info
        .canister_methods
        .updates
        .iter()
        .map(|canister_method| {
            let rust_function_name = canister_method.name.to_ident();
            let js_function_name = &canister_method.name;

            let (guard_attribute, guard_function) =
                if let Some(guard_name) = &canister_method.guard_name {
                    get_guard_token_stream(guard_name)
                } else {
                    (quote!(), quote!())
                };

            quote! {
                #[ic_cdk_macros::update(manual_reply = true #guard_attribute)]
                fn #rust_function_name() {
                    execute_js(#js_function_name, true);
                }

                #guard_function
            }
        });

    let reload_js = get_reload_js(&compiler_info.env_vars);

    let upload_assets = get_upload_assets();

    let hash_assets = get_hash_assets();

    quote! {
        static ASSETS_DIR: Dir = include_dir!("$CARGO_MANIFEST_DIR/src/assets");

        #init_method

        #post_upgrade_method

        #pre_upgrade_method

        #inspect_message_method

        #heartbeat_method

        #(#query_methods)*

        #(#update_methods)*

        #[ic_cdk_macros::query]
        fn __get_candid_interface_tmp_hack() -> String {
            std::str::from_utf8(CANDID)
                .expect("candid.did could not be read")
                .to_string()
        }

        fn initialize_js(js: &str, init: bool) {
            let mut rt = wasmedge_quickjs::Runtime::new();

            let r = rt.run_with_context(|context| {
                ic::register(context);
                web_assembly::register(context);

                // TODO what do we do if there is an error in here?
                context.eval_global_str("globalThis.exports = {};".to_string());
                context.eval_module_str(js.to_string(), "azle_main");

                run_event_loop(context);

                // let temp = context.eval_module_str(std::str::from_utf8(MAIN_JS).unwrap().to_string(), "azle_main");

                // match &temp {
                //     wasmedge_quickjs::JsValue::Exception(js_exception) => {
                //         js_exception.dump_error();
                //         panic!("we had an error");
                //     },
                //     _ => {}
                // };

                // ic_cdk::println!("temp: {:#?}", temp);
            });

            RUNTIME.with(|runtime| {
                let mut runtime = runtime.borrow_mut();
                *runtime = Some(rt);
            });

            if init == true {
                #init_method_call
            }
            else {
                #post_upgrade_method_call
            }
        }

        #reload_js

        #upload_assets

        #hash_assets
    }
    .into()
}

fn get_compiler_info(compiler_info_path: &str) -> Result<CompilerInfo, String> {
    if let Ok(azle_skip_compiler_info) = std::env::var("AZLE_SKIP_COMPILER_INFO") {
        if azle_skip_compiler_info == "true" {
            return Ok(CompilerInfo {
                canister_methods: CanisterMethods {
                    init: None,
                    post_upgrade: None,
                    pre_upgrade: None,
                    inspect_message: None,
                    heartbeat: None,
                    queries: vec![],
                    updates: vec![],
                },
                env_vars: vec![],
            });
        }
    }

    let compiler_info_string = fs::read_to_string(compiler_info_path)
        .map_err(|err| format!("Error reading {compiler_info_path}: {err}"))?;
    let compiler_info: CompilerInfo = serde_json::from_str(&compiler_info_string)
        .map_err(|err| format!("Error parsing {compiler_info_path}: {err}"))?;

    Ok(compiler_info)
}

fn get_guard_token_stream(
    guard_name: &str,
) -> (proc_macro2::TokenStream, proc_macro2::TokenStream) {
    let guard_name_ident = guard_name.to_string().to_ident();

    (
        quote!(, guard = #guard_name),
        quote! {
            // TODO should the guard function have access to the raw args?
            fn #guard_name_ident() -> Result<(), String> {
                RUNTIME.with(|runtime| {
                    let mut runtime = runtime.borrow_mut();
                    let runtime = runtime.as_mut().unwrap();

                    runtime.run_with_context(|context| {
                        let global = context.get_global();

                        let guard_functions = global.get("_azleGuardFunctions").to_obj().unwrap();

                        let guard_function = guard_functions.get(#guard_name).to_function().unwrap();

                        let result = guard_function.call(&[]);

                        // TODO error handling is mostly done in JS right now
                        // TODO we would really like wasmedge-quickjs to add
                        // TODO good error info to JsException and move error handling
                        // TODO out of our own code
                        match &result {
                            wasmedge_quickjs::JsValue::Exception(js_exception) => {
                                js_exception.dump_error();
                                Err("TODO needs error info".to_string())
                            }
                            _ => {
                                // TODO what if errors happen in here?
                                // TODO can guard functions even be async?
                                // TODO I don't think they can
                                run_event_loop(context);

                                Ok(())
                            }
                        }
                    })
                })
            }
        },
    )
}

// TODO there is no authentication on this method
// TODO it is up to the developer to not deploy with this function
// TODO in the binary if they are worried about it
fn get_reload_js(env_vars: &Vec<(String, String)>) -> proc_macro2::TokenStream {
    let azle_autoreload_env_var = env_vars.iter().find(|(key, _)| key == "AZLE_AUTORELOAD");

    if let Some((_, value)) = azle_autoreload_env_var {
        if value == "true" {
            return quote! {
                #[ic_cdk_macros::update]
                fn reload_js(timestamp: u64, chunk_number: u64, js_bytes: Vec<u8>, total_len: u64) {
                    RELOADED_JS_TIMESTAMP.with(|reloaded_js_timestamp| {
                        let mut reloaded_js_timestamp_mut = reloaded_js_timestamp.borrow_mut();

                        if timestamp > *reloaded_js_timestamp_mut {
                            *reloaded_js_timestamp_mut = timestamp;

                            RELOADED_JS.with(|reloaded_js| {
                                let mut reloaded_js_mut = reloaded_js.borrow_mut();
                                reloaded_js_mut.clear();
                            });
                        }
                    });

                    RELOADED_JS.with(|reloaded_js| {
                        let mut reloaded_js_mut = reloaded_js.borrow_mut();
                        reloaded_js_mut.insert(chunk_number, js_bytes);

                        let reloaded_js_complete_bytes: Vec<u8> = reloaded_js_mut.values().flat_map(|v| v.clone()).collect();

                        if reloaded_js_complete_bytes.len() as u64 == total_len {
                            let js_string = String::from_utf8_lossy(&reloaded_js_complete_bytes);
                            initialize_js(&js_string, false);
                        }
                    });
                }
            };
        }
    }

    quote! {}
}

fn get_upload_assets() -> proc_macro2::TokenStream {
    quote! {
        #[ic_cdk_macros::update]
        pub fn upload_asset(
            dest_path: String,
            timestamp: u64,
            chunk_number: u64,
            asset_bytes: Vec<u8>,
            total_len: u64,
        ) {
            let is_current_time_stamp = UPLOADED_ASSETS_TIMESTAMP.with(|upload_assets_timestamp_map| {
                let mut upload_assets_timestamp_map_mut = upload_assets_timestamp_map.borrow_mut();
                let upload_assets_timestamp = match upload_assets_timestamp_map_mut.get_mut(&dest_path) {
                    Some(timestamp) => timestamp,
                    None => &0,
                };

                if timestamp > *upload_assets_timestamp {
                    upload_assets_timestamp_map_mut.insert(dest_path.clone(), timestamp);
                    clear_asset_data(&dest_path);
                } else if timestamp < *upload_assets_timestamp {
                    // The request is from an earlier upload attempt. Disregard
                    return false;
                }
                true
            });

            if !is_current_time_stamp {
                return;
            }

            let uploaded_asset_len = add_asset_data(&dest_path, asset_bytes, chunk_number) as u64;

            ic_cdk::println!(
                "Length: {}/{} ",
                bytes_to_human_readable(uploaded_asset_len),
                bytes_to_human_readable(total_len)
            );

            if uploaded_asset_len == total_len {
                let delay = core::time::Duration::new(0, 0);
                let write_closure = move || write_file_by_parts(dest_path);
                ic_cdk_timers::set_timer(delay, write_closure);
            }
        }

        fn write_file_by_parts(dest_path: String) {
            let bytes_per_chunk = UPLOADED_ASSETS.with(|uploaded_assets| {
                match uploaded_assets.borrow().get(&dest_path).unwrap().get(&0) {
                    Some(first_bytes) => first_bytes.len(),
                    None => 0,
                }
            });

            let limit = 150 * 1024 * 1024; // The limit is somewhere between 150 and 155 before we run out of instructions.
            let group_size = limit / bytes_per_chunk;

            let dir_path = std::path::Path::new(dest_path.as_str()).parent().unwrap();

            std::fs::create_dir_all(dir_path).unwrap();

            // Create the file, or clear it if it already exists
            std::fs::OpenOptions::new()
                .write(true)
                .truncate(true)
                .create(true)
                .open(&dest_path)
                .unwrap();

            let delay = core::time::Duration::new(0, 0);
            let closure = move || write_group_of_file_chunks(dest_path, 0, group_size);
            ic_cdk_timers::set_timer(delay, closure);
        }

        fn write_group_of_file_chunks(dest_path: String, start_chunk: usize, group_size: usize) {
            // TODO I am assuming this function to be called by write_file_by_parts so when we get here the file should already exist and be empty and ready to write to. That way we don't have to worry about clearing the file on the first write or anything like that.
            let write_complete = UPLOADED_ASSETS.with(|uploaded_assets| {
                if start_chunk == 0 {
                    ic_cdk::println!("START writing: {}", dest_path);
                } else {
                    ic_cdk::println!("Continue writing: {}", dest_path);
                }
                let chunk_of_bytes: Vec<u8> = uploaded_assets
                    .borrow()
                    .get(&dest_path)
                    .unwrap()
                    .into_iter()
                    .skip(start_chunk)
                    .take(group_size)
                    .flat_map(|(_, bytes)| bytes.clone())
                    .collect();

                ic_cdk::println!(
                    "Preparing to write {} bytes to {}",
                    bytes_to_human_readable(chunk_of_bytes.len() as u64),
                    dest_path
                );

                let mut file = std::fs::OpenOptions::new()
                    .write(true)
                    .append(true)
                    .open(&dest_path)
                    .unwrap();

                std::io::Write::write_all(&mut file, &chunk_of_bytes).unwrap();

                let total_chunk_count = uploaded_assets.borrow().get(&dest_path).unwrap().len();
                ic_cdk::print(format!(
                    "{} of {} chunks written!",
                    start_chunk + group_size,
                    total_chunk_count
                ));
                // flush the buffer to ensure all data is written immediately
                std::io::Write::flush(&mut file).unwrap();

                if start_chunk + group_size >= total_chunk_count {
                    ic_cdk::println!(
                        "{} + {} = {} >= {}",
                        start_chunk,
                        group_size,
                        start_chunk + group_size,
                        total_chunk_count
                    );
                    ic_cdk::println!("Finished writing to {}", dest_path);
                    let mut uploaded_assets_mut = uploaded_assets.borrow_mut();
                    uploaded_assets_mut.remove(&dest_path);
                    if uploaded_assets_mut.len() == 0 {
                        ic_cdk::println!("All assets uploaded and cache is cleared.");
                    }
                    true
                } else {
                    false
                }
            });

            let delay = core::time::Duration::new(0, 0);
            if !write_complete {
                let closure =
                    move || write_group_of_file_chunks(dest_path, start_chunk + group_size, group_size);
                ic_cdk_timers::set_timer(delay, closure);
            } else {
                let hash_closure = move || hash_file(dest_path);
                ic_cdk_timers::set_timer(delay, hash_closure);
            }
        }

        fn bytes_to_human_readable(size_in_bytes: u64) -> String {
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

        fn clear_asset_data(dest_path: &String) {
            UPLOADED_ASSETS.with(|upload_assets| {
                let mut upload_assets_mut = upload_assets.borrow_mut();
                match upload_assets_mut.get_mut(dest_path) {
                    Some(uploaded_asset) => uploaded_asset.clear(),
                    None => (),
                }
            });
        }

        // Adds the given asset_bytes to the dest_path asset at the chunk number position. Returns the new total length of dest_path asset after the addition
        fn add_asset_data(dest_path: &String, asset_bytes: Vec<u8>, chunk_number: u64) -> usize {
            UPLOADED_ASSETS.with(|uploaded_assets| {
                let mut uploaded_assets_mut = uploaded_assets.borrow_mut();
                if let Some(bytes_map) = uploaded_assets_mut.get_mut(dest_path) {
                    // If the key exists, insert the value into the inner HashMap
                    bytes_map.insert(chunk_number, asset_bytes);
                    ic_cdk::println!(
                        "File: {}. Chunk: {}. Total chunks processed: {}",
                        dest_path,
                        chunk_number,
                        bytes_map.len()
                    );
                    bytes_map.values().fold(0, |acc, bytes| acc + bytes.len())
                } else {
                    // If the key doesn't exist, initialize a new inner BTreeMap and insert the value
                    let mut new_bytes_map = std::collections::BTreeMap::new();
                    let len = asset_bytes.len();
                    new_bytes_map.insert(chunk_number, asset_bytes);
                    uploaded_assets_mut.insert(dest_path.clone(), new_bytes_map);
                    ic_cdk::println!("First chunk processed for {}", dest_path);
                    len
                }
            })
        }
    }
}

fn get_hash_assets() -> proc_macro2::TokenStream {
    quote! {
        #[ic_cdk_macros::query]
        pub fn get_file_hash(dest_path: String) -> String {
            ASSETS_HASHES
                .with(|asset_hashes| asset_hashes.borrow().get(&dest_path).unwrap().clone())
                .iter()
                .map(|byte| format!("{:02x}", byte))
                .collect()
        }

        #[ic_cdk_macros::query]
        pub fn get_file_hashes() -> Vec<String> {
            ASSETS_HASHES
                .with(|asset_hashes| asset_hashes.borrow().clone())
                .iter()
                .map(|(path, bytes)| {
                    format!(
                        "{}: {}",
                        path,
                        bytes
                            .iter()
                            .map(|bytes| format!("{:02x}", bytes))
                            .collect::<String>()
                    )
                })
                .collect()
        }

        pub fn test_get_file_hash(dest_path: &String) -> String {
            ASSETS_HASHES
                .with(|asset_hashes| asset_hashes.borrow().get(dest_path).unwrap().clone())
                .iter()
                .map(|byte| format!("{:02x}", byte))
                .collect()
        }

        pub fn hash_file(path: String) {
            ic_cdk::println!("START HASH FILE");
            hash_file_by_parts(path, 0)
        }

        fn hash_file_by_parts(path: String, position: u64) {
            ic_cdk::println!("Hash file starting at: {}", bytes_to_human_readable(position));
            let mut file = std::fs::File::open(&path).unwrap();

            std::io::Seek::seek(&mut file, std::io::SeekFrom::Start(position)).unwrap();

            // Read the bytes
            let limit = 120 * 1024 * 1024; // This limit will be determine by how much hashing an update method can do without running out of cycles. It runs out somewhere between 120 and 125
            // This limit must be the same as on the node side or else the hashes will not match
            let mut buffer = vec![0; limit];
            let bytes_read = std::io::Read::read(&mut file, &mut buffer);

            let previous_hash = get_partial_file_hash(&path);

            match bytes_read {
                Ok(bytes_read) => {
                    if bytes_read != 0 {
                        let new_hash = hash_chunk_with(&buffer, previous_hash.as_ref());
                        set_partial_hash(&path, new_hash);
                        let delay = core::time::Duration::new(0, 0);
                        let closure = move || hash_file_by_parts(path, position + bytes_read as u64);
                        ic_cdk_timers::set_timer(delay, closure);
                    } else {
                        // No more bytes to hash, set as final hash for this file
                        match previous_hash {
                            Some(hash) => {
                                set_hash(&path, hash);
                                ic_cdk::println!("Finish hashing");
                                clear_partial_hash(&path);
                                ic_cdk::println!("Partial hash cleared");
                                ic_cdk::println!("Hash: {}", test_get_file_hash(&path));
                            }
                            None => ic_cdk::println!("WARNING: No hash was found for {}", path),
                        }
                    }
                }
                Err(err) => panic!("Error reading file: {}", err),
            }
        }

        pub fn get_partial_file_hash(dest_path: &String) -> Option<Vec<u8>> {
            PARTIAL_ASSETS_HASHES.with(|asset_hashes| asset_hashes.borrow().get(dest_path).cloned())
        }

        fn set_partial_hash(path: &String, hash: Vec<u8>) {
            PARTIAL_ASSETS_HASHES.with(|file_hashes| file_hashes.borrow_mut().insert(path.clone(), hash));
        }

        fn clear_partial_hash(path: &String) {
            PARTIAL_ASSETS_HASHES.with(|file_hashes| file_hashes.borrow_mut().remove(path));
        }

        fn set_hash(path: &String, hash: Vec<u8>) {
            ASSETS_HASHES.with(|file_hashes| file_hashes.borrow_mut().insert(path.clone(), hash));
        }

        fn hash_chunk_with(data: &[u8], previous_hash: Option<&Vec<u8>>) -> Vec<u8> {
            let mut h = <sha2::Sha256 as sha2::Digest>::new();
            sha2::Digest::update(&mut h, data);
            if let Some(hash) = previous_hash {
                sha2::Digest::update(&mut h, hash);
            }
            sha2::Digest::finalize(h).to_vec()
        }

    }
}
