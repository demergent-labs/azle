pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_trap(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let message: String = _aargs.get(0).unwrap().clone().try_from_vm_value(_context).unwrap();
            ic_cdk::api::trap(&message);
        }
    }
}
