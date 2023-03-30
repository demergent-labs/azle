pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_stable64_write(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let offset: u64 = _aargs
                .get(0)
                .unwrap()
                .clone()
                .try_from_vm_value(&mut *_context)
                .unwrap();
            let buf_vector: Vec<u8> = _aargs
                .get(1)
                .unwrap()
                .clone()
                .try_from_vm_value(&mut *_context)
                .unwrap();
            let buf: &[u8] = &buf_vector[..];
            ic_cdk::api::stable::stable64_write(offset, buf);
            Ok(boa_engine::JsValue::Undefined)
        }
    }
}
