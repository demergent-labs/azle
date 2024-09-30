use wasmedge_quickjs::AsObject;

use crate::{ic, run_event_loop, wasm_binary_manipulation::get_js_code, EXPERIMENTAL, RUNTIME};

// Heavily inspired by https://stackoverflow.com/a/47676844
#[no_mangle]
pub fn get_candid_and_method_meta_pointer() -> *mut std::os::raw::c_char {
    std::panic::set_hook(Box::new(|panic_info| {
        let msg = match panic_info.payload().downcast_ref::<&str>() {
            Some(s) => *s,
            None => "Unknown panic message",
        };
        let location = if let Some(location) = panic_info.location() {
            format!(" at {}:{}", location.file(), location.line())
        } else {
            " (unknown location)".to_string()
        };

        let message = &format!("Panic occurred: {}{}", msg, location);

        ic_cdk::println!("{}", message);
    }));

    RUNTIME.with(|_| {
        let mut runtime = wasmedge_quickjs::Runtime::new();

        runtime.run_with_context(|context| {
            context.get_global().set(
                "_azleNodeWasmEnvironment",
                wasmedge_quickjs::JsValue::Bool(true),
            );

            ic::register(context);

            let js = get_js_code();

            // TODO what do we do if there is an error in here?
            context.eval_global_str("globalThis.exports = {};".to_string());
            context.eval_global_str(format!("globalThis._azleExperimental = {EXPERIMENTAL};"));
            context.eval_module_str(std::str::from_utf8(&js).unwrap().to_string(), "azle_main");

            run_event_loop(context);

            let global = context.get_global();

            let get_candid_and_method_meta = global
                .get("_azleGetCandidAndMethodMeta")
                .to_function()
                .unwrap();

            let candid_and_method_meta = get_candid_and_method_meta.call(&[]);

            // TODO error handling is mostly done in JS right now
            // TODO we would really like wasmedge-quickjs to add
            // TODO good error info to JsException and move error handling
            // TODO out of our own code
            match &candid_and_method_meta {
                wasmedge_quickjs::JsValue::Exception(js_exception) => {
                    js_exception.dump_error();
                    panic!("TODO needs error info");
                }
                _ => run_event_loop(context),
            };

            let candid_and_method_meta_string =
                candid_and_method_meta.to_string().unwrap().to_string();

            let c_string = std::ffi::CString::new(candid_and_method_meta_string).unwrap();

            c_string.into_raw()
        })
    })
}
