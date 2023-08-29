use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn time<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            _args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let time_js_value: JSValue = candid::encode_one(ic_cdk::api::time())?.into();
            to_qjs_value(&context, &time_js_value)
        }
    }
}
