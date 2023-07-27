pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn stable_read(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let offset: u32 = aargs
                .get(0)
                .ok_or_else(|| "An argument for 'offset' was not provided".to_js_error(None))?
                .clone()
                .try_from_vm_value(&mut *context)?;

            let length: u32 = aargs
                .get(1)
                .ok_or_else(|| "An argument for 'length' was not provided".to_js_error(None))?
                .clone()
                .try_from_vm_value(&mut *context)?;

            let mut buf: Vec<u8> = vec![0; length as usize];
            ic_cdk::api::stable::stable_read(offset, &mut buf);

            buf.to_vec()
                .try_into_vm_value(context)
                .map_err(|vmc_err| vmc_err.to_js_error(None))
        }
    }
}
