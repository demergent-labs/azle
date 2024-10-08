use crate::{
    quickjs_with_ctx, run_event_loop, wasm_binary_manipulation::get_js_code, CONTEXT_REF_CELL,
    MODULE_NAME,
};

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

    CONTEXT_REF_CELL.with(|context_ref_cell| {
        *context_ref_cell.borrow_mut() = Some(context);
    });

    quickjs_with_ctx(|ctx| {
        ctx.clone()
            .globals()
            .set("_azleNodeWasmEnvironment", true)
            .unwrap();

        // TODO is this appropriate?
        // TODO I don't think we actually need to hook this up
        // TODO And it's probably better not to
        // TODO let's look into doing this well
        // TODO maybe we can just set a property on _azleIc to determine what should be done
        // TODO like mocking
        ctx.clone()
            .globals()
            .set("_azleIcStable", rquickjs::Object::new(ctx.clone()).unwrap())
            .unwrap();

        ctx.clone()
            .globals()
            .set("exports", rquickjs::Object::new(ctx.clone()).unwrap())
            .unwrap();

        ctx.clone()
            .globals()
            .set("_azleExperimental", false)
            .unwrap();

        let js = get_js_code();

        // TODO is there a better name for this main module?
        // TODO this returns a promise...make sure we handle it appropriately
        rquickjs::Module::evaluate(ctx.clone(), MODULE_NAME, js).unwrap();

        run_event_loop(ctx.clone());

        let get_candid_and_method_meta: rquickjs::Function =
            ctx.globals().get("_azleGetCandidAndMethodMeta").unwrap();

        let candid_and_method_meta: String = get_candid_and_method_meta.call(()).unwrap();

        let c_string = std::ffi::CString::new(candid_and_method_meta).unwrap();

        c_string.into_raw()
    })
}
