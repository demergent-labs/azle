pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn msg_cycles_refunded128(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let return_value = boa_engine::bigint::JsBigInt::new(boa_engine::bigint::RawBigInt::from(ic_cdk::api::call::msg_cycles_refunded128()));
            Ok(return_value.into())
        }
    }
}
