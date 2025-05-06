use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move || -> () { drain_microtasks(&ctx) })
}

/// Executes all pending JavaScript jobs in the QuickJS job queue.
///
/// ### Remarks
///
/// These jobs are essentially JavaScript microtasks such as
/// Promise then/catch/finally callbacks and the continuation of async functions after await points.
/// In Azle on ICP, JavaScript macrotasks are essentially JavaScript executions
/// that take place after the following:
/// - the first JavaScript module execution in init/post_upgrade
/// - JavaScript function execution from query/update/pre_upgrade/inspect_message/heartbeat/on_low_wasm_memory calls (execute_method_js)
/// - JavaScript function execution from timer callbacks (set_timer/set_timer_interval),
/// - JavaScript function execution in an inter-canister call's reply/reject callback
pub fn drain_microtasks(ctx: &Ctx) {
    while ctx.execute_pending_job() {}
}
