use rquickjs::{Ctx, Function};

pub fn get_function(context: Ctx) -> Function {
    Function::new(context, |counter_type: u32| {
        ic_cdk::api::performance_counter(counter_type)
    })
    .unwrap()
}
