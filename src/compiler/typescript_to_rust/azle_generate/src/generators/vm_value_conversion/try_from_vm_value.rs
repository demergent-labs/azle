pub fn generate_try_from_vm_value_impls() -> proc_macro2::TokenStream {
    quote::quote! {
        // Basic types

        // TODO This was changed to allow null or undefined JsValues, this should be thought through and tested
        impl CdkActTryFromVmValue<(), &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<(), CdkActTryFromVmValueError> {
                if self.is_null() == true || self.is_undefined() == true {
                    Ok(())
                }
                else {
                    Err(CdkActTryFromVmValueError("JsValue is not null or undefined".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<bool, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<bool, CdkActTryFromVmValueError> {
                match self.as_boolean() {
                    Some(value) => Ok(value),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a boolean".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<String, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<String, CdkActTryFromVmValueError> {
                match self.as_string() {
                    Some(value) => Ok(value.to_std_string().unwrap()),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a string".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::export::candid::Empty, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Empty, CdkActTryFromVmValueError> {
                panic!("JsValue cannot be converted into Empty");
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::export::candid::Reserved, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Reserved, CdkActTryFromVmValueError> {
                Ok(ic_cdk::export::candid::Reserved)
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::export::candid::Func, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Func, CdkActTryFromVmValueError> {
                match self.as_object() {
                    Some(js_object) => {
                        match (js_object.get("0", context), js_object.get("1", context)) {
                            (Ok(principal_js_value), Ok(canister_method_text)) => {
                                match (principal_js_value.try_from_vm_value(&mut *context), canister_method_text.try_from_vm_value(&mut *context)) {
                                    (Ok(principal), Ok(canister_method_string)) => {
                                        Ok(ic_cdk::export::candid::Func {
                                            principal,
                                            method: canister_method_string
                                        })
                                    },
                                    _ => Err(CdkActTryFromVmValueError("principal could not be created or canister method not a string".to_string()))
                                }
                            },
                            _ => Err(CdkActTryFromVmValueError("Could not retrieve index 0 or 1".to_string()))
                        }

                    },
                    None => Err(CdkActTryFromVmValueError("JsValue is not an object".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::export::Principal, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::Principal, CdkActTryFromVmValueError> {
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
                                                        match ic_cdk::export::Principal::from_text(principal_js_string.to_std_string().unwrap()) {
                                                            Ok(principal) => Ok(principal),
                                                            Err(err) => Err(CdkActTryFromVmValueError(err.to_string()))
                                                        }
                                                    },
                                                    None => Err(CdkActTryFromVmValueError("JsValue is not a string".to_string()))
                                                }
                                            },
                                            Err(err_js_error) => {
                                                let err_js_value = err_js_error.to_opaque(context);
                                                let err_js_object = err_js_value.as_object().unwrap();

                                                let err_name: String = err_js_object.get("name", &mut *context).unwrap().try_from_vm_value(&mut * context).unwrap();
                                                let err_message: String = err_js_object.get("message", &mut *context).unwrap().try_from_vm_value(&mut *context).unwrap();

                                                Err(CdkActTryFromVmValueError(format!(
                                                    "{name}: {message}",
                                                    name = err_name,
                                                    message = err_message
                                                )))
                                            }
                                        }
                                    },
                                    None => Err(CdkActTryFromVmValueError("JsValue is not an object".to_string()))
                                }
                            },
                            Err(err) => Err(CdkActTryFromVmValueError("principal_js_object.get(\"toText\", context) failed".to_string()))
                        }
                    },
                    None => Err(CdkActTryFromVmValueError("JsValue is not an object".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::timer::TimerId, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::timer::TimerId, CdkActTryFromVmValueError> {
                let js_value_as_u64: u64 = self.try_from_vm_value(context).unwrap();
                Ok(ic_cdk::timer::TimerId::from(slotmap::KeyData::from_ffi(js_value_as_u64)))
            }
        }

        // Number types

        impl CdkActTryFromVmValue<f64, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<f64, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<f32, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<f32, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as f32),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        // TODO it would probably be better to get the BigInt out of the JsValue and convert it more directly
        // TODO but we might run into problems with Nat and BigUint, thus I am doing a string conversion for now
        impl CdkActTryFromVmValue<ic_cdk::export::candid::Int, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Int, CdkActTryFromVmValueError> {
                match self.as_bigint() {
                    Some(value) => Ok(ic_cdk::export::candid::Int::from_str(&value.to_string()).unwrap()), // TODO probably not the best conversion
                    None => Err(CdkActTryFromVmValueError("JsValue is not a bigint".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<i128, &mut boa_engine::Context> for boa_engine::JsValue {
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
        impl CdkActTryFromVmValue<i64, &mut boa_engine::Context> for boa_engine::JsValue {
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

        impl CdkActTryFromVmValue<i32, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<i32, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as i32),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<i16, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<i16, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as i16),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<i8, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<i8, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as i8),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<ic_cdk::export::candid::Nat, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<ic_cdk::export::candid::Nat, CdkActTryFromVmValueError> {
                match self.as_bigint() {
                    Some(value) => Ok(ic_cdk::export::candid::Nat::from_str(&value.to_string()).unwrap()), // TODO probably not the best conversion
                    None => Err(CdkActTryFromVmValueError("JsValue is not a bigint".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<u128, &mut boa_engine::Context> for boa_engine::JsValue {
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
        impl CdkActTryFromVmValue<u64, &mut boa_engine::Context> for boa_engine::JsValue {
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

        impl CdkActTryFromVmValue<u32, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<u32, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as u32),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<u16, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<u16, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as u16),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        impl CdkActTryFromVmValue<u8, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<u8, CdkActTryFromVmValueError> {
                match self.as_number() {
                    Some(value) => Ok(value as u8),
                    None => Err(CdkActTryFromVmValueError("JsValue is not a number".to_string()))
                }
            }
        }

        // Generic types

        impl<T> CdkActTryFromVmValue<(T,), &mut boa_engine::Context> for boa_engine::JsValue
        where
            boa_engine::JsValue: for<'a> CdkActTryFromVmValue<T, &'a mut boa_engine::Context>
        {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<(T,), CdkActTryFromVmValueError> {
                Ok((self.try_from_vm_value(context).unwrap(),))
            }
        }

        impl<T> CdkActTryFromVmValue<Box<T>, &mut boa_engine::Context> for boa_engine::JsValue
        where
            boa_engine::JsValue: for<'a> CdkActTryFromVmValue<T, &'a mut boa_engine::Context>
        {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Box<T>, CdkActTryFromVmValueError> {
                match self.try_from_vm_value(context) {
                    Ok(value) => Ok(Box::new(value)),
                    Err(err) => Err(err)
                }
            }
        }

        impl<T> CdkActTryFromVmValue<Option<T>, &mut boa_engine::Context> for boa_engine::JsValue
        where
            boa_engine::JsValue: for<'a> CdkActTryFromVmValue<T, &'a mut boa_engine::Context>
        {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Option<T>, CdkActTryFromVmValueError> {
                if self.is_null() {
                    Ok(None)
                }
                else {
                    match self.try_from_vm_value(context) {
                        Ok(value) => Ok(Some(value)),
                        Err(err) => Err(err)
                    }
                }
            }
        }

        // Vec types
        trait AzleTryFromVec {}

        impl AzleTryFromVec for () {}

        impl AzleTryFromVec for bool {}

        impl AzleTryFromVec for String {}

        impl AzleTryFromVec for ic_cdk::export::candid::Empty {}

        impl AzleTryFromVec for ic_cdk::export::candid::Reserved {}

        impl AzleTryFromVec for ic_cdk::export::candid::Func {}

        impl AzleTryFromVec for ic_cdk::export::Principal {}

        impl AzleTryFromVec for ic_cdk::timer::TimerId {}

        impl AzleTryFromVec for f64 {}

        impl AzleTryFromVec for f32 {}

        impl AzleTryFromVec for ic_cdk::export::candid::Int {}

        impl AzleTryFromVec for i128 {}

        impl AzleTryFromVec for i64 {}

        impl AzleTryFromVec for i32 {}

        impl AzleTryFromVec for i16 {}

        impl AzleTryFromVec for i8 {}

        impl AzleTryFromVec for ic_cdk::export::candid::Nat {}

        impl AzleTryFromVec for u128 {}

        impl AzleTryFromVec for u64 {}

        impl AzleTryFromVec for u32 {}

        impl AzleTryFromVec for u16 {}

        impl<T> AzleTryFromVec for Option<T> {}

        impl<T> AzleTryFromVec for Vec<T> {}

        impl<T> CdkActTryFromVmValue<Vec<T>, &mut boa_engine::Context> for boa_engine::JsValue
        where
            T: AzleTryFromVec,
            boa_engine::JsValue: for<'a> CdkActTryFromVmValue<T, &'a mut boa_engine::Context>
        {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<T>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array::<T>(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<u8>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<u8>, CdkActTryFromVmValueError> {
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

        // TODO this seems like such a messy and inefficient way to do it
        fn try_from_vm_value_generic_array<T>(js_value: boa_engine::JsValue, context: &mut boa_engine::Context) -> Result<Vec<T>, CdkActTryFromVmValueError>
        where
            boa_engine::JsValue: for<'a> CdkActTryFromVmValue<T, &'a mut boa_engine::Context>
        {
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
                                        match js_value.try_from_vm_value(context) {
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
                                    return Err(CdkActTryFromVmValueError("Item at array index does not exist".to_string()))
                                }
                            }
                        }

                        Ok(result)
                    }
                    else {
                        Err(CdkActTryFromVmValueError("JsObject is not an array".to_string()))
                    }
                },
                None => Err(CdkActTryFromVmValueError("JsValue is not an object".to_string()))
            }
        }
    }
}
