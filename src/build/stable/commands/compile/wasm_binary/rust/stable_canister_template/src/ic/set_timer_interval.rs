use core::time::Duration;

use ic_cdk::trap;
use ic_cdk_timers::{set_timer_interval, TimerId};
use rquickjs::{Ctx, Function, Object, Result};
use slotmap::Key;

use crate::{error::quickjs_call_with_error_handling, ic::throw_error, quickjs_with_ctx};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx.clone(),
        move |interval: String, callback_id: String| -> Result<u64> {
            let interval: u64 = interval.parse().map_err(|e| throw_error(ctx.clone(), e))?;
            let interval_duration = Duration::new(interval, 0);

            let closure = move || {
                let result = quickjs_with_ctx(|ctx| {
                    let globals = ctx.globals();

                    let timer_callbacks: Object =
                        globals.get("_azleTimerCallbacks").map_err(|e| {
                            format!("Failed to get globalThis._azleTimerCallbacks: {e}")
                        })?;
                    let timer_callback: Function =
                        timer_callbacks.get(callback_id.as_str()).map_err(|e| {
                            format!(
                                "Failed to get globalThis._azleTimerCallbacks[{callback_id}]: {e}"
                            )
                        })?;

                    quickjs_call_with_error_handling(ctx, timer_callback, ())?;

                    Ok(())
                });

                if let Err(e) = result {
                    trap(&format!("Azle TimerIntervalError: {e}"));
                }
            };

            let timer_id: TimerId = set_timer_interval(interval_duration, closure);
            let timer_id_u64: u64 = timer_id.data().as_ffi();

            Ok(timer_id_u64)
        },
    )
}
