use std::error::Error;
use std::future::Future;

use rquickjs::{Ctx, async_with};

use crate::CONTEXT_REF_CELL;

pub fn quickjs_with_ctx<F, R>(callback: F) -> impl Future<Output = Result<R, Box<dyn Error>>>
where
    F: FnOnce(Ctx) -> Result<R, Box<dyn Error>> + Send + 'static,
    R: Send + 'static,
{
    // Create an async block that will be returned as the future
    async move {
        // Access the thread-local context
        let context = CONTEXT_REF_CELL.with(|context_ref_cell| {
            let context_ref = context_ref_cell.borrow();
            context_ref
                .as_ref()
                .ok_or_else(|| "QuickJS context not initialized")
                .map(|c| c.clone())
        })?;

        // Use async_with! to execute the callback asynchronously
        let result = async_with!(context => |ctx| {
            // Execute the synchronous callback
            let result = callback(ctx.clone());
            // Process any pending QuickJS jobs (e.g., promises triggered by the callback)
            // while ctx.execute_pending_job() {}
            // Return the callback's result
            result
        })
        .await;

        context.runtime().idle().await;

        result
    }
}
