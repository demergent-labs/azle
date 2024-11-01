use ic_cdk_timers::{clear_timer, TimerId};
use rquickjs::{Ctx, Function, Result};
use slotmap::KeyData;

use crate::ic::throw_error;

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move |timer_id: String| -> Result<()> {
        clear_timer(TimerId::from(KeyData::from_ffi(
            timer_id.parse().map_err(|e| throw_error(ctx.clone(), e))?,
        )));

        Ok(())
    })
}
