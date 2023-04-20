pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        impl<T> CdkActTryFromVmValue<(T,), &mut boa_engine::Context<'_>> for boa_engine::JsValue
        where
            boa_engine::JsValue: for<'a, 'b> CdkActTryFromVmValue<T, &'a mut boa_engine::Context<'b>>
        {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<(T,), CdkActTryFromVmValueError> {
                Ok((self.try_from_vm_value(context).unwrap(),))
            }
        }

        impl<T> CdkActTryFromVmValue<Box<T>, &mut boa_engine::Context<'_>> for boa_engine::JsValue
        where
            boa_engine::JsValue: for<'a, 'b> CdkActTryFromVmValue<T, &'a mut boa_engine::Context<'b>>
        {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Box<T>, CdkActTryFromVmValueError> {
                match self.try_from_vm_value(context) {
                    Ok(value) => Ok(Box::new(value)),
                    Err(err) => Err(err)
                }
            }
        }

        impl<T> CdkActTryFromVmValue<Option<T>, &mut boa_engine::Context<'_>> for boa_engine::JsValue
        where
            boa_engine::JsValue: for<'a, 'b> CdkActTryFromVmValue<T, &'a mut boa_engine::Context<'b>>,
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<Option<T>, CdkActTryFromVmValueError> {
                let err_msg = "value is not an Opt".to_string();
                let not_an_opt_err = CdkActTryFromVmValueError(err_msg.clone());

                let js_object = self
                    .as_object()
                    .ok_or(CdkActTryFromVmValueError(err_msg.clone()))?;

                let has_none_property = js_object
                    .has_own_property("None", context)
                    .map_err(|err| CdkActTryFromVmValueError(err.to_string()))?;

                let has_some_property = js_object
                    .has_own_property("Some", context)
                    .map_err(|err| CdkActTryFromVmValueError(err.to_string()))?;

                if has_none_property && has_some_property {
                    return Err(not_an_opt_err);
                }

                if has_none_property {
                    let none_value = js_object
                        .get("None", context)
                        .map_err(|err| CdkActTryFromVmValueError(err.to_string()))?;

                    if none_value.is_null() {
                        Ok(None)
                    } else {
                        Err(CdkActTryFromVmValueError("value is not null".to_string()))
                    }
                } else if has_some_property {
                    let some_value = js_object
                        .get("Some", context)
                        .map_err(|err| CdkActTryFromVmValueError(err.to_string()))?;

                    some_value.try_from_vm_value(context).map(Some)
                } else {
                    Err(not_an_opt_err)
                }
            }
        }
    }
}
