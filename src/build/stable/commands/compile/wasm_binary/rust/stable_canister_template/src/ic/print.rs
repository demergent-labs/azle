use rquickjs::{Ctx, Function};

pub fn get_function(context: Ctx) -> rquickjs::Function {
    Function::new(context, |message: String| {
        ic_cdk::print(message);
    })
    .unwrap()
}
