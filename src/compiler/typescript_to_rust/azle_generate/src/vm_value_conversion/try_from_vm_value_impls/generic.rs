pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        impl<T> CdkActTryFromVmValue<(T,), boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        where
            boa_engine::JsValue: for<'a, 'b> CdkActTryFromVmValue<
                T,
                boa_engine::JsError,
                &'a mut boa_engine::Context<'b>,
            >,
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<(T,), boa_engine::JsError> {
                Ok((self.try_from_vm_value(context)?,))
            }
        }

        impl<T> CdkActTryFromVmValue<Box<T>, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        where
            boa_engine::JsValue: for<'a, 'b> CdkActTryFromVmValue<
                T,
                boa_engine::JsError,
                &'a mut boa_engine::Context<'b>,
            >,
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<Box<T>, boa_engine::JsError> {
                Ok(Box::new(self.try_from_vm_value(context)?))
            }
        }

        impl<T> CdkActTryFromVmValue<Option<T>, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        where
            boa_engine::JsValue: for<'a, 'b> CdkActTryFromVmValue<
                T,
                boa_engine::JsError,
                &'a mut boa_engine::Context<'b>,
            >,
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<Option<T>, boa_engine::JsError> {
                let error_message = "TypeError: Value is not of type 'Opt'";

                let js_object = self
                    .as_object()
                    .ok_or_else(|| error_message.to_js_error(None))?;

                let has_none_property = js_object.has_own_property("None", context)?;

                let has_some_property = js_object.has_own_property("Some", context)?;

                if has_none_property && has_some_property {
                    let cause = "TypeError: Value must contain exactly one of the \
                        following properties: ['Some', 'None']"
                        .to_js_error(None);

                    return Err(error_message.to_js_error(Some(cause)))?;
                }

                if has_none_property {
                    let none_value = js_object.get("None", context).map_err(|err| {
                        let cause = err.to_string().to_js_error(None);

                        error_message.to_js_error(Some(cause))
                    })?;

                    return if none_value.is_null() {
                        Ok(None)
                    } else {
                        let cause = "TypeError: Value is not of type 'null'".to_js_error(None);

                        Err(error_message.to_js_error(Some(cause)))
                    };
                }

                if has_some_property {
                    return Ok(Some(
                        js_object
                            .get("Some", context)
                            .map_err(|err| {
                                let cause = err.to_string().to_js_error(None);

                                error_message.to_js_error(Some(cause))
                            })?
                            .try_from_vm_value(context)
                            .map_err(|js_error| error_message.to_js_error(Some(js_error)))?,
                    ));
                }

                let cause = "TypeError: Value must contain exactly one of the \
                    following properties: ['Some', 'None']"
                    .to_js_error(None);

                Err(error_message.to_js_error(Some(cause)))?
            }
        }
    }
}
