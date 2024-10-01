use wasmedge_quickjs::AsObject;

use crate::CONTEXT;

#[no_mangle]
#[allow(unused)]
pub extern "C" fn execute_method_js(function_index: i32, pass_arg_data: i32) {
    let function_name = &function_index.to_string();
    let pass_arg_data = if pass_arg_data == 1 { true } else { false };

    // TODO call these refcells or something
    CONTEXT.with(|context| {
        let context = context.borrow();
        let context = context.as_ref().unwrap();

        context.with(|context| {
            let callbacks: rquickjs::Object =
                context.clone().globals().get("_azleCallbacks").unwrap();

            let method_callback: rquickjs::Function = callbacks.get(function_name).unwrap();

            let candid_args = if pass_arg_data {
                ic_cdk::api::call::arg_data_raw()
            } else {
                vec![]
            };

            method_callback
                .call::<_, rquickjs::Undefined>((candid_args,))
                .unwrap();

            run_event_loop(context.clone());
        });
    });
}
