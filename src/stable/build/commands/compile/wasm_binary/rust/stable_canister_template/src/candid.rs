use std::{error::Error, ffi::CString, os::raw::c_char};

use ic_cdk::trap;
use rquickjs::{Array, Context, Function, Module, Object, Runtime, Undefined};

use crate::{
    CONTEXT_REF_CELL,
    error::{handle_promise_error, quickjs_call_with_error_handling},
    ic::register,
    quickjs_with_ctx::{quickjs_with_ctx, run_event_loop},
    wasm_binary_manipulation::{get_js_code, get_wasm_data},
};

type CCharPtr = *mut c_char;

#[unsafe(no_mangle)]
pub fn get_candid_and_method_meta_pointer() -> CCharPtr {
    match initialize_and_get_candid() {
        Ok(c_char_ptr) => c_char_ptr,
        Err(error) => {
            trap(&format!("Candid and MethodMeta generation failed: {error}"));
        }
    }
}

// TODO we need to not be repeating this code, let's move it somewhere
fn initialize_and_get_candid() -> Result<CCharPtr, Box<dyn Error>> {
    let runtime = Runtime::new()?;
    let context = Context::full(&runtime)?;

    CONTEXT_REF_CELL.with(|context_ref_cell| {
        *context_ref_cell.borrow_mut() = Some(context);
    });

    quickjs_with_ctx(|ctx| -> Result<CCharPtr, Box<dyn Error>> {
        let globals = ctx.globals();

        globals.set("_azleActions", Array::new(ctx.clone()))?;

        globals.set("_azleCanisterMethodNames", Object::new(ctx.clone())?)?;

        globals.set("_azleExperimental", false)?;

        globals.set("_azleExportedCanisterClassInstance", Undefined)?;

        globals.set("_azleIcExperimental", Undefined)?;

        globals.set("_azleIcpReplicaWasmEnvironment", false)?;

        // initializes globalThis._azleIcStable
        register(ctx.clone())?;

        globals.set("_azleInitCalled", false)?;

        globals.set("_azleNodeWasmEnvironment", true)?;

        globals.set("_azlePostUpgradeCalled", false)?;

        globals.set("exports", Object::new(ctx.clone())?)?;

        let wasm_data = get_wasm_data()?;
        let js = get_js_code()?;

        // JavaScript macro task
        let promise = Module::evaluate(ctx.clone(), wasm_data.main_js_path.clone(), js)?;

        // We should handle the promise error before run_event_loop
        // as all micro tasks queued from the macro task execution
        // will be discarded if there is a trap
        handle_promise_error(ctx.clone(), promise)?;

        // We consider the Module::evaluate above to be a macro task,
        // thus we drain all micro tasks queued during its execution
        run_event_loop(&ctx);

        let get_candid_and_method_meta: Function = ctx
            .globals()
            .get("_azleGetCandidAndMethodMeta")
            .map_err(|e| format!("Failed to get globalThis._azleGetCandidAndMethodMeta: {e}"))?;

        let candid_and_method_meta_js_value =
            quickjs_call_with_error_handling(&ctx, &get_candid_and_method_meta, ())?;

        let candid_and_method_meta: String = candid_and_method_meta_js_value
            .as_string()
            .ok_or("Failed to convert candidAndMethodMeta JS value to string")?
            .to_string()?;

        let c_string = CString::new(candid_and_method_meta)?;
        let c_char_ptr = c_string.into_raw();

        Ok(c_char_ptr)
    })
}
