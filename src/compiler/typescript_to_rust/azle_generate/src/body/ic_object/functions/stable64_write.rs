pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn stable64_write(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let offset: u64 = aargs
                .get(0)
                .ok_or_else(|| "An argument for 'offset' was not provided".to_js_error(None))?
                .clone()
                .try_from_vm_value(&mut *context)?;

            let buf_vector: Vec<u8> = aargs
                .get(1)
                .ok_or_else(|| "An argument for 'buffer' was not provided".to_js_error(None))?
                .clone()
                .try_from_vm_value(&mut *context)?;

            let buf: &[u8] = &buf_vector[..];
            ic_cdk::api::stable::stable64_write(offset, buf);

            Ok(boa_engine::JsValue::Undefined)
        }
    }
}
