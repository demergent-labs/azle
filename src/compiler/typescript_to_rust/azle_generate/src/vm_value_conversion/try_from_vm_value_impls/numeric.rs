pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        impl CdkActTryFromVmValue<f64, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<f64, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<_CdkFloat64, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<_CdkFloat64, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(_CdkFloat64(value)),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<f32, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<f32, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as f32),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<_CdkFloat32, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<_CdkFloat32, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(_CdkFloat32(value as f32)),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        // TODO it would probably be better to get the BigInt out of the JsValue and convert it more directly
        // TODO but we might run into problems with Nat and BigUint, thus I am doing a string conversion for now
        impl CdkActTryFromVmValue<ic_cdk::export::candid::Int, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Int, CdkActTryFromVmValueError> {
                match self.as_bigint() {
                    Some(value) => Ok(ic_cdk::export::candid::Int::from_str(&value.to_string()).unwrap()), // TODO probably not the best conversion
                    None => Err(CdkActTryFromVmValueError("JsValue is not a bigint".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<i128, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<i128, CdkActTryFromVmValueError> {
                match self.as_bigint() {
                    Some(value) => {
                        let value_i128_result = value.to_string().parse::<i128>();

                        match value_i128_result {
                            Ok(value_i128) => Ok(value_i128),
                            Err(_) => Err(CdkActTryFromVmValueError("Could not parse bigint to i128".to_string()))
                        }
                    },
                    None => Err(CdkActTryFromVmValueError("JsValue is not a bigint".to_string()))
                }
            }
        }

        // TODO this might break since i64 may (will) not be a bigint
        // TODO probably need to implement my own conversion here until try_from_js_value is fixed
        impl CdkActTryFromVmValue<i64, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<i64, CdkActTryFromVmValueError> {
                match self.as_bigint() {
                    Some(value) => {
                        let value_i64_result = value.to_string().parse::<i64>();

                        match value_i64_result {
                            Ok(value_i64) => Ok(value_i64),
                            Err(_) => Err(CdkActTryFromVmValueError("Could not parse bigint to i64".to_string()))
                        }
                    },
                    None => Err(CdkActTryFromVmValueError("JsValue is not a bigint".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<i32, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<i32, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as i32),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<i16, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<i16, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as i16),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<i8, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<i8, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as i8),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::export::candid::Nat, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Nat, CdkActTryFromVmValueError> {
                match self.as_bigint() {
                    Some(value) => Ok(ic_cdk::export::candid::Nat::from_str(&value.to_string()).unwrap()), // TODO probably not the best conversion
                    None => Err(CdkActTryFromVmValueError("JsValue is not a bigint".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<u128, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<u128, CdkActTryFromVmValueError> {
                match self.as_bigint() {
                    Some(value) => {
                        let value_u128_result = value.to_string().parse::<u128>();

                        match value_u128_result {
                            Ok(value_u128) => Ok(value_u128),
                            Err(_) => Err(CdkActTryFromVmValueError("Could not parse bigint to u128".to_string()))
                        }
                    },
                    None => Err(CdkActTryFromVmValueError("JsValue is not a bigint".to_string()))
                }
            }
        }

        // TODO this might break since i64 may (will) not be a bigint
        // TODO probably need to implement my own conversion here until try_from_js_value is fixed
        impl CdkActTryFromVmValue<u64, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<u64, CdkActTryFromVmValueError> {
                match self.as_bigint() {
                    Some(value) => {
                        let value_u64_result = value.to_string().parse::<u64>();

                        match value_u64_result {
                            Ok(value_u64) => Ok(value_u64),
                            Err(_) => Err(CdkActTryFromVmValueError("Could not parse bigint to u64".to_string()))
                        }
                    },
                    None => Err(CdkActTryFromVmValueError("JsValue is not a bigint".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<u32, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<u32, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as u32),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<u16, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<u16, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as u16),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<u8, &mut boa_engine::Context<'_>> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<u8, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as u8),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }
    }
}
