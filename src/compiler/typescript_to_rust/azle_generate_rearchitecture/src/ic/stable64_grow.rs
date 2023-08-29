use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn stable64_grow<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let new_pages_bytes: Vec<u8> = args
                .get(0)
                .expect("stable64Grow must have one argument")
                .to_js_value()?
                .try_into()?;

            let new_pages: u64 = candid::decode_one(&new_pages_bytes)?;

            let return_js_value: JSValue =
                candid::encode_one(ic_cdk::api::stable::stable64_grow(new_pages)?)?.into();
            to_qjs_value(&context, &return_js_value)
        }
    }
}
