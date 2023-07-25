use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn reply_raw(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let buf_vec: Vec<u8> = aargs
                .get(0)
                .ok_or_else(|| "An argument for 'buf' was not provided".to_js_error(None))?
                .clone()
                .try_from_vm_value(&mut *context)?;

            ic_cdk::api::call::reply_raw(&buf_vec)
                .try_into_vm_value(context)
                .map_err(|vmc_err| vmc_err.to_js_error(None))
        }
    }
}
