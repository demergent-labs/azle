use crate::{
    ic, quickjs_with_ctx, wasm_binary_manipulation::get_js_code, CONTEXT_REF_CELL, MODULE_NAME,
};
use std::error::Error;

#[no_mangle]
pub fn get_candid_and_method_meta_pointer() -> *mut std::os::raw::c_char {
    std::panic::set_hook(Box::new(|panic_info| {
        let msg = if let Some(s) = panic_info.payload().downcast_ref::<&str>() {
            *s
        } else if let Some(s) = panic_info.payload().downcast_ref::<String>() {
            s.as_str()
        } else {
            "Unknown panic message"
        };

        let location = if let Some(location) = panic_info.location() {
            format!(" at {}:{}", location.file(), location.line())
        } else {
            " (unknown location)".to_string()
        };

        let message = &format!("Panic occurred: {}{}", msg, location);

        ic_cdk::println!("{}", message);
    }));

    match initialize_and_get_candid() {
        Ok(c_string) => c_string,
        Err(e) => {
            ic_cdk::trap(&format!("Error during candid initialization: {}", e));
        }
    }
}

fn initialize_and_get_candid() -> Result<*mut std::os::raw::c_char, Box<dyn Error>> {
    let runtime = rquickjs::Runtime::new()?;
    let context = rquickjs::Context::full(&runtime)?;

    CONTEXT_REF_CELL.with(|context_ref_cell| {
        *context_ref_cell.borrow_mut() = Some(context);
    });

    quickjs_with_ctx(|ctx| -> Result<*mut std::os::raw::c_char, Box<dyn Error>> {
        ctx.clone()
            .globals()
            .set("_azleNodeWasmEnvironment", true)?;

        ic::register(ctx.clone())?;

        ctx.clone()
            .globals()
            .set("exports", rquickjs::Object::new(ctx.clone())?)?;

        ctx.clone().globals().set("_azleExperimental", false)?;

        let js = get_js_code()?;

        rquickjs::Module::evaluate(ctx.clone(), MODULE_NAME, std::str::from_utf8(&js)?)?;

        let get_candid_and_method_meta: rquickjs::Function =
            ctx.globals().get("_azleGetCandidAndMethodMeta")?;

        let candid_and_method_meta: String = get_candid_and_method_meta.call(())?;

        let c_string = std::ffi::CString::new(candid_and_method_meta)?;

        Ok(c_string.into_raw())
    })
}
