use rquickjs::Ctx;

// TODO rename to drain_micro_tasks??
// TODO I feel like we should move this to its own file and rename it to rquickjs_run_event_loop
// TODO improve this comment
// Drain all micro tasks currently queued
// Essentially this will drive all queue
// Promise.then, Promise.catch, and async/await after await-points to completion
pub fn run_event_loop(ctx: &Ctx) {
    while ctx.execute_pending_job() {}
}
