use ic_cdk::api::canister_cycle_balance;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || -> String { canister_cycle_balance().to_string() })
}
