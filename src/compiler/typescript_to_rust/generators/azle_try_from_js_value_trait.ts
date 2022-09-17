import { Rust } from '../../../types';

export function generateAzleTryFromJsValueTrait(): Rust {
    return /* rust */ `
        #[derive(Debug)]
        pub struct AzleTryFromJsValueError(pub String);

        pub trait AzleTryFromJsValue<T> {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<T, AzleTryFromJsValueError>;
        }

        // Basic types

        impl AzleTryFromJsValue<()> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<(), AzleTryFromJsValueError> {
                if self.is_null() == true {
                    Ok(())
                }
                else {
                    Err(AzleTryFromJsValueError("JsValue is not null".to_string()))
                }
            }
        }

        impl AzleTryFromJsValue<bool> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<bool, AzleTryFromJsValueError> {
                match self.as_boolean() {
                    Some(value) => Ok(value),
                    None => Err(AzleTryFromJsValueError("JsValue is not a boolean".to_string()))
                }
            }
        }

        impl AzleTryFromJsValue<String> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<String, AzleTryFromJsValueError> {
                match self.as_string() {
                    Some(value) => Ok(value.to_string()),
                    None => Err(AzleTryFromJsValueError("JsValue is not a string".to_string()))
                }
            }
        }

        impl AzleTryFromJsValue<ic_cdk::export::candid::Empty> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Empty, AzleTryFromJsValueError> {
                panic!("JsValue cannot be converted into Empty");
            }
        }

        impl AzleTryFromJsValue<ic_cdk::export::candid::Reserved> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Reserved, AzleTryFromJsValueError> {
                Ok(ic_cdk::export::candid::Reserved)
            }
        }

        impl AzleTryFromJsValue<ic_cdk::export::candid::Func> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Func, AzleTryFromJsValueError> {
                match self.as_object() {
                    Some(js_object) => {
                        match (js_object.get("0", context), js_object.get("1", context)) {
                            (Ok(principal_js_value), Ok(canister_method_text)) => {
                                match (principal_js_value.azle_try_from_js_value(context), canister_method_text.as_string()) {
                                    (Ok(principal), Some(canister_method_string)) => {
                                        Ok(ic_cdk::export::candid::Func {
                                            principal,
                                            method: canister_method_string.to_string()
                                        })
                                    },
                                    _ => Err(AzleTryFromJsValueError("principal could not be created or canister method not a string".to_string()))
                                }
                            },
                            _ => Err(AzleTryFromJsValueError("Could not retrieve index 0 or 1".to_string()))
                        }

                    },
                    None => Err(AzleTryFromJsValueError("JsValue is not an object".to_string()))
                }
            }
        }

        impl AzleTryFromJsValue<ic_cdk::export::Principal> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::Principal, AzleTryFromJsValueError> {
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
                                                        match ic_cdk::export::Principal::from_text(principal_js_string.to_string()) {
                                                            Ok(principal) => Ok(principal),
                                                            Err(err) => Err(AzleTryFromJsValueError(err.to_string()))
                                                        }
                                                    },
                                                    None => Err(AzleTryFromJsValueError("JsValue is not a string".to_string()))
                                                }
                                            },
                                            Err(err_js_value) => {
                                                let err_js_object = err_js_value.as_object().unwrap();

                                                let err_name_js_value = err_js_object.get("name", context).unwrap();
                                                let err_message_js_value = err_js_object.get("message", context).unwrap();

                                                Err(AzleTryFromJsValueError(format!(
                                                    "{name}: {message}",
                                                    name = err_name_js_value.as_string().unwrap().to_string(),
                                                    message = err_message_js_value.as_string().unwrap().to_string()
                                                )))
                                            }
                                        }
                                    },
                                    None => Err(AzleTryFromJsValueError("JsValue is not an object".to_string()))
                                }
                            },
                            Err(err) => Err(AzleTryFromJsValueError("principal_js_object.get(\\"toText\\", context) failed".to_string()))
                        }
                    },
                    None => Err(AzleTryFromJsValueError("JsValue is not an object".to_string()))
                }
            }
        }

        // Number types

        impl AzleTryFromJsValue<f64> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<f64, AzleTryFromJsValueError> {
                match self.as_number() {
                    Some(value) => Ok(value),
                    None => Err(AzleTryFromJsValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl AzleTryFromJsValue<f32> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<f32, AzleTryFromJsValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as f32),
                    None => Err(AzleTryFromJsValueError("JsValue is not a number".to_string()))
                }
            }
        }

        // TODO it would probably be better to get the BigInt out of the JsValue and convert it more directly
        // TODO but we might run into problems with Nat and BigUint, thus I am doing a string conversion for now
        impl AzleTryFromJsValue<ic_cdk::export::candid::Int> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, _: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Int, AzleTryFromJsValueError> {
                match self.as_bigint() {
                    Some(value) => Ok(ic_cdk::export::candid::Int::from_str(&value.to_string()).unwrap()), // TODO probably not the best conversion
                    None => Err(AzleTryFromJsValueError("JsValue is not a bigint".to_string()))
                }
            }
        }

        impl AzleTryFromJsValue<i128> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<i128, AzleTryFromJsValueError> {
                match self.as_bigint() {
                    Some(value) => {
                        let value_i128_result = value.to_string().parse::<i128>();

                        match value_i128_result {
                            Ok(value_i128) => Ok(value_i128),
                            Err(_) => Err(AzleTryFromJsValueError("Could not parse bigint to i128".to_string()))
                        }
                    },
                    None => Err(AzleTryFromJsValueError("JsValue is not a bigint".to_string()))
                }
            }
        }

        // TODO this might break since i64 may (will) not be a bigint
        // TODO probably need to implement my own conversion here until try_from_js_value is fixed
        impl AzleTryFromJsValue<i64> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<i64, AzleTryFromJsValueError> {
                match self.as_bigint() {
                    Some(value) => {
                        let value_i64_result = value.to_string().parse::<i64>();

                        match value_i64_result {
                            Ok(value_i64) => Ok(value_i64),
                            Err(_) => Err(AzleTryFromJsValueError("Could not parse bigint to i64".to_string()))
                        }
                    },
                    None => Err(AzleTryFromJsValueError("JsValue is not a bigint".to_string()))
                }
            }
        }

        impl AzleTryFromJsValue<i32> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<i32, AzleTryFromJsValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as i32),
                    None => Err(AzleTryFromJsValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl AzleTryFromJsValue<i16> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<i16, AzleTryFromJsValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as i16),
                    None => Err(AzleTryFromJsValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl AzleTryFromJsValue<i8> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<i8, AzleTryFromJsValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as i8),
                    None => Err(AzleTryFromJsValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl AzleTryFromJsValue<ic_cdk::export::candid::Nat> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, _: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Nat, AzleTryFromJsValueError> {
                match self.as_bigint() {
                    Some(value) => Ok(ic_cdk::export::candid::Nat::from_str(&value.to_string()).unwrap()), // TODO probably not the best conversion
                    None => Err(AzleTryFromJsValueError("JsValue is not a bigint".to_string()))
                }
            }
        }

        impl AzleTryFromJsValue<u128> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<u128, AzleTryFromJsValueError> {
                match self.as_bigint() {
                    Some(value) => {
                        let value_u128_result = value.to_string().parse::<u128>();

                        match value_u128_result {
                            Ok(value_u128) => Ok(value_u128),
                            Err(_) => Err(AzleTryFromJsValueError("Could not parse bigint to u128".to_string()))
                        }
                    },
                    None => Err(AzleTryFromJsValueError("JsValue is not a bigint".to_string()))
                }
            }
        }

        // TODO this might break since i64 may (will) not be a bigint
        // TODO probably need to implement my own conversion here until try_from_js_value is fixed
        impl AzleTryFromJsValue<u64> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<u64, AzleTryFromJsValueError> {
                match self.as_bigint() {
                    Some(value) => {
                        let value_u64_result = value.to_string().parse::<u64>();

                        match value_u64_result {
                            Ok(value_u64) => Ok(value_u64),
                            Err(_) => Err(AzleTryFromJsValueError("Could not parse bigint to u64".to_string()))
                        }
                    },
                    None => Err(AzleTryFromJsValueError("JsValue is not a bigint".to_string()))
                }
            }
        }

        impl AzleTryFromJsValue<u32> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<u32, AzleTryFromJsValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as u32),
                    None => Err(AzleTryFromJsValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl AzleTryFromJsValue<u16> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<u16, AzleTryFromJsValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as u16),
                    None => Err(AzleTryFromJsValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl AzleTryFromJsValue<u8> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<u8, AzleTryFromJsValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as u8),
                    None => Err(AzleTryFromJsValueError("JsValue is not a number".to_string()))
                }
            }
        }

        // Generic types

        impl<T> AzleTryFromJsValue<Box<T>> for boa_engine::JsValue where boa_engine::JsValue: AzleTryFromJsValue<T> {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Box<T>, AzleTryFromJsValueError> {
                match self.azle_try_from_js_value(context) {
                    Ok(value) => Ok(Box::new(value)),
                    Err(err) => Err(err)
                }
            }
        }

        impl<T> AzleTryFromJsValue<Option<T>> for boa_engine::JsValue where boa_engine::JsValue: AzleTryFromJsValue<T> {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Option<T>, AzleTryFromJsValueError> {
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

        // Vec types

        impl AzleTryFromJsValue<Vec<()>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<()>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<bool>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<bool>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<String>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<String>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<ic_cdk::export::candid::Empty>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<ic_cdk::export::candid::Empty>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<ic_cdk::export::candid::Reserved>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<ic_cdk::export::candid::Reserved>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<ic_cdk::export::candid::Func>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<ic_cdk::export::candid::Func>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<ic_cdk::export::Principal>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<ic_cdk::export::Principal>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<f64>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<f64>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<f32>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<f32>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<ic_cdk::export::candid::Int>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<ic_cdk::export::candid::Int>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<i128>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<i128>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<i64>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<i64>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<i32>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<i32>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<i16>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<i16>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<i8>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<i8>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<ic_cdk::export::candid::Nat>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<ic_cdk::export::candid::Nat>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<u128>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<u128>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<u64>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<u64>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<u32>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<u32>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<u16>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<u16>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<Vec<u8>>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<Vec<u8>>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array(self, context)
            }
        }

        impl AzleTryFromJsValue<Vec<u8>> for boa_engine::JsValue {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<u8>, AzleTryFromJsValueError> {
                Ok(
                    self
                        .as_object()
                        .unwrap()
                        .borrow()
                        .as_typed_array()
                        .unwrap()
                        .viewed_array_buffer()
                        .unwrap()
                        .borrow()
                        .as_array_buffer()
                        .unwrap()
                        .array_buffer_data
                        .clone()
                        .unwrap()
                )
            }
        }

        impl<T> AzleTryFromJsValue<Vec<Box<T>>> for boa_engine::JsValue where boa_engine::JsValue: AzleTryFromJsValue<T> {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<Box<T>>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array::<Box<T>>(self, context)
            }
        }

        impl<T> AzleTryFromJsValue<Vec<Option<T>>> for boa_engine::JsValue where boa_engine::JsValue: AzleTryFromJsValue<T> {
            fn azle_try_from_js_value(self, context: &mut boa_engine::Context) -> Result<Vec<Option<T>>, AzleTryFromJsValueError> {
                azle_try_from_js_value_generic_array::<Option<T>>(self, context)
            }
        }

        // TODO this seems like such a messy and inefficient way to do it
        fn azle_try_from_js_value_generic_array<T>(js_value: boa_engine::JsValue, context: &mut boa_engine::Context) -> Result<Vec<T>, AzleTryFromJsValueError> where boa_engine::JsValue: AzleTryFromJsValue<T> {
            match js_value.as_object() {
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
                                    return Err(AzleTryFromJsValueError("Item at array index does not exist".to_string()))
                                }
                            }
                        }

                        Ok(result)
                    }
                    else {
                        Err(AzleTryFromJsValueError("JsObject is not an array".to_string()))
                    }
                },
                None => Err(AzleTryFromJsValueError("JsValue is not an object".to_string()))
            }
        }
    `;
}
