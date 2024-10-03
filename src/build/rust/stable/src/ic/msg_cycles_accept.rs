use rquickjs::{Ctx, Function};

pub fn get_function(context: Ctx) -> Function {
    Function::new(context, |max_amount_string: String| {
        let max_amount: u128 = max_amount_string.parse().unwrap();

        ic_cdk::api::call::msg_cycles_accept128(max_amount).to_string()
    })
    .unwrap()
}
