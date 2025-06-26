use core::time::Duration;
use std::{cell::RefCell, rc::Rc};

use ic_cdk::trap;
use ic_cdk_timers::{TimerId, set_timer};
use rquickjs::{BigInt, Ctx, Function, Object, Result};
use slotmap::Key;

use crate::{
    ic::{drain_inter_canister_call_futures, drain_microtasks},
    rquickjs_utils::{call_with_error_handling, with_ctx},
    state::dispatch_action,
};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move |delay: u64| -> Result<BigInt> {
        let delay_duration = Duration::new(delay, 0);

        let timer_id_u64_rc: Rc<RefCell<Option<u64>>> = Rc::new(RefCell::new(None));
        let timer_id_u64_rc_cloned_for_cleanup_closure = timer_id_u64_rc.clone();
        let timer_id_u64_rc_cloned_for_timer_closure = timer_id_u64_rc.clone();

        // We use a scopeguard to ensure that the global JavaScript timer callback is cleaned up when the closure is dropped.
        // This is necessary to prevent memory leaks by ensuring that the global JavaScript timer callback is properly removed
        // from the global state when it is no longer needed, either because the closure has been executed successfully
        // or because it has trapped.
        let cleanup_scopeguard = scopeguard::guard((), move |_| {
            let result = with_ctx(|ctx| {
                let timer_id = timer_id_u64_rc_cloned_for_cleanup_closure
                    .borrow()
                    .ok_or("TimerId not found in reference-counting pointer")?;

                dispatch_action(
                    ctx.clone(),
                    "DELETE_AZLE_TIMER_CALLBACK",
                    ctx.eval::<BigInt, &str>(&format!("{timer_id}n"))?.into(),
                    "azle/src/stable/build/commands/build/wasm_binary/rust/stable_canister_template/src/ic/set_timer.rs",
                    "scopeguard::guard",
                )?;

                Ok(())
            });

            if let Err(e) = result {
                trap(&format!("Azle TimerCleanupError: {e}"));
            }
        });

        let closure = move || {
            let _cleanup_scopeguard = cleanup_scopeguard;

            let result = with_ctx(|ctx| {
                let timer_id = timer_id_u64_rc_cloned_for_timer_closure
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
