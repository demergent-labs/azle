pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        impl CdkActTryFromVmValue<f64, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<f64, boa_engine::JsError> {
                Ok(self
                    .as_number()
                    .ok_or_else(|| "TypeError: Value is not of type 'float64'".to_js_error(None))?)
            }
        }

        impl CdkActTryFromVmValue<_CdkFloat64, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<_CdkFloat64, boa_engine::JsError> {
                Ok(_CdkFloat64(self.as_number().ok_or_else(|| {
                    "TypeError: Value is not of type 'float64'".to_js_error(None)
                })?))
            }
        }

        impl CdkActTryFromVmValue<f32, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<f32, boa_engine::JsError> {
                Ok(self
                    .as_number()
                    .ok_or_else(|| "TypeError: Value is not of type 'float32'".to_js_error(None))?
                    as f32)
            }
        }

        impl CdkActTryFromVmValue<_CdkFloat32, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<_CdkFloat32, boa_engine::JsError> {
                Ok(_CdkFloat32(
                    self.as_number().ok_or_else(|| {
                        "TypeError: Value is not of type 'float32'".to_js_error(None)
                    })? as f32,
                ))
            }
        }

        // TODO it would probably be better to get the BigInt out of the JsValue and convert it more
        // TODO directly but we might run into problems with Nat and BigUint, thus I am doing a
        // TODO string conversion for now
        impl CdkActTryFromVmValue<candid::Int, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<candid::Int, boa_engine::JsError> {
                let error_message = "TypeError: Value is not of type 'int'";

                let int_string = self
                    .as_bigint()
                    .ok_or_else(|| error_message.to_js_error(None))?
                    .to_string();

                // TODO probably not the best conversion
                Ok(candid::Int::from_str(&int_string).map_err(|err| {
                    let cause = err.to_string().to_js_error(None);

                    error_message.to_js_error(Some(cause))
                })?)
            }
        }

        impl CdkActTryFromVmValue<i128, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<i128, boa_engine::JsError> {
                let error_message = "TypeError: Value is not of type 'int'";

                Ok(self
                    .as_bigint()
                    .ok_or_else(|| error_message.to_js_error(None))?
                    .to_string()
                    .parse::<i128>()
                    .map_err(|err| {
                        let cause = err.to_string().to_js_error(None);

                        error_message.to_js_error(Some(cause))
                    })?)
            }
        }

        // TODO this might break since i64 may (will) not be a bigint
        // TODO probably need to implement my own conversion here until try_from_js_value is fixed
        impl CdkActTryFromVmValue<i64, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<i64, boa_engine::JsError> {
                let error_message = "TypeError: Value is not of type 'int64'";

                Ok(self
                    .as_bigint()
                    .ok_or_else(|| error_message.to_js_error(None))?
                    .to_string()
                    .parse::<i64>()
                    .map_err(|err| {
                        let cause = err.to_string().to_js_error(None);

                        error_message.to_js_error(Some(cause))
                    })?)
            }
        }

        impl CdkActTryFromVmValue<i32, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<i32, boa_engine::JsError> {
                Ok(self
                    .as_number()
                    .ok_or_else(|| "TypeError: Value is not of type 'int32'".to_js_error(None))?
                    as i32)
            }
        }

        impl CdkActTryFromVmValue<i16, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<i16, boa_engine::JsError> {
                Ok(self
                    .as_number()
                    .ok_or_else(|| "TypeError: Value is not of type 'int16'".to_js_error(None))?
                    as i16)
            }
        }

        impl CdkActTryFromVmValue<i8, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<i8, boa_engine::JsError> {
                Ok(self
                    .as_number()
                    .ok_or_else(|| "TypeError: Value is not of type 'int8'".to_js_error(None))?
                    as i8)
            }
        }

        impl CdkActTryFromVmValue<candid::Nat, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<candid::Nat, boa_engine::JsError> {
                let error_message = "TypeError: Value is not of type 'nat'";

                let bigint_string = self
                    .as_bigint()
                    .ok_or_else(|| error_message.to_js_error(None))?
                    .to_string();

                // TODO probably not the best conversion
                Ok(candid::Nat::from_str(&bigint_string).map_err(|err| {
                    let cause = err.to_string().to_js_error(None);

                    error_message.to_js_error(Some(cause))
                })?)
            }
        }

        impl CdkActTryFromVmValue<u128, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<u128, boa_engine::JsError> {
                let error_message = "TypeError: Value is not of type 'nat'";

                Ok(self
                    .as_bigint()
                    .ok_or_else(|| error_message.to_js_error(None))?
                    .to_string()
                    .parse::<u128>()
                    .map_err(|err| {
                        let cause = err.to_string().to_js_error(None);

                        error_message.to_js_error(Some(cause))
                    })?)
            }
        }

        // TODO this might break since i64 may (will) not be a bigint
        // TODO probably need to implement my own conversion here until try_from_js_value is fixed
        impl CdkActTryFromVmValue<u64, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<u64, boa_engine::JsError> {
                let error_message = "TypeError: Value is not of type 'nat64'";

                Ok(self
                    .as_bigint()
                    .ok_or_else(|| error_message.to_js_error(None))?
                    .to_string()
                    .parse::<u64>()
                    .map_err(|err| {
                        let cause = err.to_string().to_js_error(None);

                        error_message.to_js_error(Some(cause))
                    })?)
            }
        }

        impl CdkActTryFromVmValue<u32, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<u32, boa_engine::JsError> {
                Ok(self
                    .as_number()
                    .ok_or_else(|| "TypeError: Value is not of type 'nat32'".to_js_error(None))?
                    as u32)
            }
        }

        impl CdkActTryFromVmValue<u16, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<u16, boa_engine::JsError> {
                Ok(self
                    .as_number()
                    .ok_or_else(|| "TypeError: Value is not of type 'nat16'".to_js_error(None))?
                    as u16)
            }
        }

        impl CdkActTryFromVmValue<u8, boa_engine::JsError, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<u8, boa_engine::JsError> {
                Ok(self
                    .as_number()
                    .ok_or_else(|| "TypeError: Value is not of type 'nat8'".to_js_error(None))?
                    as u8)
            }
        }
    }
}
