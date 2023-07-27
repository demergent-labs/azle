use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn unwrap_or_trap<SuccessValue, Callback>(callback: Callback) -> SuccessValue
        where
            Callback: FnOnce() -> Result<SuccessValue, RuntimeError>,
        {
            callback()
                .unwrap_or_else(|err| ic_cdk::api::trap(&format!("\nUncaught {}", err.to_string())))
        }

        pub trait UnwrapJsResultOrTrap {
            fn unwrap_or_trap(self, context: &mut boa_engine::Context) -> boa_engine::JsValue;
        }

        impl UnwrapJsResultOrTrap for boa_engine::JsResult<boa_engine::JsValue> {
            fn unwrap_or_trap(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                match self {
                    Ok(js_value) => js_value,
                    Err(js_error) => {
                        let error_message = js_error.to_std_string(context);

                        ic_cdk::api::trap(&format!("\nUncaught {error_message}"));
                    }
                }
            }
        }

        impl UnwrapJsResultOrTrap for Result<boa_engine::JsValue, String> {
            fn unwrap_or_trap(self, context: &mut boa_engine::Context) -> boa_engine::JsValue {
                match self {
                    Ok(js_value) => js_value,
                    Err(error_string) => {
                        ic_cdk::api::trap(&format!("\nUncaught {error_string}"));
                    }
                }
            }
        }

        pub trait UnwrapOrTrapWithMessage<T> {
            fn unwrap_or_trap(self, err_message: &str) -> T;
        }

        impl<T> UnwrapOrTrapWithMessage<T> for Option<T> {
            fn unwrap_or_trap(self, err_message: &str) -> T {
                match self {
                    Some(some) => some,
                    None => ic_cdk::trap(&format!("\nUncaught {err_message}")),
                }
            }
        }

        trait ToStdString {
            fn to_std_string(self, context: &mut boa_engine::Context) -> String;
        }

        impl ToStdString for boa_engine::JsError {
            fn to_std_string(self, context: &mut boa_engine::Context) -> String {
                self.to_opaque(context).to_std_string(context)
            }
        }

        impl ToStdString for boa_engine::JsValue {
            fn to_std_string(self, context: &mut boa_engine::Context) -> String {
                match &self {
                    boa_engine::JsValue::BigInt(bigint) => bigint.to_string(),
                    boa_engine::JsValue::Boolean(boolean) => boolean.to_string(),
                    boa_engine::JsValue::Integer(integer) => integer.to_string(),
                    boa_engine::JsValue::Null => "null".to_string(),
                    boa_engine::JsValue::Object(object) => {
                        js_object_to_string(&self, &object, context)
                    }
                    boa_engine::JsValue::Rational(rational) => rational.to_string(),
                    boa_engine::JsValue::String(string) => string
                        .to_std_string()
                        .unwrap_or_else(|err| format!("InternalError: {err}")),
                    boa_engine::JsValue::Symbol(symbol) => symbol.to_string(),
                    boa_engine::JsValue::Undefined => "undefined".to_string(),
                }
            }
        }

        fn js_object_to_string(
            error_value: &boa_engine::JsValue,
            js_object: &boa_engine::JsObject,
            context: &mut boa_engine::Context,
        ) -> String {
            if js_object.is_error() {
                return js_error_object_to_string(js_object, context);
            }

            let to_string_js_value = match js_object.get("toString", context) {
                Ok(to_string_js_value) => to_string_js_value,
                Err(err) => {
                    return "TypeError: Property 'toString' of object is not a function".to_string()
                }
            };

            let to_string_js_object = match to_string_js_value.as_object() {
                Some(to_string_js_object) => to_string_js_object,
                None => {
                    return "TypeError: Property 'toString' of object is not a function".to_string()
                }
            };

            let string_js_value = match to_string_js_object.call(error_value, &[], context) {
                Ok(string_js_value) => string_js_value,
                Err(js_error) => return format!("InternalError: {js_error}"),
            };

            string_js_value
                .try_from_vm_value(context)
                .unwrap_or_else(|js_error| format!("InternalError: {js_error}"))
        }

        fn js_error_object_to_string(
            js_object: &boa_engine::JsObject,
            context: &mut boa_engine::Context,
        ) -> String {
            try_js_error_object_to_string(js_object, context).unwrap_or_else(|js_error| {
                let cause = js_error.to_std_string(&mut *context);

                format!(
                    "InternalError: Encountered an error while serializing an error\n  \
                        [cause]: {cause}"
                )
            })
        }

        fn try_js_error_object_to_string(
            js_object: &boa_engine::JsObject,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            let error_name = get_js_error_name(js_object, context)?;
            let error_message = get_js_error_message(js_object, context)?;
            let cause_opt = get_js_error_cause(js_object, context)?;

            let error_string = match cause_opt {
                Some(cause) => format!(
                    "{error_name}: {error_message}\n  [cause]: {cause}"
                ),
                None => format!("{error_name}: {error_message}"),
            };

            Ok(error_string)
        }

        fn get_js_error_name(
            js_object: &boa_engine::JsObject,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            match js_object.prototype() {
                Some(prototype_js_object) => prototype_js_object
                    .get("name", &mut *context)?
                    .try_from_vm_value(&mut *context),
                None => Ok("Error".to_string()),
            }
        }

        fn get_js_error_message(
            js_object: &boa_engine::JsObject,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            js_object
                .get("message", &mut *context)?
                .try_from_vm_value(&mut *context)
        }

        fn get_js_error_cause(
            js_object: &boa_engine::JsObject,
            context: &mut boa_engine::Context,
        ) -> Result<Option<String>, boa_engine::JsError> {
            match js_object.get("cause", &mut *context) {
                Ok(cause_js_value) => {
                    if cause_js_value.is_undefined() {
                        Ok(None)
                    } else {
                        Ok(Some(cause_js_value.to_std_string(&mut *context)))
                    }
                },
                Err(js_error) => Err(js_error),
            }
        }
    }
}
