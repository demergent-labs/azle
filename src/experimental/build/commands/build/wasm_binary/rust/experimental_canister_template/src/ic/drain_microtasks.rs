use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;

impl JsFn for NativeFunction {
    fn call(context: &mut Context, _this_val: JsValue, _argv: &[JsValue]) -> JsValue {
        drain_microtasks(context);
        JsValue::UnDefined
    }
}

pub fn drain_microtasks(context: &mut Context) {
    context.promise_loop_poll();

    loop {
        let num_tasks = context.event_loop().unwrap().run_tick_task();
        context.promise_loop_poll();

        if num_tasks == 0 {
            break;
        }
    }
}
