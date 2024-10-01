use rquickjs::{Context, Ctx, Function};

pub fn get_function(context: Ctx) -> Function {
    Function::new(context.clone(), || ic_cdk::api::call::method_name()).unwrap()
}
