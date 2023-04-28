pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn reject_code(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            Ok(ic_cdk::api::call::reject_code().try_into_vm_value(context).unwrap())
        }
    }
}
