pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn msg_cycles_available(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let return_value: boa_engine::bigint::JsBigInt = ic_cdk::api::call::msg_cycles_available().into();
            Ok(return_value.into())
        }
    }
}
