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
                    .map_err(|err| CdkActTryFromVmValueError(format!("SystemError: {err}")))?)
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
                    .map_err(|err| CdkActTryFromVmValueError(format!("SystemError: {err}")))?
                    .try_from_vm_value(&mut *context)?;

                let method = js_object
                    .get("1", context)
                    .map_err(|err| CdkActTryFromVmValueError(format!("SystemError: {err}")))?
                    .try_from_vm_value(&mut *context)?;

                Ok(ic_cdk::export::candid::Func { principal, method })
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::export::Principal, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::Principal, CdkActTryFromVmValueError> {
                let principal_js_object = self
                    .as_object()
                    .ok_or_else(|| "TypeError: value is not an object")?;

                let principal_to_text_function_js_value = principal_js_object
                    .get("toText", context)
                    .map_err(|err| "TypeError: property 'toText' of object is not a function")?;

                let principal_to_text_function_js_object = principal_to_text_function_js_value
                    .as_object()
                    .ok_or_else(|| "TypeError: property 'toText' of object is not a function")?;

                let principal_text = principal_to_text_function_js_object
                    .call(&self, &[], context)
                    .map_err(|js_err| CdkActTryFromVmValueError(js_err.to_string()))?
                    .as_string()
                    .ok_or_else(|| "TypeError: value is not a string")?
                    .to_std_string()
                    .map_err(|err| CdkActTryFromVmValueError(format!("SystemError: {err}")))?;

                let principal = ic_cdk::export::Principal::from_text(principal_text)
                    .map_err(|principal_error| {
                        let name = match principal_error {
                            candid::types::principal::PrincipalError::BytesTooLong() => "BytesTooLongError",
                            candid::types::principal::PrincipalError::InvalidBase32() => "InvalidBase32Error",
                            candid::types::principal::PrincipalError::TextTooShort() => "TextTooShortError",
                            candid::types::principal::PrincipalError::TextTooLong() => "TextTooLongError",
                            candid::types::principal::PrincipalError::CheckSequenceNotMatch() => "CheckSequenceNotMatchError",
                            candid::types::principal::PrincipalError::AbnormalGrouped(_) => "AbnormalGroupedError",
                        };

                        let message = principal_error.to_string();

                        CdkActTryFromVmValueError(format!("{name}: {message}"))
                    })?;

                Ok(principal)
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
