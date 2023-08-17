use proc_macro2::TokenStream;
use quote::quote;

mod array;
mod date;
mod error;
mod function;
mod object;
mod promise;

pub fn generate() -> TokenStream {
    let serialize_js_array_object_function_definition = array::generate();
    let serialize_js_date_object_function_definition = date::generate();
    let serialize_js_error_object_function_definition = error::generate();
    let serialize_js_function_object_function_definition = function::generate();
    let try_serialize_regular_js_object_function_definition = object::generate();
    let serialize_js_promise_object_function_definition = promise::generate();

    quote! {
        fn serialize_js_object(
            js_value: &boa_engine::JsValue,
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            colorize: bool,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            if js_object.is_array() {
                return serialize_js_array_object(js_object, nesting_level, colorize, context);
            }

            if js_object.is_error() {
                return serialize_js_error_object(js_object, nesting_level, colorize, context);
            }

            if js_object.is_function() {
                return serialize_js_function_object(js_value, js_object, nesting_level, colorize, context);
            }

            if js_object.is_promise() {
                return serialize_js_promise_object(js_object, nesting_level, colorize, context);
            }

            if js_object.is_date() {
                return serialize_js_date_object(
                    js_value,
                    js_object,
                    nesting_level,
                    colorize,
                    context,
                );
            }

            try_serialize_regular_js_object(js_value, js_object, nesting_level, colorize, context)
                .map_err(|cause| {
                    "Encountered an error while serializing an Object".to_js_error(Some(cause))
                })
        }

        #serialize_js_array_object_function_definition
        #serialize_js_date_object_function_definition
        #serialize_js_error_object_function_definition
        #serialize_js_function_object_function_definition
        #try_serialize_regular_js_object_function_definition
        #serialize_js_promise_object_function_definition
    }
}
