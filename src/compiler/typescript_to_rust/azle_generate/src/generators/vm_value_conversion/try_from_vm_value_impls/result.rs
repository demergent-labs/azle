pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        impl CdkActTryFromVmValue<Result<(), String>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Result<(), String>, CdkActTryFromVmValueError> {
                match self.as_object() {
                    Some(js_object) => {
                        match js_object.has_own_property("err", context) {
                            Ok(has_err_value) => {
                                if has_err_value {
                                    match js_object.get("err", context) {
                                        Ok(err_value) => return Ok(Err(err_value.try_from_vm_value(context).unwrap())),
                                        Err(err) => return Err(CdkActTryFromVmValueError(err.to_string()))
                                    }
                                }
                            },
                            Err(err) => return Err(CdkActTryFromVmValueError(err.to_string()))
                        }
                        match js_object.has_own_property("ok", context) {
                            Ok(has_ok_value) => {
                                if has_ok_value {
                                    match js_object.get("ok", context) {
                                        Ok(ok_value) => {
                                            if ok_value.is_null() {
                                                return Ok(Ok(()))
                                            }
                                            else {
                                                return Err(CdkActTryFromVmValueError("JsValue is not null".to_string()))
                                            }
                                        },
                                        Err(err) => return Err(CdkActTryFromVmValueError(err.to_string()))
                                    }
                                }
                            },
                            Err(err) => return Err(CdkActTryFromVmValueError(err.to_string()))
                        }

                        Err(CdkActTryFromVmValueError("JsValue is not a GuardResult".to_string()))
                    },
                    None => Err(CdkActTryFromVmValueError("JsValue is not an object".to_string())),
                }
            }
        }
    }
}
