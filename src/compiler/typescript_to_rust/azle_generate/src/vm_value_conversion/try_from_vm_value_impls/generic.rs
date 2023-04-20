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
                match self.as_object() {
                    Some(js_object) => {
                        let has_none_property = match js_object.has_own_property("None", context) {
                            Ok(has_none_property) => has_none_property,
                            Err(err) => return Err(CdkActTryFromVmValueError(err.to_string())),
                        };
                        let has_some_property = match js_object.has_own_property("Some", context) {
                            Ok(has_some_property) => has_some_property,
                            Err(err) => return Err(CdkActTryFromVmValueError(err.to_string())),
                        };

                        if has_none_property && has_some_property {
                            Err(CdkActTryFromVmValueError(
                                "TypeError: value is not an Opt".to_string(),
                            ))
                        } else if has_none_property {
                            match js_object.get("None", context) {
                                Ok(none_value) => {
                                    if none_value.is_null() {
                                        Ok(None)
                                    } else {
                                        Err(CdkActTryFromVmValueError(
                                            "TypeError: value is not null".to_string(),
                                        ))
                                    }
                                }
                                Err(err) => Err(CdkActTryFromVmValueError(err.to_string())),
                            }
                        } else if has_some_property {
                            match js_object.get("Some", context) {
                                Ok(some_value) => match some_value.try_from_vm_value(context) {
                                    Ok(value) => Ok(Some(value)),
                                    Err(err) => Err(err),
                                },
                                Err(err) => Err(CdkActTryFromVmValueError(err.to_string())),
                            }
                        } else {
                            Err(CdkActTryFromVmValueError(
                                "TypeError: value is not an Opt".to_string(),
                            ))
                        }
                    }
                    None => Err(CdkActTryFromVmValueError(
                        "TypeError: value is not an Opt".to_string(),
                    )),
                }
            }
        }
    }
}
