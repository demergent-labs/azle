use std::error::Error;

use rquickjs::{Ctx, async_with};

use crate::{CONTEXT_REF_CELL, CONTEXT_REF_CELL_SYNC};

use super::drain_microtasks;

pub async fn with_ctx<F, R>(callback: F) -> Result<R, Box<dyn Error>>
where
    F: FnOnce(Ctx) -> Result<R, Box<dyn Error>>,
    R: 'static,
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
            // drain_microtasks(&ctx);

            result
        })
        .await;

        // TODO something seems wrong, as if the canister is awaiting when it shouldn't
        // context.runtime().idle().await;

        context.runtime().drive().await;

        result
    }
    .await
}

pub fn with_ctx_sync<F, R>(callback: F) -> Result<R, Box<dyn Error>>
where
    F: FnOnce(Ctx) -> Result<R, Box<dyn Error>>,
{
    CONTEXT_REF_CELL_SYNC.with(|context_ref_cell| {
        let context_ref = context_ref_cell.borrow();
        let context = context_ref
            .as_ref()
            .ok_or("QuickJS context not initialized")?;

        context.with(|ctx| {
            let result = callback(ctx.clone())
                .map_err(|e| format!("QuickJS callback execution failed: {e}"))?;

            Ok(result)
        })
    })
}
