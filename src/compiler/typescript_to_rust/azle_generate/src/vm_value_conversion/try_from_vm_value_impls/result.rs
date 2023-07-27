pub fn generate() -> proc_macro2::TokenStream {
    // TODO: This really should be in generic.rs and should be a generic result handler...
    quote::quote! {
        impl
            CdkActTryFromVmValue<
                Result<(), String>,
                boa_engine::JsError,
                &mut boa_engine::Context<'_>,
            > for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<Result<(), String>, boa_engine::JsError> {
                let error_message = "TypeError: Value is not of type 'GuardResult'";

                let js_object = self
                    .as_object()
                    .ok_or_else(|| error_message.to_js_error(None))?;

                let has_ok_property = js_object.has_own_property("Ok", context).map_err(|err| {
                    let cause = err.to_string().to_js_error(None);

                    error_message.to_js_error(Some(cause))
                })?;

                let has_err_property =
                    js_object.has_own_property("Err", context).map_err(|err| {
                        let cause = err.to_string().to_js_error(None);

                        error_message.to_js_error(Some(cause))
                    })?;

                if has_ok_property && has_err_property {
                    let cause = "TypeError: TypeError: Value must contain exactly one of the \
                        following properties: ['Ok', 'Err']"
                        .to_js_error(None);

                    return Err(error_message.to_js_error(Some(cause)));
                }

                if has_ok_property {
                    let ok_value = js_object.get("Ok", context).map_err(|err| {
                        let cause = err.to_string().to_js_error(None);

                        error_message.to_js_error(Some(cause))
                    })?;

                    return if ok_value.is_null() {
                        Ok(Ok(()))
                    } else {
                        let cause = "TypeError: Value is not of type 'null'".to_js_error(None);
                        Err(error_message.to_js_error(Some(cause)))
                    };
                }

                if has_err_property {
                    return Ok(Err(js_object
                        .get("Err", context)
                        .map_err(|err| {
                            let cause = err.to_string().to_js_error(None);

                            error_message.to_js_error(Some(cause))
                        })?
                        .try_from_vm_value(context)?));
                }

                let cause = "TypeError: Value must contain exactly one of the \
                    following properties: ['Ok', 'Err']"
                    .to_js_error(None);

                Err(error_message.to_js_error(Some(cause)))
            }
        }
    }
}
