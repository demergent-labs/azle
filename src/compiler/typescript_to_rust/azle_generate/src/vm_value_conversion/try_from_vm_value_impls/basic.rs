pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        // TODO This was changed to allow null or undefined JsValues,
        // this should be thought through and tested
        impl CdkActTryFromVmValue<(), &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<(), CdkActTryFromVmValueError> {
                if self.is_null() || self.is_undefined() {
                    return Ok(());
                }

                Err("TypeError: value is not null or undefined")?
            }
        }

        impl CdkActTryFromVmValue<bool, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<bool, CdkActTryFromVmValueError> {
                Ok(self
                    .as_boolean()
                    .ok_or_else(|| "TypeError: value is not a boolean")?)
            }
        }

        impl CdkActTryFromVmValue<String, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<String, CdkActTryFromVmValueError> {
                Ok(self
                    .as_string()
                    .ok_or_else(|| "TypeError: value is not a string")?
                    .to_std_string()
                    .map_err(|err| "SystemError: {err}")?)
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::export::candid::Empty, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<ic_cdk::export::candid::Empty, CdkActTryFromVmValueError> {
                Err("TypeError: value cannot be converted into type 'empty'")?
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::export::candid::Reserved, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<ic_cdk::export::candid::Reserved, CdkActTryFromVmValueError> {
                Ok(ic_cdk::export::candid::Reserved)
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::export::candid::Func, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<ic_cdk::export::candid::Func, CdkActTryFromVmValueError> {
                let js_object = self
                    .as_object()
                    .ok_or_else(|| "TypeError: value is not an object")?;

                let principal = js_object
                    .get("0", context)
                    .map_err(|err| "TypeError: undefined is not a Principal")?
                    .try_from_vm_value(&mut *context)?;

                let method = js_object
                    .get("1", context)
                    .map_err(|err| "TypeError: undefined is not a string")?
                    .try_from_vm_value(&mut *context)?;

                Ok(ic_cdk::export::candid::Func { principal, method })
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::export::Principal, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::Principal, CdkActTryFromVmValueError> {
                match self.as_object() {
                    Some(principal_js_object) => {
                        match principal_js_object.get("toText", context) {
                            Ok(principal_to_text_function_js_value) => {
                                match principal_to_text_function_js_value.as_object() {
                                    Some(principal_to_text_function_js_object) => {
                                        match principal_to_text_function_js_object.call(&self, &[], context) {
                                            Ok(principal_string_js_value) => {
                                                match principal_string_js_value.as_string() {
                                                    Some(principal_js_string) => {
                                                        match ic_cdk::export::Principal::from_text(principal_js_string.to_std_string().unwrap()) {
                                                            Ok(principal) => Ok(principal),
                                                            Err(err) => Err(CdkActTryFromVmValueError(err.to_string()))
                                                        }
                                                    },
                                                    None => Err(CdkActTryFromVmValueError("JsValue is not a string".to_string()))
                                                }
                                            },
                                            Err(err_js_error) => {
                                                let err_js_value = err_js_error.to_opaque(context);
                                                let err_js_object = err_js_value.as_object().unwrap();

                                                let err_name: String = err_js_object.get("name", &mut *context).unwrap().try_from_vm_value(&mut * context).unwrap();
                                                let err_message: String = err_js_object.get("message", &mut *context).unwrap().try_from_vm_value(&mut *context).unwrap();

                                                Err(CdkActTryFromVmValueError(format!(
                                                    "{name}: {message}",
                                                    name = err_name,
                                                    message = err_message
                                                )))
                                            }
                                        }
                                    },
                                    None => Err(CdkActTryFromVmValueError("property 'toText' of object is not a function".to_string()))
                                }
                            },
                            Err(err) => Err(CdkActTryFromVmValueError("property 'toText' of object is not a function".to_string()))
                        }
                    },
                    None => Err(CdkActTryFromVmValueError("value is not an object".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<ic_cdk_timers::TimerId, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<ic_cdk_timers::TimerId, CdkActTryFromVmValueError> {
                Ok(ic_cdk_timers::TimerId::from(slotmap::KeyData::from_ffi(
                    self.try_from_vm_value(context)?,
                )))
            }
        }
    }
}
