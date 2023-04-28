pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue> for (T,)
        where
            T : for<'a, 'b> CdkActTryIntoVmValue<&'a mut boa_engine::Context<'b>, boa_engine::JsValue>,
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.0.try_into_vm_value(context).unwrap())
            }
        }

        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue> for Box<T>
        where
            T : for<'a, 'b> CdkActTryIntoVmValue<&'a mut boa_engine::Context<'b>, boa_engine::JsValue>,
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok((*self).try_into_vm_value(context).unwrap())
            }
        }

        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue> for Option<T>
        where
            T: for<'a, 'b> CdkActTryIntoVmValue<&'a mut boa_engine::Context<'b>, boa_engine::JsValue>,
        {
            fn try_into_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                match self {
                    Some(value) => {
                        let some_js_value = match value.try_into_vm_value(context) {
                            Ok(js_value) => js_value,
                            Err(err) => return Err(err),
                        };
                        Ok(boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "Some",
                                some_js_value,
                                boa_engine::property::Attribute::all(),
                            )
                            .build()
                            .into())
                    }
                    None => Ok(boa_engine::object::ObjectInitializer::new(context)
                        .property(
                            "None",
                            boa_engine::JsValue::Null,
                            boa_engine::property::Attribute::all(),
                        )
                        .build()
                        .into()),
                }
            }
        }

        impl<T, K> CdkActTryIntoVmValue<&mut boa_engine::Context<'_>, boa_engine::JsValue> for Result<T, K>
        where
            T: for<'a, 'b> CdkActTryIntoVmValue<&'a mut boa_engine::Context<'b>, boa_engine::JsValue>,
            K: for<'a, 'b> CdkActTryIntoVmValue<&'a mut boa_engine::Context<'b>, boa_engine::JsValue>
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                match self {
                    Ok(ok) => {
                        let ok_js_value = ok.try_into_vm_value(context).unwrap();

                        let result_js_object = boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "Ok",
                                ok_js_value,
                                boa_engine::property::Attribute::all()
                            )
                            .build();

                        let result_js_value = result_js_object.into();

                        Ok(result_js_value)
                    },
                    Err(err) => {
                        let err_js_value = err.try_into_vm_value(context).unwrap();

                        let result_js_object = boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "Err",
                                err_js_value,
                                boa_engine::property::Attribute::all()
                            )
                            .build();

                        let result_js_value = result_js_object.into();

                        Ok(result_js_value)
                    }
                }
            }
        }
    }
}
