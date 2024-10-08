use crate::CONTEXT_REF_CELL;
use rquickjs::Ctx;

pub fn quickjs_with_ctx<F, R>(f: F) -> R
where
    F: FnOnce(Ctx) -> R,
{
    CONTEXT_REF_CELL.with(|context_ref_cell| {
        let context_ref = context_ref_cell.borrow();
        let context = context_ref.as_ref().unwrap();

        context.with(f)
    })
}
