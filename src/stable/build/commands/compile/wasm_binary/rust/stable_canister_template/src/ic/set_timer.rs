use core::time::Duration;

use ic_cdk::trap;
use ic_cdk_timers::{TimerId, set_timer};
use rquickjs::{BigInt, Ctx, Function, Result};
use slotmap::Key;

use crate::{quickjs_call_with_error_handling::quickjs_call_with_error_handling, quickjs_with_ctx};

pub fn get_function(ctx: Ctx<'static>) -> Result<Function<'static>> {
    Function::new(
        ctx.clone(),
        move |delay: u64, callback: Function<'static>| -> Result<BigInt> {
            let delay_duration = Duration::new(delay, 0);
            let closure = move || {
                let result =
                    quickjs_with_ctx(|ctx| quickjs_call_with_error_handling(&ctx, &callback, ()));

                if let Err(e) = result {
                    trap(&format!("Azle TimerError: {e}"));
                }
            };

            let timer_id: TimerId = set_timer(delay_duration, closure);
            let timer_id_u64: u64 = timer_id.data().as_ffi();

            Ok(BigInt::from_u64(ctx.clone(), timer_id_u64)?)
        },
    )
}
