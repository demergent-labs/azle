use ic_cdk::api::call::reject_code;
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, || {
        let reject_code = reject_code();

        match reject_code {
            ic_cdk::api::call::RejectionCode::NoError => 0,
            ic_cdk::api::call::RejectionCode::SysFatal => 1,
            ic_cdk::api::call::RejectionCode::SysTransient => 2,
            ic_cdk::api::call::RejectionCode::DestinationInvalid => 3,
            ic_cdk::api::call::RejectionCode::CanisterReject => 4,
            ic_cdk::api::call::RejectionCode::CanisterError => 5,
            ic_cdk::api::call::RejectionCode::Unknown => 6,
        }
    })
}
