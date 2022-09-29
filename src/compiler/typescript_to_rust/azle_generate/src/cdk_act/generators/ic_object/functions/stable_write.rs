pub fn generate_ic_object_function_stable_write() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_stable_write(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let offset: u32 = _aargs
                .get(0)
                .unwrap()
                .clone()
                .azle_try_from_js_value(_context)
                .unwrap();
            let buf_vector: Vec<u8> = _aargs
                .get(1)
                .unwrap()
                .clone()
                .azle_try_from_js_value(_context)
                .unwrap();
            let buf: &[u8] = &buf_vector[..];
            ic_cdk::api::stable::stable_write(offset, buf);
            Ok(boa_engine::JsValue::Undefined)
        }
    }
}
