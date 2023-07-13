pub fn generate() -> proc_macro2::TokenStream {
    // TODO: This really should be in generic.rs and should be a generic result handler...
    quote::quote! {
        impl CdkActTryFromVmValue<Result<(), String>, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<Result<(), String>, CdkActTryFromVmValueError> {
                let js_object = self
                    .as_object()
                    .ok_or_else(|| "TypeError: Value is not of type 'GuardResult'")?;

                let has_ok_property = js_object
                    .has_own_property("Ok", context)
                    .map_err(|err| err.to_string())?;

                let has_err_property = js_object
                    .has_own_property("Err", context)
                    .map_err(|err| err.to_string())?;

                if has_ok_property && has_err_property {
                    return Err("TypeError: Value is not of type 'GuardResult'")?;
                }

                if has_ok_property {
                    let ok_value = js_object
                        .get("Ok", context)
                        .map_err(|err| err.to_string())?;

                    return if ok_value.is_null() {
                        Ok(Ok(()))
                    } else {
                        Err("TypeError: Value is not of type 'null'")?
                    };
                }

                if has_err_property {
                    return Ok(Err(js_object
                        .get("Err", context)
                        .map_err(|err| err.to_string())?
                        .try_from_vm_value(context)?));
                }

                Err("TypeError: Value is not of type 'GuardResult'")?
            }
        }
    }
}
