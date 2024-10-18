use rquickjs::{Ctx, Function};

pub fn get_function(context: Ctx) -> Function {
    Function::new(context, || {
        ic_cdk::api::call::msg_cycles_available128().to_string()
    })
    .unwrap()
}
