use rquickjs::{Ctx, Function};

pub fn get_function(ctx: Ctx) -> Function {
    Function::new(ctx, |timer_id: String| {
        ic_cdk_timers::clear_timer(ic_cdk_timers::TimerId::from(slotmap::KeyData::from_ffi(
            timer_id.parse().unwrap(),
        )));
    })
    .unwrap()
}
