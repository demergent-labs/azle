use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
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

        context.new_string(&reject_code_number.to_string()).into()
    }
}
