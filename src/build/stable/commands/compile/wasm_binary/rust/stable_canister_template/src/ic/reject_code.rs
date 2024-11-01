use ic_cdk::api::call::{reject_code, RejectionCode};
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || {
        let reject_code = reject_code();

        match reject_code {
            RejectionCode::NoError => 0,
            RejectionCode::SysFatal => 1,
            RejectionCode::SysTransient => 2,
            RejectionCode::DestinationInvalid => 3,
            RejectionCode::CanisterReject => 4,
            RejectionCode::CanisterError => 5,
            RejectionCode::Unknown => 6,
        }
    })
}
