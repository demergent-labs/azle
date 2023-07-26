pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        impl CdkActTryFromVmValue<f64, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<f64, CdkActTryFromVmValueError> {
                Ok(self.as_number().ok_or_else(|| "TypeError: Value is not of type 'float64'")?)
            }
        }

        impl CdkActTryFromVmValue<_CdkFloat64, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<_CdkFloat64, CdkActTryFromVmValueError> {
                Ok(_CdkFloat64(
                    self.as_number().ok_or_else(|| "TypeError: Value is not of type 'float64'")?,
                ))
            }
        }

        impl CdkActTryFromVmValue<f32, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<f32, CdkActTryFromVmValueError> {
                Ok(self.as_number().ok_or_else(|| "TypeError: Value is not of type 'float32'")? as f32)
            }
        }

        impl CdkActTryFromVmValue<_CdkFloat32, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<_CdkFloat32, CdkActTryFromVmValueError> {
                Ok(_CdkFloat32(
                    self.as_number().ok_or_else(|| "TypeError: Value is not of type 'float32'")? as f32,
                ))
            }
        }

        // TODO it would probably be better to get the BigInt out of the JsValue and convert it more
        // TODO directly but we might run into problems with Nat and BigUint, thus I am doing a
        // TODO string conversion for now
        impl CdkActTryFromVmValue<candid::Int, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<candid::Int, CdkActTryFromVmValueError> {
                let int_string = self
                    .as_bigint()
                    .ok_or_else(|| "TypeError: Value is not of type 'int'")?
                    .to_string();

                // TODO probably not the best conversion
                Ok(candid::Int::from_str(&int_string)
                    .map_err(|err| err.to_string())?)
            }
        }

        impl CdkActTryFromVmValue<i128, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<i128, CdkActTryFromVmValueError> {
                Ok(self
                    .as_bigint()
                    .ok_or_else(|| "TypeError: Value is not of type 'int'")?
                    .to_string()
                    .parse::<i128>()
                    .map_err(|err| err.to_string())?)
            }
        }

        // TODO this might break since i64 may (will) not be a bigint
        // TODO probably need to implement my own conversion here until try_from_js_value is fixed
        impl CdkActTryFromVmValue<i64, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<i64, CdkActTryFromVmValueError> {
                Ok(self
                    .as_bigint()
                    .ok_or_else(|| "TypeError: Value is not of type 'int64'")?
                    .to_string()
                    .parse::<i64>()
                    .map_err(|err| err.to_string())?)
            }
        }

        impl CdkActTryFromVmValue<i32, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<i32, CdkActTryFromVmValueError> {
                Ok(self.as_number().ok_or_else(|| "TypeError: Value is not of type 'int32'")? as i32)
            }
        }

        impl CdkActTryFromVmValue<i16, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<i16, CdkActTryFromVmValueError> {
                Ok(self.as_number().ok_or_else(|| "TypeError: Value is not of type 'int16'")? as i16)
            }
        }

        impl CdkActTryFromVmValue<i8, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<i8, CdkActTryFromVmValueError> {
                Ok(self.as_number().ok_or_else(|| "TypeError: Value is not of type 'int8'")? as i8)
            }
        }

        impl CdkActTryFromVmValue<candid::Nat, &mut boa_engine::Context<'_>>
            for boa_engine::JsValue
        {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<candid::Nat, CdkActTryFromVmValueError> {
                let bigint_string = self
                    .as_bigint()
                    .ok_or_else(|| "TypeError: Value is not of type 'nat'")?
                    .to_string();

                // TODO probably not the best conversion
                Ok(candid::Nat::from_str(&bigint_string)
                    .map_err(|err| err.to_string())?)
            }
        }

        impl CdkActTryFromVmValue<u128, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<u128, CdkActTryFromVmValueError> {
                Ok(self
                    .as_bigint()
                    .ok_or_else(|| "TypeError: Value is not of type 'nat'")?
                    .to_string()
                    .parse::<u128>()
                    .map_err(|err| err.to_string())?)
            }
        }

        // TODO this might break since i64 may (will) not be a bigint
        // TODO probably need to implement my own conversion here until try_from_js_value is fixed
        impl CdkActTryFromVmValue<u64, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<u64, CdkActTryFromVmValueError> {
                Ok(self
                    .as_bigint()
                    .ok_or_else(|| "TypeError: Value is not of type 'nat64'")?
                    .to_string()
                    .parse::<u64>()
                    .map_err(|err| err.to_string())?)
            }
        }

        impl CdkActTryFromVmValue<u32, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<u32, CdkActTryFromVmValueError> {
                Ok(self.as_number().ok_or_else(|| "TypeError: Value is not of type 'nat32'")? as u32)
            }
        }

        impl CdkActTryFromVmValue<u16, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<u16, CdkActTryFromVmValueError> {
                Ok(self.as_number().ok_or_else(|| "TypeError: Value is not of type 'nat16'")? as u16)
            }
        }

        impl CdkActTryFromVmValue<u8, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(
                self,
                context: &mut boa_engine::Context,
            ) -> Result<u8, CdkActTryFromVmValueError> {
                Ok(self.as_number().ok_or_else(|| "TypeError: Value is not of type 'nat8'")? as u8)
            }
        }
    }
}
