pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn instruction_counter(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            ic_cdk::api::instruction_counter()
                .try_into_vm_value(context)
                .map_err(|vmc_err| vmc_err.to_js_error(None))
        }
    }
}
