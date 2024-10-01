use rquickjs::{Context, Ctx, Function};

pub fn get_function(context: Ctx) -> Function {
    Function::new(context.clone(), || {
        ic_cdk::api::instruction_counter().to_string()
    })
    .unwrap()
}
