use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn reject_code<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            _args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let reject_code = ic_cdk::api::call::reject_code();

            let reject_code_as_u8 = match reject_code {
                ic_cdk::api::call::RejectionCode::NoError => 0,
                ic_cdk::api::call::RejectionCode::SysFatal => 1,
                ic_cdk::api::call::RejectionCode::SysTransient => 2,
                ic_cdk::api::call::RejectionCode::DestinationInvalid => 3,
                ic_cdk::api::call::RejectionCode::CanisterReject => 4,
                ic_cdk::api::call::RejectionCode::CanisterError => 5,
                ic_cdk::api::call::RejectionCode::Unknown => 6,
            };

            let reject_code_as_js_value: JSValue = reject_code_as_u8.into();

            to_qjs_value(&context, &reject_code_as_js_value)
        }
    }
}
