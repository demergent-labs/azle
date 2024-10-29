use ic_cdk::api::call::msg_cycles_accept128;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |max_amount_string: String| {
        let max_amount: u128 = max_amount_string.parse().unwrap();

        msg_cycles_accept128(max_amount).to_string()
    })
}
