use std::error::Error;

use rquickjs::Ctx;

use crate::{AzleError, CONTEXT_REF_CELL};

pub fn quickjs_with_ctx<F, R>(callback: F) -> Result<R, Box<dyn Error>>
where
    F: FnOnce(Ctx) -> Result<R, Box<dyn Error>>,
{
    CONTEXT_REF_CELL.with(|context_ref_cell| {
        let context_ref = context_ref_cell.borrow();
        let context = context_ref
            .as_ref()
            .ok_or(AzleError::QuickJSContextNotInitialized)?;

        context.with(|ctx| {
            let result =
                callback(ctx.clone()).map_err(|e| AzleError::QuickJSCallbackExecutionFailed(e))?;

            run_event_loop(ctx);

            Ok(result)
        })
    })
}

fn run_event_loop(ctx: Ctx) {
    while ctx.execute_pending_job() {}
}
