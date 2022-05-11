import { Rust } from '../../../types';

export function generateAzleTryFromJsValueTrait(): Rust {
    return `
        // TODO I feel like we should make AzleTryFromJsValueError
        pub trait AzleTryFromJsValue<T> {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<T, TryFromJsValueError>;
        }

        // TODO not sure but I think this is correct
        impl AzleTryFromJsValue<()> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<(), TryFromJsValueError> {
                Ok(())
            }
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
        
        // TODO probably need to implement my own conversion here until try_from_js_value is fixed
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
        
        // TODO probably need to implement my own conversion here until try_from_js_value is fixed
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

        impl<T> AzleTryFromJsValue<Box<T>> for boa_engine::JsValue where boa_engine::JsValue: AzleTryFromJsValue<T> {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Box<T>, TryFromJsValueError> {
                match self.azle_try_from_js_value(context) {
                    Ok(value) => Ok(Box::new(value)),
                    Err(err) => Err(err)
                }
            }
        }

        impl<T> AzleTryFromJsValue<Option<T>> for boa_engine::JsValue where boa_engine::JsValue: AzleTryFromJsValue<T> {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Option<T>, TryFromJsValueError> {
                if self.is_null() {
                    Ok(None)
                }
                else {
                    match self.azle_try_from_js_value(context) {
                        Ok(value) => Ok(Some(value)),
                        Err(err) => Err(err)
                    }
                }
            }
        }

        impl AzleTryFromJsValue<ic_cdk::export::candid::Func> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Func, TryFromJsValueError> {
                match self.as_object() {
                    Some(js_object) => {
                        match (js_object.get("0", context), js_object.get("1", context)) {
                            (Ok(principal_text), Ok(canister_method_text)) => {
                                match (principal_text.as_string(), canister_method_text.as_string()) {
                                    (Some(principal_string), Some(canister_method_string)) => {
                                        match ic_cdk::export::Principal::from_text(principal_string) {
                                            Ok(principal) => {
                                                Ok(ic_cdk::export::candid::Func {
                                                    principal,
                                                    method: canister_method_string.to_string()
                                                })
                                            },
                                            _ => Err(TryFromJsValueError("Could not convert to principal".to_string()))
                                        }
                                    },
                                    _ => Err(TryFromJsValueError("principal or canister method not strings".to_string()))
                                }
                            },
                            _ => Err(TryFromJsValueError("Could not retrieve index 0 or 1".to_string()))
                        }

                    },
                    None => Err(TryFromJsValueError("JsValue is not an object".to_string()))
                }
            }
        }

        // TODO this seems like such a messy way to do it
        // TODO consider that each type might need its own explicit impl for Vec
        // TODO the derive attribute might need to be used in that case
        impl<T> AzleTryFromJsValue<Vec<T>> for boa_engine::JsValue where boa_engine::JsValue: AzleTryFromJsValue<T> {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<T>, TryFromJsValueError> {
                match self.as_object() {
                    Some(js_object) => {
                        if js_object.is_array() {
                            let mut processing: bool = true;
                            let mut index: usize = 0;
                
                            let mut result = vec![];
                
                            while processing == true {
                                match js_object.get(index, context) {
                                    Ok(js_value) => {
                                        if js_value.is_undefined() {
                                            processing = false;
                                        }
                                        else {
                                            match js_value.azle_try_from_js_value(context) {
                                                Ok(value) => {
                                                    result.push(value);
                                                    index += 1;
                                                }
                                                Err(err) => {
                                                    return Err(err);
                                                }
                                            }
                                        }
                                    },
                                    Err(_) => {
                                        return Err(TryFromJsValueError("Item at array index does not exist".to_string()))
                                    }
                                }
                            }
                
                            Ok(result)
                        }
                        else {
                            Err(TryFromJsValueError("JsObject is not an array".to_string()))
                        }
                    },
                    None => Err(TryFromJsValueError("JsValue is not an object".to_string()))
                }
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