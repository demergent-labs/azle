use crate::{error::handle_promise_error, quickjs_with_ctx};

#[no_mangle]
#[allow(unused)]
pub extern "C" fn execute_method_js(function_index: i32, pass_arg_data: i32) {
    let function_name = function_index.to_string();
    let pass_arg_data = pass_arg_data == 1;

    let quickjs_result = quickjs_with_ctx(|ctx| {
        let callbacks: rquickjs::Object = ctx
            .clone()
            .globals()
            .get("_azleCallbacks")
            .map_err(|e| format!("Failed to get _azleCallbacks global: {}", e))?;

        let method_callback: rquickjs::Function = callbacks
            .get(&function_name)
            .map_err(|e| format!("Failed to get method callback from _azleCallbacks: {}", e))?;

        let candid_args = if pass_arg_data {
            ic_cdk::api::call::arg_data_raw()
        } else {
            vec![]
        };

        let promise: rquickjs::Promise = method_callback
            .call((candid_args,))
            .map_err(|e| format!("Failed to execute method callback: {}", e))?;

        handle_promise_error(ctx.clone(), promise)?;

        Ok(())
    });

    if let Err(e) = quickjs_result {
        ic_cdk::trap(&format!("Azle CanisterMethodError: {}", e));
    }
}
