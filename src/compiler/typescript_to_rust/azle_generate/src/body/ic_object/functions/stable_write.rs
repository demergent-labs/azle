pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn stable_write(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let offset: u32 = aargs
                .get(0)
                .unwrap()
                .clone()
                .try_from_vm_value(&mut *context)
                .unwrap();
            let buf_vector: Vec<u8> = aargs
                .get(1)
                .unwrap()
                .clone()
                .try_from_vm_value(&mut *context)
                .unwrap();
            let buf: &[u8] = &buf_vector[..];
            ic_cdk::api::stable::stable_write(offset, buf);
            Ok(boa_engine::JsValue::Undefined)
        }
    }
}
