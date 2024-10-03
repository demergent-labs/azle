use rquickjs::{Ctx, Function};

pub fn get_function(context: Ctx) -> Function {
    Function::new(context, |counter_type_string: String| {
        ic_cdk::api::performance_counter(counter_type_string.parse().unwrap()).to_string()
    })
    .unwrap()
}
