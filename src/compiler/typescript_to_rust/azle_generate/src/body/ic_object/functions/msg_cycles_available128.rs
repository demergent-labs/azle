pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
            fn msg_cycles_available128(
                _this: &boa_engine::JsValue,
                _aargs: &[boa_engine::JsValue],
                _context: &mut boa_engine::Context
            ) -> boa_engine::JsResult<boa_engine::JsValue> {
                // TODO: This extra conversion may not be necessary once
                // https://github.com/boa-dev/boa/issues/1970 is implemented.
                let return_value: boa_engine::bigint::JsBigInt = ic_cdk::api::call::msg_cycles_available().into();
                Ok(return_value.into())
        }
    }
}
