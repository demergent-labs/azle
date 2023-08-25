use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn canister_balance<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            _args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let canister_balance_js_value: JSValue = candid::encode_one(ic_cdk::api::canister_balance())?.into();
            to_qjs_value(&context, &canister_balance_js_value)
        }
    }
}
