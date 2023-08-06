use proc_macro2::TokenStream;
use quote::quote;

mod error;
mod promise;

pub fn generate() -> TokenStream {
    let js_error_object_to_string_function_definition = error::generate();
    let js_promise_object_to_string_function_definition = promise::generate();

    quote! {
        fn js_object_to_string(
            error_value: &boa_engine::JsValue,
            js_object: &boa_engine::JsObject,
            context: &mut boa_engine::Context,
        ) -> String {
            if js_object.is_error() {
                return js_error_object_to_string(js_object, context);
            }

            if js_object.is_promise() {
                return js_promise_object_to_string(js_object, context);
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

        #js_error_object_to_string_function_definition
        #js_promise_object_to_string_function_definition
    }
}
