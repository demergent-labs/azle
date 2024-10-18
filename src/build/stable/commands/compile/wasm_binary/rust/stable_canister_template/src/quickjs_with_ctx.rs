use crate::CONTEXT_REF_CELL;
use rquickjs::Ctx;

pub fn quickjs_with_ctx<F, R>(callback: F) -> R
where
    F: FnOnce(Ctx) -> R,
{
    CONTEXT_REF_CELL.with(|context_ref_cell| {
        let context_ref = context_ref_cell.borrow();
        let context = context_ref.as_ref().unwrap();

        context.with(|ctx| {
            let result = callback(ctx.clone());

            run_event_loop(ctx);

            result
        })
    })
}

fn run_event_loop(ctx: rquickjs::Ctx) {
    loop {
        let result = ctx.execute_pending_job();

        if result == false {
            break;
        }
    }
}
