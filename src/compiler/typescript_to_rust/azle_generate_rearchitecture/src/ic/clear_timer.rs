use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn clear_timer<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let timer_id_vec_u8: Vec<u8> = args
                .get(0)
                .expect("clearTimer must have one argument")
                .to_js_value()?
                .try_into()?;

            let timer_id_u64: u64 = candid::decode_one(&timer_id_vec_u8)?;
            let timer_id = ic_cdk_timers::TimerId::from(slotmap::KeyData::from_ffi(timer_id_u64));

            ic_cdk_timers::clear_timer(timer_id);
            context.undefined_value()
        }
    }
}
