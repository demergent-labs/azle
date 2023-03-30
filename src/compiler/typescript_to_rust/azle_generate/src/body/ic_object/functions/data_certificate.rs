pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_data_certificate(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            Ok(ic_cdk::api::data_certificate().try_into_vm_value(_context).unwrap())
        }
    }
}
