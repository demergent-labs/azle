use rquickjs::{Ctx, Function};

pub fn get_function(context: Ctx) -> Function {
    Function::new(context.clone(), |timer_id: u64| {
        ic_cdk_timers::clear_timer(ic_cdk_timers::TimerId::from(slotmap::KeyData::from_ffi(
            timer_id,
        )));
    })
    .unwrap()
}
