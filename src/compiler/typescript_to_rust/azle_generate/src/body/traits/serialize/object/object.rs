pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn try_serialize_regular_js_object(
            js_value: &boa_engine::JsValue,
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            colorize: bool,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            let property_names_array_js_value =
                boa_engine::builtins::object::Object::get_own_property_names(
                    &boa_engine::JsValue::undefined(),
                    &[js_value.clone()],
                    context,
                )?;

            let property_names: Vec<String> =
                property_names_array_js_value.try_from_vm_value(&mut *context)?;

            let property_strings: Vec<String> = property_names
                .iter()
                .map(|property_name| -> Result<String, boa_engine::JsError> {
                    let property_js_value = js_object.get(property_name.as_str(), &mut *context)?;

                    let property_value_string_representation =
                        property_js_value.serialize(nesting_level + 1, colorize, &mut *context)?;

                    Ok(format!(
                        "{property_name}: {property_value_string_representation}"
                    ))
                })
                .collect::<Result<Vec<_>, _>>()?;

            let single_line_representation = format!("{{ {} }}", property_strings.join(", "));

            const MAX_LINE_LENGTH: usize = 72;

            if single_line_representation.len() < MAX_LINE_LENGTH {
                Ok(single_line_representation)
            } else {
                let indent_chars = "  ";
                let indent = indent_chars.repeat(nesting_level);
                let item_indent = indent_chars.repeat(nesting_level + 1);
                let separator = format!(",\n{item_indent}");

                Ok(format!(
                    "{{\n{item_indent}{}\n{indent}}}",
                    property_strings.join(separator.as_str())
                ))
            }
        }
    }
}
