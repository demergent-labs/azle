use crate::quickjs_with_ctx;
use std::error::Error;

#[no_mangle]
#[allow(unused)]
pub extern "C" fn execute_method_js(function_index: i32, pass_arg_data: i32) {
    let function_name = function_index.to_string();
    let pass_arg_data = pass_arg_data == 1;

    if let Err(error) = quickjs_with_ctx(|ctx| -> Result<(), Box<dyn Error>> {
        let callbacks: rquickjs::Object = ctx.clone().globals().get("_azleCallbacks")?;

        let method_callback: rquickjs::Function = callbacks.get(&function_name)?;

        let candid_args = if pass_arg_data {
            ic_cdk::api::call::arg_data_raw()
        } else {
            vec![]
        };

        method_callback.call::<_, rquickjs::Undefined>((candid_args,))?;

        Ok(())
    }) {
        ic_cdk::trap(&format!("Azle MethodExecutionError: {}", error));
    }
}
