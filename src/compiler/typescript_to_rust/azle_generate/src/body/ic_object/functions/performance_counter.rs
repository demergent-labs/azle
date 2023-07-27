pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn performance_counter(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let counter_type: u32 = aargs
                .get(0)
                .ok_or_else(|| "An argument for 'counterType' was not provided".to_js_error(None))?
                .clone()
                .try_from_vm_value(context)?;

            let return_value: boa_engine::bigint::JsBigInt =
                ic_cdk::api::call::performance_counter(counter_type).into();

            Ok(return_value.into())
        }
    }
}
