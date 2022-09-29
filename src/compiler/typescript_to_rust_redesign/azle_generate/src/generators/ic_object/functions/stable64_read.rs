pub fn generate_ic_object_function_stable64_read() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_stable64_read(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let offset: u64 = _aargs
                .get(0)
                .unwrap()
                .clone()
                .azle_try_from_js_value(_context)
                .unwrap();
            let length: u64 = _aargs
                .get(1)
                .unwrap()
                .clone()
                .azle_try_from_js_value(_context)
                .unwrap();

            let mut buf: Vec<u8> = vec![0; length as usize];
            ic_cdk::api::stable::stable64_read(offset, &mut buf);
            Ok(buf.to_vec().azle_into_js_value(_context))
        }
    }
}
