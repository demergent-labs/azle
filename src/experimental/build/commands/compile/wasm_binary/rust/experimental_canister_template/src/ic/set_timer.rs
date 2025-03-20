use slotmap::Key;
use wasmedge_quickjs::{Context, JsFn, JsValue};

use crate::{RUNTIME, run_event_loop};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, _this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let delay_string = if let JsValue::String(js_string) = argv.get(0).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };
        let delay_u64: u64 = delay_string.parse().unwrap();
        let delay = core::time::Duration::new(delay_u64, 0);

        let callback = argv.get(1).unwrap().clone().to_function().unwrap();

        let closure = move || {
            let result = callback.call(&[]);

            // TODO error handling is mostly done in JS right now
            // TODO we would really like wasmedge-quickjs to add
            // TODO good error info to JsException and move error handling
            // TODO out of our own code
            match &result {
                wasmedge_quickjs::JsValue::Exception(js_exception) => {
                    js_exception.dump_error();
                    panic!("TODO needs error info");
                }
                _ => {
                    RUNTIME.with(|runtime| {
                        let mut runtime = runtime.borrow_mut();
                        let runtime = runtime.as_mut().unwrap();

                        runtime.run_with_context(|context| {
                            run_event_loop(context);
                        });
                    });
                }
            };

            // TODO handle errors
        };

        let timer_id: ic_cdk_timers::TimerId = ic_cdk_timers::set_timer(delay, closure);
        let timer_id_u64: u64 = timer_id.data().as_ffi();

        context.new_string(&timer_id_u64.to_string()).into()
    }
}
