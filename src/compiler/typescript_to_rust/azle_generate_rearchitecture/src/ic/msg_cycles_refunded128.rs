use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn msg_cycles_refunded128<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            _args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let return_js_value: JSValue =
                candid::encode_one(ic_cdk::api::call::msg_cycles_refunded128())?.into();
            to_qjs_value(&context, &return_js_value)
        }
    }
}
