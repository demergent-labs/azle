use rquickjs::Ctx;

// Executes all pending jobs in the QuickJS job queue
// These jobs are essentially JavaScript microtasks such as
// Promise then/catch/finally callbacks and the continuation of async functions after await points
pub fn drain_microtasks(ctx: &Ctx) {
    while ctx.execute_pending_job() {}
}
