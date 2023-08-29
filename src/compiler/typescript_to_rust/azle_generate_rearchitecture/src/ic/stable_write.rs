use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn stable_write<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let params_bytes: Vec<u8> = args
                .get(0)
                .expect("stableWrite must have two arguments")
                .to_js_value()?
                .try_into()?;

            let (offset, buf): (u32, Vec<u8>) = candid::decode_args(&params_bytes)?;

            ic_cdk::api::stable::stable_write(offset, &buf);

            context.undefined_value()
        }
    }
}
