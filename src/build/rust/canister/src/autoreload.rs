use std::{cell::RefCell, collections::BTreeMap};

use crate::init_and_post_upgrade::initialize_js;

thread_local! {
    static RELOADED_JS_TIMESTAMP: RefCell<u64> = RefCell::new(0);
    static RELOADED_JS: RefCell<BTreeMap<u64, Vec<u8>>> = RefCell::new(BTreeMap::new());
}

pub fn reload_js(
    timestamp: u64,
    chunk_number: u64,
    js_bytes: Vec<u8>,
    total_len: u64,
    function_index: i32,
) {
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

        let reloaded_js_complete_bytes: Vec<u8> =
            reloaded_js_mut.values().flat_map(|v| v.clone()).collect();

        if reloaded_js_complete_bytes.len() as u64 == total_len {
            let js_string = String::from_utf8_lossy(&reloaded_js_complete_bytes);
            initialize_js(&js_string, false, function_index, 1); // TODO should the last arg be 0?
            ic_cdk::println!("Azle: Reloaded canister JavaScript");
        }
    });
}
