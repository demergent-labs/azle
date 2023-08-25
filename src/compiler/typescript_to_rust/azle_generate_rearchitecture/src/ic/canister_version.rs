use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn canister_version<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            _args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let canister_version_js_value: JSValue = candid::encode_one(ic_cdk::api::canister_version())?.into();
            to_qjs_value(&context, &canister_version_js_value)
        }
    }
}
