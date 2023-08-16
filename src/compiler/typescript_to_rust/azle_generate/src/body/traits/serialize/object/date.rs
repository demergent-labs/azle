use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn serialize_js_date_object(
            js_value: &boa_engine::JsValue,
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            colorize: bool,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            try_serialize_js_date_object(js_value, js_object, nesting_level, colorize, context)
                .map_err(|cause| {
                    "Encountered an error while serializing a Date".to_js_error(Some(cause))
                })
        }

        fn try_serialize_js_date_object(
            js_value: &boa_engine::JsValue,
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            colorize: bool,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            let to_iso_string_js_value = js_object.get("toISOString", context)?;

            let to_iso_string_js_object = to_iso_string_js_value
                .as_object()
                .ok_or_else(|| "TypeError: toISOString is not a function".to_js_error(None))?;

            let date_iso_string_js_value = to_iso_string_js_object.call(&js_value, &[], context)?;

            let date_iso_string: String = date_iso_string_js_value.try_from_vm_value(context)?;

            Ok(if colorize {
                date_iso_string.magenta()
            } else {
                date_iso_string
            })
        }
    }
}
