use core::time::Duration;
use std::{cell::RefCell, rc::Rc};

use ic_cdk::trap;
use ic_cdk_timers::{TimerId, set_timer};
use rquickjs::{BigInt, Ctx, Function, Object, Result};
use slotmap::Key;

use crate::{
    ic::{drain_inter_canister_call_futures, drain_microtasks},
    rquickjs_utils::{call_with_error_handling, with_ctx},
};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move |delay: u64| -> Result<BigInt> {
        let delay_duration = Duration::new(delay, 0);

        let timer_id_u64_rc: Rc<RefCell<Option<u64>>> = Rc::new(RefCell::new(None));
        let timer_id_u64_rc_cloned = timer_id_u64_rc.clone();

        let closure = move || {
            let result = with_ctx(|ctx| {
                let timer_id = timer_id_u64_rc_cloned
                    .borrow()
                    .ok_or("TimerId not found in reference-counting pointer")?;

                let globals = ctx.globals();

                // Check if _azleTimerCallbacks is defined
                if let Ok(timer_callbacks) = globals.get::<_, Object>("_azleTimerCallbacks") {
                    if let Ok(timer_callback) = timer_callbacks.get::<_, Function>(timer_id.to_string()) {
                        // JavaScript code execution: macrotask
                        call_with_error_handling(&ctx, &timer_callback, ())?;
                    } else {
                        return Err(format!("Timer callback for ID '{timer_id}' not found").into());
                    }
                } else {
                    return Err("globalThis._azleTimerCallbacks is not defined".into());
                }

                // We must drain all microtasks that could have been queued during the JavaScript macrotask code execution above
                drain_microtasks(&ctx);

                Ok(())
            });

            if let Err(e) = result {
                trap(&format!("Azle TimerError: {e}"));
            }

            // We must drain all inter-canister call futures that could have been queued during the JavaScript code execution above
            // This MUST be called outside of the with_ctx closure or it will trap
            drain_inter_canister_call_futures();
        };

        let timer_id: TimerId = set_timer(delay_duration, closure);
        let timer_id_u64: u64 = timer_id.data().as_ffi();

        *timer_id_u64_rc.borrow_mut() = Some(timer_id_u64);

        Ok(BigInt::from_u64(ctx.clone(), timer_id_u64)?)
    })
}
