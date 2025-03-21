use core::time::Duration;

use ic_cdk::trap;
use ic_cdk_timers::{TimerId, set_timer_interval};
use rquickjs::{BigInt, Ctx, Function, Result};
use slotmap::Key;

use crate::quickjs::{call_with_error_handling, with_ctx};

pub fn get_function(ctx: Ctx<'static>) -> Result<Function<'static>> {
    Function::new(
        ctx.clone(),
        move |interval: u64, callback: Function<'static>| -> Result<BigInt> {
            let interval_duration = Duration::new(interval, 0);
            let closure = move || {
                let result = with_ctx(|ctx| call_with_error_handling(&ctx, &callback, ()));

                if let Err(e) = result {
                    trap(&format!("Azle TimerError: {e}"));
                }
            };

            let timer_id: TimerId = set_timer_interval(interval_duration, closure);
            let timer_id_u64: u64 = timer_id.data().as_ffi();

            Ok(BigInt::from_u64(ctx.clone(), timer_id_u64)?)
        },
    )
}
