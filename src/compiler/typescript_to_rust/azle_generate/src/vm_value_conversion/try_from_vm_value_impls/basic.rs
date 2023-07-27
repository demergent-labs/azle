pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        // TODO This was changed to allow null or undefined JsValues,
        // this should be thought through and tested
        impl CdkActTryFromVmValue<(), boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<(), boa_engine::JsError> {
                if self.is_null() || self.is_undefined() {
                    return Ok(());
                }

                Err("TypeError: Value is not of type 'null' or 'undefined'".to_js_error(None))?
            }
        }

        impl CdkActTryFromVmValue<bool, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<bool, boa_engine::JsError> {
                Ok(self
                    .as_boolean()
                    .ok_or_else(|| "TypeError: Value is not of type 'boolean'".to_js_error(None))?)
            }
        }

        impl CdkActTryFromVmValue<String, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<String, boa_engine::JsError> {
                let error_message = "TypeError: Value is not of type 'string'";

                Ok(self
                    .as_string()
                    .ok_or_else(|| error_message.to_js_error(None))?
                    .to_std_string()
                    .map_err(|err| {
                        let cause = err.to_string().to_js_error(None);

                        error_message.to_js_error(Some(cause))
                    })?)
            }
        }

        impl CdkActTryFromVmValue<candid::Empty, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<candid::Empty, boa_engine::JsError> {
                Err("TypeError: Value cannot be converted into type 'empty'".to_js_error(None))?
            }
        }

        impl
            CdkActTryFromVmValue<
                candid::Reserved,
                boa_engine::JsError,
                &mut boa_engine::Context<'_>,
            > for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<candid::Reserved, boa_engine::JsError> {
                Ok(candid::Reserved)
            }
        }

        impl CdkActTryFromVmValue<candid::Func, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<candid::Func, boa_engine::JsError> {
                let error_message = "TypeError: Value is not of type 'Func'";

                let js_object = self
                    .as_object()
                    .ok_or_else(|| error_message.to_js_error(None))?;

                if !js_object.is_array() {
                    let cause = "TypeError: Expected 'Array', given 'Object'".to_js_error(None);

                    return Err(error_message.to_js_error(Some(cause)));
                }

                let index0 = js_object.get("0", context)?;

                if index0.is_undefined() {
                    let cause = "TypeError: Index '0' is undefined".to_js_error(None);

                    return Err(error_message.to_js_error(Some(cause)));
                }

                let principal =
                    index0
                        .try_from_vm_value(&mut *context)
                        .map_err(|principal_err| {
                            let cause = "TypeError: Index '0' is not of type 'Principal'"
                                .to_js_error(Some(principal_err));

                            error_message.to_js_error(Some(cause))
                        })?;

                let index1 = js_object.get("1", context)?;

                if index1.is_undefined() {
                    let cause = "TypeError: Index '1' is undefined".to_js_error(None);

                    return Err(error_message.to_js_error(Some(cause)));
                }

                let method = index1.try_from_vm_value(&mut *context).map_err(|str_err| {
                    let cause = "TypeError: Index '1' is not of type 'string'".to_js_error(Some(str_err));

                    error_message.to_js_error(Some(cause))
                })?;

                Ok(candid::Func { principal, method })
            }
        }

        impl
            CdkActTryFromVmValue<
                candid::Principal,
                boa_engine::JsError,
                &mut boa_engine::Context<'_>,
            > for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<candid::Principal, boa_engine::JsError> {
                let error_message = "TypeError: Value is not of type 'Principal'";

                let principal_js_object = self
                    .as_object()
                    .ok_or_else(|| error_message.to_js_error(None))?;

                let principal_to_text_function_js_value =
                    principal_js_object.get("toText", context).map_err(|err| {
                        let cause = "TypeError: Property 'toText' of object is not a function"
                            .to_js_error(None);

                        error_message.to_js_error(Some(cause))
                    })?;

                let principal_to_text_function_js_object = principal_to_text_function_js_value
                    .as_object()
                    .ok_or_else(|| {
                        let cause = "TypeError: Property 'toText' of object is not a function"
                            .to_js_error(None);

                        error_message.to_js_error(Some(cause))
                    })?;

                let principal_text = principal_to_text_function_js_object
                    .call(&self, &[], context)
                    .map_err(|js_err| error_message.to_js_error(Some(js_err)))?
                    .as_string()
                    .ok_or_else(|| {
                        let cause =
                            "TypeError: Return value of method 'toText' is not of type 'string'"
                                .to_js_error(None);

                        error_message.to_js_error(Some(cause))
                    })?
                    .to_std_string()
                    .map_err(|err| {
                        let cause = err.to_string().to_js_error(None);

                        error_message.to_js_error(Some(cause))
                    })?;

                // If we get any of these errors it's because they didn't supply Dfinity's built-in
                // `toText` method. Dfinity's `Principal.fromText` and `Principal.toText` both throw
                // errors which means if their text value is invalid, the JS code will most likely
                // throw before we can even return an invalid Principal. And if somehow they are
                // able to return an invalid principal, `principal_to_text_function_js_object.call`
                // above should error out.
                let principal =
                    candid::Principal::from_text(principal_text).map_err(|principal_error| {
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

                        // TODO: Consider turning these inner errors into custom errors.
                        // Currently the inner error will be the base `Error` type. We should
                        // consider making a PrincipalError type and having each of these errors as
                        // children of that type.
                        // See https://github.com/demergent-labs/azle/issues/1121

                        let inner_error_message = principal_error.to_string();

                        let inner_error =
                            format!("{inner_error_name}: {inner_error_message}").to_js_error(None);

                        error_message.to_js_error(Some(inner_error))
                    })?;

                Ok(principal)
            }
        }

        impl
            CdkActTryFromVmValue<
                ic_cdk_timers::TimerId,
                boa_engine::JsError,
                &mut boa_engine::Context<'_>,
            > for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<ic_cdk_timers::TimerId, boa_engine::JsError> {
                Ok(ic_cdk_timers::TimerId::from(slotmap::KeyData::from_ffi(
                    self.try_from_vm_value(context)?,
                )))
            }
        }
    }
}
