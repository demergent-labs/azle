use rquickjs::{Ctx, Function};
use slotmap::Key;

use crate::quickjs_with_ctx;

pub fn get_function(ctx: Ctx) -> Function {
    Function::new(ctx, |delay: String, callback_id: String| {
        let delay: u64 = delay.parse().unwrap();
        let delay_duration = core::time::Duration::new(delay, 0);

        let closure = move || {
            quickjs_with_ctx(|ctx| {
                let global = ctx.globals();
                let timer_callbacks = global
                    .get::<_, rquickjs::Object>("_azleTimerCallbacks")
                    .unwrap();
                let timer_callback: Function = timer_callbacks.get(callback_id.as_str()).unwrap();

                let result = timer_callback.call::<_, rquickjs::Value>(()).unwrap();

                if result.is_exception() {
                    panic!("Timer callback threw an exception");
                }
            });
        };

        let timer_id: ic_cdk_timers::TimerId = ic_cdk_timers::set_timer(delay_duration, closure);
        let timer_id_u64: u64 = timer_id.data().as_ffi();

        timer_id_u64
    })
    .unwrap()
}
