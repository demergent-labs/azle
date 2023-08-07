use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn js_array_object_to_string(
            js_object: &boa_engine::JsObject,
            context: &mut boa_engine::Context,
        ) -> String {
            try_js_array_object_to_string(js_object, context).unwrap_or_else(|js_error| {
                let cause = js_error.to_std_string(&mut *context);

                format!(
                    "InternalError: Encountered an error while serializing an array\n  \
                        [cause]: {cause}"
                )
            })
        }

        fn try_js_array_object_to_string(
            js_object: &boa_engine::JsObject,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            let length = js_object.get_length(context)?;

            let item_strings: Vec<String> = (0..length)
                .map(|index| -> Result<String, boa_engine::JsError> {
                    let js_value = js_object.get(index, context)?;

                    Ok(js_value.to_std_string(context))
                })
                .collect::<Result<Vec<_>, _>>()?;

            let single_line_representation = format!("[ {} ]", item_strings.join(", "));

            const MAX_LINE_LENGTH: usize = 72;

            if single_line_representation.len() < MAX_LINE_LENGTH {
                Ok(single_line_representation)
            } else {
                // TODO: Note that this indentation will not be nice if there
                // are multiple levels of nesting.
                Ok(format!("[\n  {}\n]", item_strings.join(",\n  ")))
            }
        }
    }
}
