use std::{cell::RefCell, rc::Rc};

use slotmap::Key;
use wasmedge_quickjs::{AsObject, Context, JsFn, JsValue};

use crate::{RUNTIME, ic::drain_microtasks};

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

        let timer_id_u64_rc: Rc<RefCell<Option<u64>>> = Rc::new(RefCell::new(None));
        let timer_id_u64_rc_cloned_for_cleanup_closure = timer_id_u64_rc.clone();
        let timer_id_u64_rc_cloned_for_timer_closure = timer_id_u64_rc.clone();

        let mut context_clone = context.clone();

        let cleanup_scopeguard = scopeguard::guard((), move |_| {
            let timer_id = timer_id_u64_rc_cloned_for_cleanup_closure.borrow().unwrap();

            let global = context_clone.get_global();
            let timer_callbacks = global.get("_azleTimerCallbacks");

            timer_callbacks
                .to_obj()
                .unwrap()
                .delete(&timer_id.to_string());
        });

        let closure = move || {
            let _cleanup_scopeguard = cleanup_scopeguard;

            let timer_id = timer_id_u64_rc_cloned_for_timer_closure.borrow().unwrap();

            RUNTIME.with(|runtime| {
                let mut runtime = runtime.borrow_mut();
                let runtime = runtime.as_mut().unwrap();

                runtime.run_with_context(|context| {
                    let global = context.get_global();

                    let timer_callback = global
                        .get("_azleTimerCallbacks")
                        .to_obj()
                        .unwrap()
                        .get(&timer_id.to_string())
                        .to_function()
                        .unwrap();

                    let result = timer_callback.call(&[]);

                    // TODO error handling is mostly done in JS right now
                    // TODO we would really like wasmedge-quickjs to add
                    // TODO good error info to JsException and move error handling
                    // TODO out of our own code
                    match &result {
                        wasmedge_quickjs::JsValue::Exception(js_exception) => {
                            js_exception.dump_error();
                            panic!("TODO needs error info");
                        }
                        _ => drain_microtasks(context),
                    };

                    // TODO handle errors
                });
            });
        };

        let timer_id: ic_cdk_timers::TimerId = ic_cdk_timers::set_timer(delay, closure);
        let timer_id_u64: u64 = timer_id.data().as_ffi();

        *timer_id_u64_rc.borrow_mut() = Some(timer_id_u64);

        context.new_string(&timer_id_u64.to_string()).into()
    }
}
