pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn candid_encode(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let candid_string: String = aargs
                .get(0)
                .ok_or_else(|| "An argument for 'candidString' was not provided".to_js_error(None))?
                .clone()
                .try_from_vm_value(&mut *context)?;

            let candid_args: candid::IDLArgs =
                candid_string.parse().map_err(|err: candid::error::Error| {
                    boa_engine::error::JsNativeError::error().with_message(err.to_string().as_str())
                })?;
            let candid_encoded: Vec<u8> =
                candid_args
                    .to_bytes()
                    .map_err(|err: candid::error::Error| {
                        boa_engine::error::JsNativeError::error()
                            .with_message(err.to_string().as_str())
                    })?;

            candid_encoded
                .try_into_vm_value(&mut *context)
                .map_err(|vmc_err| vmc_err.to_js_error(None))
        }
    }
}
