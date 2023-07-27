pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn candid_decode(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let candid_encoded: Vec<u8> = aargs
                .get(0)
                .ok_or_else(|| "An argument for 'candidEncoded' was not provided".to_js_error(None))?
                .clone()
                .try_from_vm_value(&mut *context)?;

            let candid_args: candid::IDLArgs = candid::IDLArgs::from_bytes(&candid_encoded)
                .map_err(|err| {
                    boa_engine::error::JsNativeError::error().with_message(err.to_string().as_str())
                })?;

            let candid_string = candid_args.to_string();

            candid_string
                .try_into_vm_value(context)
                .map_err(|vmc_err| vmc_err.to_js_error(None))
        }
    }
}
