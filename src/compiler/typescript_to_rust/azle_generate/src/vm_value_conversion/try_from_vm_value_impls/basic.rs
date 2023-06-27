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

                Err("TypeError: value is not of type 'null' or 'undefined'")?
            }
        }

        impl CdkActTryFromVmValue<bool, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<bool, CdkActTryFromVmValueError> {
                Ok(self
                    .as_boolean()
                    .ok_or_else(|| "TypeError: value is not of type 'boolean'")?)
            }
        }

        impl CdkActTryFromVmValue<String, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<String, CdkActTryFromVmValueError> {
                Ok(self
                    .as_string()
                    .ok_or_else(|| "TypeError: value is not of type 'string'")?
                    .to_std_string()
                    .map_err(|err| format!("SystemError: {err}"))?)
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
                    .ok_or_else(|| "TypeError: value is not of type 'Func'")?;

                if !js_object.is_array() {
                    return Err("[TypeError: value is not of type 'Func'] {\n  [cause]: TypeError: expected 'Array', given 'Object'\n}")?;
                }

                let index0 = js_object
                    .get("0", context)
                    .map_err(|err| format!("InternalError: {err}"))?;

                if index0.is_undefined() {
                    return Err("[TypeError: value is not of type 'Func'] {\n  [cause]: TypeError: index '0' is undefined\n}")?;
                }

                let principal = index0
                    .try_from_vm_value(&mut *context)
                    .map_err(|principal_err| {
                        format!(
                            "[TypeError: value is not of type 'Func'] {{\n  [cause]: TypeError: index '0' is not of type 'Principal' {{\n    [cause]: {}\n  }}\n}}",
                            principal_err.0
                        )
                    })?;

                let index1 = js_object
                    .get("1", context)
                    .map_err(|err| format!("InternalError: {err}"))?;

                if index1.is_undefined() {
                    return Err("[TypeError: value is not of type 'Func'] {\n  [cause]: TypeError: index '1' is undefined\n}")?;
                }

                let method = index1
                    .try_from_vm_value(&mut *context)
                    .map_err(|str_err| {
                        format!(
                            "[TypeError: value is not of type 'Func'] {{\n  [cause]: TypeError: index '1' is not of type 'string' {{\n    [cause]: {}\n  }}\n}}",
                            str_err.0
                        )
                    })?;

                Ok(ic_cdk::export::candid::Func { principal, method })
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::export::Principal, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<ic_cdk::export::Principal, CdkActTryFromVmValueError> {
                let principal_js_object = self
                    .as_object()
                    .ok_or_else(|| "TypeError: value is not of type 'Principal'")?;

                let principal_to_text_function_js_value = principal_js_object
                    .get("toText", context)
                    .map_err(|err| "[TypeError: value is not of type 'Principal'] {\n  [cause]: TypeError: property 'toText' of object is not a function\n}")?;

                let principal_to_text_function_js_object = principal_to_text_function_js_value
                    .as_object()
                    .ok_or_else(|| "[TypeError: value is not of type 'Principal'] {\n  [cause]: TypeError: property 'toText' of object is not a function\n}")?;

                let principal_text = principal_to_text_function_js_object
                    .call(&self, &[], context)
                    .map_err(|js_err| format!("[TypeError: value is not of type 'Principal'] {{\n  [cause]: {}\n}}", js_err.to_string()))?
                    .as_string()
                    .ok_or_else(|| "[TypeError: value is not of type 'Principal'] {\n  [cause]: TypeError: return value of method 'toText' is not of type 'string'\n}")?
                    .to_std_string()
                    .map_err(|err| format!("InternalError: {err}"))?;

                // If we get any of these errors it's because they didn't supply Dfinity's built-in
                // `toText` method. Dfinity's `Principal.fromText` and `Principal.toText` both throw
                // errors which means if their text value is invalid, the JS code will most likely
                // throw before we can even return an invalid Principal. And if somehow they are
                // able to return an invalid principal, `principal_to_text_function_js_object.call`
                // above should error out.
                let principal = ic_cdk::export::Principal::from_text(principal_text).map_err(
                    |principal_error| {
                        let inner_error_name = match principal_error {
                            candid::types::principal::PrincipalError::BytesTooLong() => {
                                "BytesTooLongError"
                            }
                            candid::types::principal::PrincipalError::InvalidBase32() => {
                                "InvalidBase32Error"
                            }
                            candid::types::principal::PrincipalError::TextTooShort() => {
                                "TextTooShortError"
                            }
                            candid::types::principal::PrincipalError::TextTooLong() => {
                                "TextTooLongError"
                            }
                            candid::types::principal::PrincipalError::CheckSequenceNotMatch() => {
                                "CheckSequenceNotMatchError"
                            }
                            candid::types::principal::PrincipalError::AbnormalGrouped(_) => {
                                "AbnormalGroupedError"
                            }
                        };

                        let inner_error_message = principal_error.to_string();

                        let inner_error = format!("{inner_error_name}: {inner_error_message}");

                        format!("[TypeError: value is not of type 'Principal'] {{\n  [cause]: {}\n}}", inner_error)
                    },
                )?;

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
