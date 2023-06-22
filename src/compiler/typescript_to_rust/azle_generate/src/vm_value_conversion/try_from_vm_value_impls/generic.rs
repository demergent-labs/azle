pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        impl<T> CdkActTryFromVmValue<(T,), &mut boa_engine::Context<'_>> for boa_engine::JsValue
        where
            boa_engine::JsValue:
                for<'a, 'b> CdkActTryFromVmValue<T, &'a mut boa_engine::Context<'b>>,
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<(T,), CdkActTryFromVmValueError> {
                Ok((self.try_from_vm_value(context)?,))
            }
        }

        impl<T> CdkActTryFromVmValue<Box<T>, &mut boa_engine::Context<'_>> for boa_engine::JsValue
        where
            boa_engine::JsValue:
                for<'a, 'b> CdkActTryFromVmValue<T, &'a mut boa_engine::Context<'b>>,
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<Box<T>, CdkActTryFromVmValueError> {
                Ok(Box::new(self.try_from_vm_value(context)?))
            }
        }

        impl<T> CdkActTryFromVmValue<Option<T>, &mut boa_engine::Context<'_>> for boa_engine::JsValue
        where
            boa_engine::JsValue:
                for<'a, 'b> CdkActTryFromVmValue<T, &'a mut boa_engine::Context<'b>>,
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<Option<T>, CdkActTryFromVmValueError> {
                let js_object = self.as_object().ok_or_else(|| "TypeError: value is not an Opt")?;

                let has_none_property = js_object
                    .has_own_property("None", context)
                    .map_err(|err| err.to_string())?;

                let has_some_property = js_object
                    .has_own_property("Some", context)
                    .map_err(|err| err.to_string())?;

                if has_none_property && has_some_property {
                    return Err("TypeError: value is not an Opt")?;
                }

                if has_none_property {
                    let none_value = js_object
                        .get("None", context)
                        .map_err(|err| err.to_string())?;

                    return if none_value.is_null() {
                        Ok(None)
                    } else {
                        Err("TypeError: value is not null")?
                    };
                }

                if has_some_property {
                    return js_object
                        .get("Some", context)
                        .map_err(|err| err.to_string())?
                        .try_from_vm_value(context)
                        .map(Some);
                }

                Err("TypeError: value is not an Opt")?
            }
        }
    }
}
