pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn reject(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let message: String = aargs.get(0).unwrap().clone().try_from_vm_value(&mut *context).unwrap();

            Ok(
                ic_cdk::api::call::reject(&message)
                    .try_into_vm_value(&mut *context).unwrap()
            )
        }
    }
}
