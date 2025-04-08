use ic_cdk::api::canister_balance128;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> String { canister_balance128().to_string() })
}
