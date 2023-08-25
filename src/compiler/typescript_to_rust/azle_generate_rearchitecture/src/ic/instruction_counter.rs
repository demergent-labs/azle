use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn instruction_counter<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            _args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let instruction_counter_js_value: JSValue = candid::encode_one(ic_cdk::api::instruction_counter())?.into();
            to_qjs_value(&context, &instruction_counter_js_value)
        }
    }
}
