pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_performance_counter(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let counter_type: u32 = _aargs[0].clone().try_from_vm_value(_context).unwrap();
            let return_value: boa_engine::bigint::JsBigInt = ic_cdk::api::call::performance_counter(counter_type).into();
            Ok(return_value.into())
        }
    }
}
