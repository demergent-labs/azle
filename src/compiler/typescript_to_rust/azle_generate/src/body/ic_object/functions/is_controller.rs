pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn is_controller(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let principal: candid::Principal = aargs
                .get(0)
                .ok_or_else(|| "An argument for 'principal' was not provided".to_js_error(None))?
                .clone()
                .try_from_vm_value(&mut *context)?;

            ic_cdk::api::is_controller(&principal)
                .try_into_vm_value(context)
                .map_err(|vmc_err| vmc_err.to_js_error(None))
        }
    }
}
