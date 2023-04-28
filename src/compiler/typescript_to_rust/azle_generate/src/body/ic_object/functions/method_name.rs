pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn method_name(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            Ok(ic_cdk::api::call::method_name().into())
        }
    }
}
