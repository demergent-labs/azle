use wasmedge_quickjs::AsObject;

use crate::{wasm_binary_manipulation::get_js_code, CONTEXT, RUNTIME};

// TODO we might not need any of these panic hooks

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

    let runtime = rquickjs::Runtime::new().unwrap();
    let context = rquickjs::Context::full(&runtime).unwrap();

    context.with(|context| {
        context
            .clone()
            .globals()
            .set("_azleNodeWasmEnvironment", true)
            .unwrap();

        // TODO is this appropriate?
        // TODO I don't think we actually need to hook this up
        // TODO And it's probably better not to
        // TODO let's look into doing this well
        // TODO maybe we can just set a property on _azleIc to determine what should be done
        // TODO like mocking
        context
            .clone()
            .globals()
            .set("_azleIc", rquickjs::Object::new(context.clone()).unwrap())
            .unwrap();

        context
            .clone()
            .globals()
            .set("exports", rquickjs::Object::new(context.clone()).unwrap())
            .unwrap();

        context
            .clone()
            .globals()
            .set("_azleExperimental", false)
            .unwrap();

        let js = get_js_code();

        // TODO is there a better name for this main module?
        rquickjs::Module::evaluate(context.clone(), "azle_main", js);

        run_event_loop(context);

        let get_candid_and_method_meta: rquickjs::Function = context
            .globals()
            .get("_azleGetCandidAndMethodMeta")
            .unwrap();

        let candid_and_method_meta: String = get_candid_and_method_meta.call(()).unwrap();

        let c_string = std::ffi::CString::new(candid_and_method_meta).unwrap();

        c_string.into_raw()
    })
}
