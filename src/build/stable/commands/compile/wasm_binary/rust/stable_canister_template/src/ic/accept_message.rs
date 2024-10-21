use rquickjs::{Ctx, Function};

pub fn get_function(context: Ctx) -> Result<Function, rquickjs::Error> {
    Function::new(context, || {
        ic_cdk::api::call::accept_message();
    })
}
