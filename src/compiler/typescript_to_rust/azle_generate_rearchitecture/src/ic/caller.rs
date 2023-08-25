use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn caller<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            _args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let caller_js_value = ic_cdk::api::caller().as_slice().into();
            to_qjs_value(&context, &caller_js_value)
        }
    }
}
