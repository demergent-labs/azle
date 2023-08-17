pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn serialize_regexp_object(
            js_value: &boa_engine::JsValue,
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            colorize: bool,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            try_serialize_regexp_object(js_value, js_object, nesting_level, colorize, context)
                .map_err(|cause| {
                    "Encountered an error while serializing a RegExp".to_js_error(Some(cause))
                })
        }

        fn try_serialize_regexp_object(
            js_value: &boa_engine::JsValue,
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            colorize: bool,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            let to_string_js_value = js_object.get("toString", context)?;

            let to_string_js_object = to_string_js_value.as_object().ok_or_else(|| {
                "TypeError: Property 'toString' of object is not a function".to_js_error(None)
            })?;

            let regexp: String = to_string_js_object
                .call(js_value, &[], context)?
                .try_from_vm_value(context)?;

            Ok(if colorize { regexp.red() } else { regexp })
        }
    }
}
