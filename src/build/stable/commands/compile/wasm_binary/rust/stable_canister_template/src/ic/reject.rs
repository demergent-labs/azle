use rquickjs::{Ctx, Function};

pub fn get_function(context: Ctx) -> Function {
    Function::new(context, |message: String| {
        ic_cdk::api::call::reject(&message);
    })
    .unwrap()
}
