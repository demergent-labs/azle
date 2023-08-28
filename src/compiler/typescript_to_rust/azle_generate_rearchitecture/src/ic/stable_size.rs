use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn stable_size<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            _args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let return_js_value: JSValue =
                candid::encode_one(ic_cdk::api::stable::stable_size())?.into();
            to_qjs_value(&context, &return_js_value)
        }
    }
}
