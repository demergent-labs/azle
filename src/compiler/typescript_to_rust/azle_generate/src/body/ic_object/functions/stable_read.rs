pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn stable_read(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let offset: u32 = _aargs
                .get(0)
                .unwrap()
                .clone()
                .try_from_vm_value(&mut *_context)
                .unwrap();
            let length: u32 = _aargs
                .get(1)
                .unwrap()
                .clone()
                .try_from_vm_value(&mut *_context)
                .unwrap();

            let mut buf: Vec<u8> = vec![0; length as usize];
            ic_cdk::api::stable::stable_read(offset, &mut buf);
            Ok(buf.try_into_vm_value(_context).unwrap())
        }
    }
}
