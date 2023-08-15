use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn js_date_object_to_string(
            js_value: &boa_engine::JsValue,
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            context: &mut boa_engine::Context,
        ) -> String {
            try_js_date_object_to_string(js_value, js_object, nesting_level, context).unwrap_or_else(
                |js_error| {
                    let cause = js_error.to_std_string(0, &mut *context);

                    format!(
                        "InternalError: Encountered an error while serializing an array\n  \
                        [cause]: {cause}"
                    )
                },
            )
        }

        fn try_js_date_object_to_string(
            js_value: &boa_engine::JsValue,
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            let to_iso_string_js_value = js_object.get("toISOString", context)?;

            let to_iso_string_js_value_js_object = to_iso_string_js_value
                .as_object()
                .ok_or_else(|| "TypeError: toISOString is not a function".to_js_error(None))?;

            let date_iso_string_js_value = to_iso_string_js_value_js_object.call(
                &js_value,
                &[],
                context,
            )?;

            let date_iso_string: String = date_iso_string_js_value.try_from_vm_value(context)?;

            Ok(date_iso_string.magenta())
        }
    }
}
