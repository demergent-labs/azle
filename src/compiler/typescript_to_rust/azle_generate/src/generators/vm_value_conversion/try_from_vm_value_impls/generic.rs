pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        impl<T> CdkActTryFromVmValue<(T,), &mut boa_engine::Context> for boa_engine::JsValue
        where
            boa_engine::JsValue: for<'a> CdkActTryFromVmValue<T, &'a mut boa_engine::Context>
        {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<(T,), CdkActTryFromVmValueError> {
                Ok((self.try_from_vm_value(context).unwrap(),))
            }
        }

        impl<T> CdkActTryFromVmValue<Box<T>, &mut boa_engine::Context> for boa_engine::JsValue
        where
            boa_engine::JsValue: for<'a> CdkActTryFromVmValue<T, &'a mut boa_engine::Context>
        {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Box<T>, CdkActTryFromVmValueError> {
                match self.try_from_vm_value(context) {
                    Ok(value) => Ok(Box::new(value)),
                    Err(err) => Err(err)
                }
            }
        }

        impl<T> CdkActTryFromVmValue<Option<T>, &mut boa_engine::Context> for boa_engine::JsValue
        where
            boa_engine::JsValue: for<'a> CdkActTryFromVmValue<T, &'a mut boa_engine::Context>
        {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Option<T>, CdkActTryFromVmValueError> {
                if self.is_null() {
                    Ok(None)
                }
                else {
                    match self.try_from_vm_value(context) {
                        Ok(value) => Ok(Some(value)),
                        Err(err) => Err(err)
                    }
                }
            }
        }
    }
}
