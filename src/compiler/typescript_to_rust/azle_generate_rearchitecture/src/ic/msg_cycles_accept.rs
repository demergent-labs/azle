use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn msg_cycles_accept<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let max_amount_vec_u8: Vec<u8> = args
                .get(0)
                .expect("msgCyclesAccept must have one argument")
                .to_js_value()?
                .try_into()?;

            let max_amount: u64 = candid::decode_one(&max_amount_vec_u8)?;

            let return_js_value: JSValue =
                candid::encode_one(ic_cdk::api::call::msg_cycles_accept(max_amount))?.into();
            to_qjs_value(&context, &return_js_value)
        }
    }
}
