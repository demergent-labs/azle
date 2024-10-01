use rquickjs::{Context, Ctx, Function, Value};

pub fn get_function(context: Ctx) -> rquickjs::Function {
    Function::new(context.clone(), |message: String| {
        ic_cdk::print(message);
    })
    .unwrap()
}
