use rquickjs::{Context, Ctx, Function};

pub fn get_function(context: Ctx) -> Function {
    Function::new(context.clone(), |timer_id_string: String| {
        let timer_id_u64: u64 = timer_id_string.parse().unwrap();
        let timer_id = ic_cdk_timers::TimerId::from(slotmap::KeyData::from_ffi(timer_id_u64));

        ic_cdk_timers::clear_timer(timer_id);
    })
    .unwrap()
}
