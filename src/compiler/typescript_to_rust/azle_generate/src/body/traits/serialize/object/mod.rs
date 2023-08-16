use proc_macro2::TokenStream;
use quote::quote;

mod array;
mod date;
mod error;
mod function;
mod promise;

pub fn generate() -> TokenStream {
    let serialize_js_array_object_function_definition = array::generate();
    let serialize_js_date_object_function_definition = date::generate();
    let serialize_js_error_object_function_definition = error::generate();
    let serialize_js_function_object_function_definition = function::generate();
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

        fn try_serialize_regular_js_object(
            js_value: &boa_engine::JsValue,
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            colorize: bool,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            let own_property_names = boa_engine::builtins::object::Object::get_own_property_names(
                &boa_engine::JsValue::undefined(),
                &[js_value.clone()],
                context,
            );

            match own_property_names {
                Ok(property_names_array_js_value) => {
                    let property_names: Vec<String> =
                        property_names_array_js_value.try_from_vm_value(&mut *context)?;

                    let property_strings: Vec<String> = property_names
                        .iter()
                        .map(|property_name| -> Result<String, boa_engine::JsError> {
                            let property_js_value =
                                js_object.get(property_name.as_str(), &mut *context)?;

                            let property_value_string_representation = property_js_value
                                .serialize(nesting_level + 1, colorize, &mut *context)?;

                            Ok(format!(
                                "{property_name}: {property_value_string_representation}"
                            ))
                        })
                        .collect::<Result<Vec<_>, _>>()?;

                    let single_line_representation =
                        format!("{{ {} }}", property_strings.join(", "));

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
                Err(_) => {
                    let to_string_js_value = js_object.get("toString", context)?;

                    let to_string_js_object = to_string_js_value.as_object().ok_or_else(|| {
                        "TypeError: Property 'toString' of object is not a function"
                            .to_js_error(None)
                    })?;

                    let string_js_value = to_string_js_object.call(js_value, &[], context)?;

                    string_js_value.try_from_vm_value(context)
                }
            }
        }

        #serialize_js_array_object_function_definition
        #serialize_js_date_object_function_definition
        #serialize_js_error_object_function_definition
        #serialize_js_function_object_function_definition
        #serialize_js_promise_object_function_definition
    }
}
