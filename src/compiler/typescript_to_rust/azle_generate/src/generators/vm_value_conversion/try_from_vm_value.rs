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
                    Some(value) => Ok(value.to_string()),
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
                                match (principal_js_value.try_from_vm_value(context), canister_method_text.as_string()) {
                                    (Ok(principal), Some(canister_method_string)) => {
                                        Ok(ic_cdk::export::candid::Func {
                                            principal,
                                            method: canister_method_string.to_string()
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
                                                        match ic_cdk::export::Principal::from_text(principal_js_string.to_string()) {
                                                            Ok(principal) => Ok(principal),
                                                            Err(err) => Err(CdkActTryFromVmValueError(err.to_string()))
                                                        }
                                                    },
                                                    None => Err(CdkActTryFromVmValueError("JsValue is not a string".to_string()))
                                                }
                                            },
                                            Err(err_js_value) => {
                                                let err_js_object = err_js_value.as_object().unwrap();

                                                let err_name_js_value = err_js_object.get("name", context).unwrap();
                                                let err_message_js_value = err_js_object.get("message", context).unwrap();

                                                Err(CdkActTryFromVmValueError(format!(
                                                    "{name}: {message}",
                                                    name = err_name_js_value.as_string().unwrap().to_string(),
                                                    message = err_message_js_value.as_string().unwrap().to_string()
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
                // TODO why is Boa not treating these values as arrays?
                // TODO A 1-tuple is a single-element array
                // TODO see here: https://github.com/demergent-labs/azle/issues/760
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

        impl CdkActTryFromVmValue<Vec<()>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<()>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<bool>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<bool>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<String>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<String>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<ic_cdk::export::candid::Empty>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<ic_cdk::export::candid::Empty>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<ic_cdk::export::candid::Reserved>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<ic_cdk::export::candid::Reserved>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<ic_cdk::export::candid::Func>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<ic_cdk::export::candid::Func>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<ic_cdk::export::Principal>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<ic_cdk::export::Principal>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<f64>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<f64>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<f32>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<f32>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<ic_cdk::export::candid::Int>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<ic_cdk::export::candid::Int>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<i128>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<i128>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<i64>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<i64>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<i32>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<i32>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<i16>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<i16>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<i8>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<i8>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<ic_cdk::export::candid::Nat>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<ic_cdk::export::candid::Nat>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<u128>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<u128>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<u64>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<u64>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<u32>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<u32>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl CdkActTryFromVmValue<Vec<u16>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<u16>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
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

        // TODO consider creating a macro that can derive Vec of Vec multiple levels deep for any type
        impl CdkActTryFromVmValue<Vec<Vec<u8>>, &mut boa_engine::Context> for boa_engine::JsValue {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<Vec<u8>>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array(self, context)
            }
        }

        impl<T> CdkActTryFromVmValue<Vec<Box<T>>, &mut boa_engine::Context> for boa_engine::JsValue
        where
            boa_engine::JsValue: for<'a> CdkActTryFromVmValue<T, &'a mut boa_engine::Context>
        {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<Box<T>>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array::<Box<T>>(self, context)
            }
        }

        impl<T> CdkActTryFromVmValue<Vec<Option<T>>, &mut boa_engine::Context> for boa_engine::JsValue
        where
            boa_engine::JsValue: for<'a> CdkActTryFromVmValue<T, &'a mut boa_engine::Context>
        {
            fn try_from_vm_value(self, context: &mut boa_engine::Context) -> Result<Vec<Option<T>>, CdkActTryFromVmValueError> {
                try_from_vm_value_generic_array::<Option<T>>(self, context)
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
