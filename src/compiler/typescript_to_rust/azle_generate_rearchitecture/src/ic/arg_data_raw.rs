use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn arg_data_raw<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            _args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let arg_data_raw_js_value: JSValue = ic_cdk::api::call::arg_data_raw().into();
            to_qjs_value(&context, &arg_data_raw_js_value)
        }
    }
}
