use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn stable64_read<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let params_bytes: Vec<u8> = args
                .get(0)
                .expect("stable64Read must have two arguments")
                .to_js_value()?
                .try_into()?;

            let (offset, length): (u64, u64) = candid::decode_args(&params_bytes)?;

            let mut buf: Vec<u8> = vec![0; length as usize];
            ic_cdk::api::stable::stable64_read(offset, &mut buf);
            to_qjs_value(&context, &buf.into())
        }
    }
}
