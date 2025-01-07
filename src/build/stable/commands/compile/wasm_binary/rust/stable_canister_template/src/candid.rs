use std::{error::Error, ffi::CString, os::raw::c_char, str};

use ic_cdk::trap;
use rquickjs::{Context, Function, Module, Object, Runtime};

use crate::{
    error::{handle_promise_error, quickjs_call_with_error_handling},
    ic::register,
    quickjs_with_ctx,
    wasm_binary_manipulation::{get_js_code, get_wasm_data},
    CONTEXT_REF_CELL,
};

type CCharPtr = *mut c_char;

#[no_mangle]
pub fn get_candid_and_method_meta_pointer() -> CCharPtr {
    match initialize_and_get_candid() {
        Ok(c_char_ptr) => c_char_ptr,
        Err(error) => {
            trap(&format!("Candid and MethodMeta generation failed: {error}"));
        }
    }
}

fn initialize_and_get_candid() -> Result<CCharPtr, Box<dyn Error>> {
    let runtime = Runtime::new()?;
    let context = Context::full(&runtime)?;

    CONTEXT_REF_CELL.with(|context_ref_cell| {
        *context_ref_cell.borrow_mut() = Some(context);
    });

    quickjs_with_ctx(|ctx| -> Result<CCharPtr, Box<dyn Error>> {
        let globals = ctx.globals();

        globals.set("_azleNodeWasmEnvironment", true)?;

        globals.set("exports", Object::new(ctx.clone())?)?;

        globals.set("_azleExperimental", false)?;

        globals.set("_azleCanisterMethodNames", Object::new(ctx.clone())?)?;

        globals.set("_azleTimerCallbacks", Object::new(ctx.clone())?)?;

        globals.set("_azleIcTimers", Object::new(ctx.clone())?)?;

        globals.set("_azleRejectCallbacks", Object::new(ctx.clone())?)?;

        globals.set("_azleResolveCallbacks", Object::new(ctx.clone())?)?;

        register(ctx.clone())?;

        let wasm_data = get_wasm_data()?;
        let js = get_js_code();

        let promise = Module::evaluate(ctx.clone(), wasm_data.main_js_path, str::from_utf8(&js)?)?;

        handle_promise_error(ctx.clone(), promise)?;

        let get_candid_and_method_meta: Function = ctx
            .globals()
            .get("_azleGetCandidAndMethodMeta")
            .map_err(|e| format!("Failed to get globalThis._azleGetCandidAndMethodMeta: {e}"))?;

        let candid_and_method_meta_js_value =
            quickjs_call_with_error_handling(ctx.clone(), get_candid_and_method_meta, ())?;

        let candid_and_method_meta: String = candid_and_method_meta_js_value
            .as_string()
            .ok_or("Failed to convert candidAndMethodMeta JS value to string")?
            .to_string()?;

        let c_string = CString::new(candid_and_method_meta)?;
        let c_char_ptr = c_string.into_raw();

        Ok(c_char_ptr)
    })
}
