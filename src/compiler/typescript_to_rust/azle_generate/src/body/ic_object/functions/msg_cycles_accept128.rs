pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_msg_cycles_accept128(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let max_amount: u128 = _aargs[0].clone().try_from_vm_value(_context).unwrap();
            // TODO: This extra conversion may not be necessary once
            // https://github.com/boa-dev/boa/issues/1970 is implemented.
            let return_value: boa_engine::bigint::JsBigInt = ic_cdk::api::call::msg_cycles_accept128(max_amount).into();
            Ok(return_value.into())
        }
    }
}
