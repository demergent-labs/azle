use rquickjs::Ctx;

// Executes all pending jobs in the QuickJS job queue
// These jobs are essentially JavaScript microtasks such as
// Promise then/catch/finally callbacks and the continuation of async functions after await points
// In Azle on ICP, macrotasks are essentially the following: the first JavaScript module execution in init/postUpgrade
// JavaScript function executions from update and query calls, JavaScript function executions from timer callbacks,
// JavaScript function executions from heartbeats,
// and JavaScript function executions from resolving or rejecting the Promise after an inter-canister call
// TODO on low wasm memory, pre upgrade...basically the canister methods, rewrite the documentation
pub fn drain_microtasks(ctx: &Ctx) {
    while ctx.execute_pending_job() {}
}
