use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn serialize_js_function_object(
            js_value: &boa_engine::JsValue,
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            colorize: bool,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            try_serialize_js_function_object(js_value, js_object, nesting_level, colorize, context)
                .map_err(|cause| {
                    "Encountered an error while serializing a Function".to_js_error(Some(cause))
                })
        }

        fn try_serialize_js_function_object(
            js_value: &boa_engine::JsValue,
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            colorize: bool,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            let name_js_value = js_object.get("name", context)?;
            let name: String = name_js_value.try_from_vm_value(context)?;

            let output = if name.is_empty() {
                "[Function (anonymous)]".to_string()
            } else {
                format!("[Function {name}]")
            };


            Ok(if colorize {
                output.cyan()
            } else {
                output
            })
        }
    }
}
