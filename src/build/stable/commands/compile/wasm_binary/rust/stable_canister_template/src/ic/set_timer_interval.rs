use rquickjs::{Ctx, Function};
use slotmap::Key;

use crate::{quickjs_with_ctx, run_event_loop};

pub fn get_function(ctx: Ctx) -> Function {
    Function::new(ctx, |interval: String, callback_id: String| {
        let interval: u64 = interval.parse().unwrap();
        let interval_duration = core::time::Duration::new(interval, 0);

        let closure = move || {
            quickjs_with_ctx(|ctx| {
                let global = ctx.globals();
                let timer_callbacks = global
                    .get::<_, rquickjs::Object>("_azleTimerCallbacks")
                    .unwrap();
                let timer_callback: Function = timer_callbacks.get(callback_id.as_str()).unwrap();

                let result = timer_callback.call::<_, rquickjs::Value>(()).unwrap();

                if result.is_exception() {
                    panic!("Timer interval callback threw an exception");
                }

                run_event_loop(ctx.clone());
            });
        };

        let timer_id: ic_cdk_timers::TimerId =
            ic_cdk_timers::set_timer_interval(interval_duration, closure);
        let timer_id_u64: u64 = timer_id.data().as_ffi();

        timer_id_u64
    })
    .unwrap()
}
