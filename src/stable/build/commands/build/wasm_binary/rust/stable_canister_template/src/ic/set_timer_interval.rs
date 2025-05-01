use core::time::Duration;
use std::{cell::RefCell, rc::Rc};

use ic_cdk::{spawn, trap};
use ic_cdk_timers::{TimerId, set_timer_interval};
use rquickjs::{BigInt, Ctx, Function, Object, Result};
use slotmap::Key;

use crate::{
    INTER_CANISTER_CALL_QUEUE,
    rquickjs_utils::{call_with_error_handling, drain_microtasks, with_ctx},
};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move |interval: u64| -> Result<BigInt> {
        let interval_duration = Duration::new(interval, 0);

        let timer_id_u64_rc: Rc<RefCell<Option<u64>>> = Rc::new(RefCell::new(None));
        let timer_id_u64_rc_cloned = timer_id_u64_rc.clone();

        let closure = move || {
            let result = with_ctx(|ctx| {
                let timer_id = timer_id_u64_rc_cloned
                    .borrow()
                    .ok_or("TimerId not found in reference-counting pointer")?;

                let globals = ctx.globals();

                let timer_callbacks: Object = globals
                    .get("_azleTimerCallbacks")
                    .map_err(|e| format!("Failed to get globalThis._azleTimerCallbacks: {e}"))?;
                let timer_callback: Function =
                    timer_callbacks.get(timer_id.to_string()).map_err(|e| {
                        format!("Failed to get globalThis._azleTimerCallbacks['{timer_id}']: {e}")
                    })?;

                // JavaScript code execution: macrotask
                call_with_error_handling(&ctx, &timer_callback, ())?;

                // We must drain all microtasks that could have been queued during the JavaScript code execution above
                drain_microtasks(&ctx);

                Ok(())
            });

            if let Err(e) = result {
                trap(&format!("Azle TimerError: {e}"));
            }

            loop {
                let batch: Vec<_> =
                    INTER_CANISTER_CALL_QUEUE.with(|q| q.borrow_mut().drain(..).collect());

                if batch.is_empty() {
                    break;
                }

                for fut in batch {
                    spawn(fut);
                }
            }
        };

        let timer_id: TimerId = set_timer_interval(interval_duration, closure);
        let timer_id_u64: u64 = timer_id.data().as_ffi();

        *timer_id_u64_rc.borrow_mut() = Some(timer_id_u64);

        Ok(BigInt::from_u64(ctx.clone(), timer_id_u64)?)
    })
}
