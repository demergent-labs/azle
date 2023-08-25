use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn method_name<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            _args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let method_name_js_value: JSValue = ic_cdk::api::call::method_name().into();
            to_qjs_value(&context, &method_name_js_value)
        }
    }
}
