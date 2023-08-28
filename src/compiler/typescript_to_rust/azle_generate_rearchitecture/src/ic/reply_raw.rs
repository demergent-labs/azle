use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn reply_raw<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let buf: Vec<u8> = args
                .get(0)
                .expect("replyRaw must have one argument")
                .to_js_value()?
                .try_into()?;

            ic_cdk::api::call::reply_raw(&buf);
            context.undefined_value()
        }
    }
}
