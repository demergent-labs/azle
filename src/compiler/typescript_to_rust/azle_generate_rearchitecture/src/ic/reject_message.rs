use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn reject_message<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            _args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let return_js_value: JSValue = ic_cdk::api::call::reject_message().into();
            to_qjs_value(&context, &return_js_value)
        }
    }
}
