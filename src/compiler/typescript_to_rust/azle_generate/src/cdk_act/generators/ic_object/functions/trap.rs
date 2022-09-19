pub fn generate_ic_object_function_trap() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_trap(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            ic_cdk::api::trap(_aargs.get(0).unwrap().as_string().unwrap());
        }
    }
}
