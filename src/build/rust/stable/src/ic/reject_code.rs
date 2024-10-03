use rquickjs::{Ctx, Function};

pub fn get_function(context: Ctx) -> Function {
    Function::new(context, || {
        let reject_code = ic_cdk::api::call::reject_code();

        let reject_code_number = match reject_code {
            ic_cdk::api::call::RejectionCode::NoError => 0,
            ic_cdk::api::call::RejectionCode::SysFatal => 1,
            ic_cdk::api::call::RejectionCode::SysTransient => 2,
            ic_cdk::api::call::RejectionCode::DestinationInvalid => 3,
            ic_cdk::api::call::RejectionCode::CanisterReject => 4,
            ic_cdk::api::call::RejectionCode::CanisterError => 5,
            ic_cdk::api::call::RejectionCode::Unknown => 6,
        };

        reject_code_number.to_string()
    })
    .unwrap()
}
