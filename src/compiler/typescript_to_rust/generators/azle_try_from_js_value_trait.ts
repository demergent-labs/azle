import { Rust } from '../../../types';

export function generateAzleTryFromJsValueTrait(): Rust {
    return `
        pub trait AzleTryFromJsValue<T> {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<T, TryFromJsValueError>;
        }
        
        impl AzleTryFromJsValue<bool> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<bool, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        impl AzleTryFromJsValue<f64> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<f64, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        impl AzleTryFromJsValue<f32> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<f32, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        impl AzleTryFromJsValue<i128> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<i128, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        impl AzleTryFromJsValue<i64> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<i64, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        impl AzleTryFromJsValue<i32> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<i32, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        impl AzleTryFromJsValue<i16> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<i16, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        impl AzleTryFromJsValue<i8> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<i8, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        impl<T> AzleTryFromJsValue<Option<T>> for boa_engine::JsValue where boa_engine::JsValue: TryFromJsValue<Option<T>> {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Option<T>, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        impl AzleTryFromJsValue<String> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<String, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        impl AzleTryFromJsValue<u128> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<u128, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        impl AzleTryFromJsValue<u64> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<u64, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        impl AzleTryFromJsValue<u32> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<u32, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        impl AzleTryFromJsValue<u16> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<u16, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        impl AzleTryFromJsValue<u8> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<u8, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        // TODO consider that each type might need its own explicit impl for Vec
        // TODO the derive attribute might need to be used in that case
        impl<T> AzleTryFromJsValue<Vec<T>> for boa_engine::JsValue where boa_engine::JsValue: TryFromJsValue<Vec<T>> {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<T>, TryFromJsValueError> {
                self.try_from_js_value(context)
            }
        }
        
        impl AzleTryFromJsValue<ic_cdk::export::Principal> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, _: &mut boa_engine::Context) -> Result<ic_cdk::export::Principal, TryFromJsValueError> {
                match self.as_string() {
                    Some(value) => Ok(ic_cdk::export::Principal::from_text(value.to_string()).unwrap()),
                    None => Err(TryFromJsValueError("JsValue is not a string".to_string()))
                }
            }
        }
        
        // TODO it would probably be better to get the BigInt out of the JsValue and convert it more directly
        // TODO but we might run into problems with Nat and BigUint, thus I am doing a string conversion for now
        impl AzleTryFromJsValue<ic_cdk::export::candid::Int> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, _: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Int, TryFromJsValueError> {
                match self.as_bigint() {
                    Some(value) => Ok(ic_cdk::export::candid::Int::from_str(&value.to_string()).unwrap()), // TODO probably not the best conversion
                    None => Err(TryFromJsValueError("JsValue is not a bigint".to_string()))
                }
            }
        }
        
        impl AzleTryFromJsValue<ic_cdk::export::candid::Nat> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, _: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Nat, TryFromJsValueError> {
                match self.as_bigint() {
                    Some(value) => Ok(ic_cdk::export::candid::Nat::from_str(&value.to_string()).unwrap()), // TODO probably not the best conversion
                    None => Err(TryFromJsValueError("JsValue is not a bigint".to_string()))
                }
            }
        }
    `;
}