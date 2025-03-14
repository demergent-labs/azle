use ic0::cycles_burn128;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |amount_high: i64, amount_low: i64, dst: i32| -> () {
        ic_cdk::println!("amount_high: {}", amount_high);
        ic_cdk::println!("amount_low: {}", amount_low);
        ic_cdk::println!("dst: {}", dst);

        unsafe { cycles_burn128(amount_high, amount_low, dst) }
    })
}
