pub fn generate_ic_object_function_method_name() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_method_name(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            Ok(ic_cdk::api::call::method_name().into())
        }
    }
}
