pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for (T,)
        where
            T : for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>,
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok(self.0.try_into_vm_value(context).unwrap())
            }
        }

        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Box<T>
        where
            T : for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>,
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                Ok((*self).try_into_vm_value(context).unwrap())
            }
        }

        // TODO I wonder if we will have some problems with Option because of the type bound??
        impl<T> CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Option<T>
        where
            T: for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                match self {
                    Some(value) => Ok(value.try_into_vm_value(context).unwrap()),
                    None => Ok(boa_engine::JsValue::Null)
                }
            }
        }

        impl<T, K> CdkActTryIntoVmValue<&mut boa_engine::Context, boa_engine::JsValue> for Result<T, K>
        where
            T: for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>,
            K: for<'a> CdkActTryIntoVmValue<&'a mut boa_engine::Context, boa_engine::JsValue>
        {
            fn try_into_vm_value(self, context: &mut boa_engine::Context) -> Result<boa_engine::JsValue, CdkActTryIntoVmValueError> {
                match self {
                    Ok(ok) => {
                        let ok_js_value = ok.try_into_vm_value(context).unwrap();

                        let result_js_object = boa_engine::object::ObjectInitializer::new(context)
                            .property(
                                "ok",
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
                                "err",
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
