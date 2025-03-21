use std::error::Error;

use rquickjs::Ctx;

use crate::CONTEXT_REF_CELL;

pub fn with_ctx<F, R>(callback: F) -> Result<R, Box<dyn Error>>
where
    F: FnOnce(Ctx<'static>) -> Result<R, Box<dyn Error>>,
{
    CONTEXT_REF_CELL.with(|context_ref_cell| {
        let context_ref = context_ref_cell.borrow();
        let context = context_ref
            .as_ref()
            .ok_or("QuickJS context not initialized")?;

        context.with(|ctx| {
            let ctx = unsafe { std::mem::transmute::<Ctx<'_>, Ctx<'static>>(ctx) };

            let result = callback(ctx.clone())
                .map_err(|e| format!("QuickJS callback execution failed: {e}"))?;

            Ok(result)
        })
    })
}
