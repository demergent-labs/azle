pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        // TODO This was changed to allow null or undefined JsValues, this should be thought through and tested
        impl CdkActTryFromVmValue<(), &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<(), CdkActTryFromVmValueError> {
                if self.is_null() == true || self.is_undefined() == true {
                    Ok(())
                }
                else {
                    Err(CdkActTryFromVmValueError("JsValue is not null or undefined".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<bool, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<bool, CdkActTryFromVmValueError> {
                match self.as_boolean() {
                    Some(value) => Ok(value),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a boolean".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<String, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<String, CdkActTryFromVmValueError> {
                match self.as_string() {
                    Some(value) => Ok(value.to_std_string().unwrap()),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a string".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::export::candid::Empty, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Empty, CdkActTryFromVmValueError> {
                Err(CdkActTryFromVmValueError("JsValue cannot be converted into type 'empty'".to_string()))
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::export::candid::Reserved, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Reserved, CdkActTryFromVmValueError> {
                Ok(ic_cdk::export::candid::Reserved)
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::export::candid::Func, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Func, CdkActTryFromVmValueError> {
                match self.as_object() {
                    Some(js_object) => {
                        match (js_object.get("0", context), js_object.get("1", context)) {
                            (Ok(principal_js_value), Ok(canister_method_text)) => {
                                match (principal_js_value.try_from_vm_value(&mut *context), canister_method_text.try_from_vm_value(&mut *context)) {
                                    (Ok(principal), Ok(canister_method_string)) => {
                                        Ok(ic_cdk::export::candid::Func {
                                            principal,
                                            method: canister_method_string
                                        })
                                    },
                                    _ => Err(CdkActTryFromVmValueError("principal could not be created or canister method not a string".to_string()))
                                }
                            },
                            _ => Err(CdkActTryFromVmValueError("Could not retrieve index 0 or 1".to_string()))
                        }

                    },
                    None => Err(CdkActTryFromVmValueError("JsValue is not an object".to_string()))
                }
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
                                    None => Err(CdkActTryFromVmValueError("JsValue is not an object".to_string()))
                                }
                            },
                            Err(err) => Err(CdkActTryFromVmValueError("principal_js_object.get(\"toText\", context) failed".to_string()))
                        }
                    },
                    None => Err(CdkActTryFromVmValueError("JsValue is not an object".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<ic_cdk_timers::TimerId, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk_timers::TimerId, CdkActTryFromVmValueError> {
                let js_value_as_u64: u64 = self.try_from_vm_value(context).unwrap();
                Ok(ic_cdk_timers::TimerId::from(slotmap::KeyData::from_ffi(js_value_as_u64)))
            }
        }
    }
}
