use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn js_array_object_to_string(
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            try_js_array_object_to_string(js_object, nesting_level, context).map_err(
                |cause| {
                    "Encountered an error while serializing an Array".to_js_error(Some(cause))
                },
            )
        }

        fn try_js_array_object_to_string(
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            let length = js_object.get_length(context)?;

            let item_strings: Vec<String> = (0..length)
                .map(|index| -> Result<String, boa_engine::JsError> {
                    let js_value = js_object.get(index, context)?;

                    js_value.to_std_string(nesting_level + 1, context)
                })
                .collect::<Result<Vec<_>, _>>()?;

            let single_line_representation = format!("[{}]", item_strings.join(", "));

            const MAX_LINE_LENGTH: usize = 72;

            if single_line_representation.len() < MAX_LINE_LENGTH {
                Ok(single_line_representation)
            } else {
                let indent_chars = "  ";
                let indent = indent_chars.repeat(nesting_level);
                let item_indent = indent_chars.repeat(nesting_level + 1);
                let separator = format!(",\n{item_indent}");

                Ok(format!(
                    "[\n{item_indent}{}\n{indent}]",
                    item_strings.join(separator.as_str())
                ))
            }
        }
    }
}
