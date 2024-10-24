use std::error::Error;

use crate::{
    error::{handle_promise_error, quickjs_call_with_error_handling},
    ic, quickjs_with_ctx,
    wasm_binary_manipulation::get_js_code,
    CONTEXT_REF_CELL, MODULE_NAME,
};

type CCharPtr = *mut std::os::raw::c_char;

#[no_mangle]
pub fn get_candid_and_method_meta_pointer() -> CCharPtr {
    match initialize_and_get_candid() {
        Ok(c_char_ptr) => c_char_ptr,
        Err(error) => {
            ic_cdk::trap(&format!("Azle CandidAndMethodMetaError: {}", error));
        }
    }
}

fn initialize_and_get_candid() -> Result<CCharPtr, Box<dyn Error>> {
    let runtime = rquickjs::Runtime::new()?;
    let context = rquickjs::Context::full(&runtime)?;

    CONTEXT_REF_CELL.with(|context_ref_cell| {
        *context_ref_cell.borrow_mut() = Some(context);
    });

    quickjs_with_ctx(|ctx| -> Result<CCharPtr, Box<dyn Error>> {
        ctx.clone()
            .globals()
            .set("_azleNodeWasmEnvironment", true)?;

        ctx.clone()
            .globals()
            .set("exports", rquickjs::Object::new(ctx.clone())?)?;

        ctx.clone().globals().set("_azleExperimental", false)?;

        ic::register(ctx.clone())?;

        let js = get_js_code();

        let promise =
            rquickjs::Module::evaluate(ctx.clone(), MODULE_NAME, std::str::from_utf8(&js)?)?;

        handle_promise_error(ctx.clone(), promise)?;

        let get_candid_and_method_meta: rquickjs::Function = ctx
            .clone()
            .globals()
            .get("_azleGetCandidAndMethodMeta")
            .map_err(|e| {
                format!(
                    "Failed to get globalThis._azleGetCandidAndMethodMeta: {}",
                    e
                )
            })?;

        let candid_and_method_meta_js_value =
            quickjs_call_with_error_handling(ctx.clone(), get_candid_and_method_meta, ())?;

        let candid_and_method_meta: String = candid_and_method_meta_js_value
            .as_string()
            .ok_or("Failed to convert candidAndMethodMeta JS value to string")?
            .to_string()?;

        let c_string = std::ffi::CString::new(candid_and_method_meta)?;
        let c_char_ptr = c_string.into_raw();

        Ok(c_char_ptr)
    })
}
