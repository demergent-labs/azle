use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn serialize_js_promise_object(
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            colorize: bool,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            try_serialize_js_promise_object(js_object, nesting_level, colorize, context).map_err(
                |cause| "Encountered an error while serializing a Promise".to_js_error(Some(cause)),
            )
        }

        fn try_serialize_js_promise_object(
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            colorize: bool,
            context: &mut boa_engine::Context,
        ) -> Result<String, boa_engine::JsError> {
            let js_promise =
                boa_engine::object::builtins::JsPromise::from_object(js_object.clone())?;
            let state = js_promise.state()?;

            // TODO: Consider indenting one level to better match node
            // - The way the value is nested is different
            // - At the second level of indentation it just shows the value's
            //   type, not the actual data
            // - at the third+ level it just shows [Promise] in blue

            let promise_string_representation = match state {
                boa_engine::builtins::promise::PromiseState::Pending => {
                    let status = if colorize {
                        "<pending>".dim()
                    } else {
                        "<pending>".to_string()
                    };

                    format!("Promise {{ {status} }}")
                }
                boa_engine::builtins::promise::PromiseState::Fulfilled(js_value) => {
                    let status = if colorize {
                        "<fulfilled>".green()
                    } else {
                        "<fulfilled>".to_string()
                    };

                    format!(
                        "Promise {{ {status} : {value}}}",
                        value = js_value.serialize(nesting_level, colorize, &mut *context)?
                    )
                }
                boa_engine::builtins::promise::PromiseState::Rejected(js_value) => {
                    let status = if colorize {
                        "<rejected>".red()
                    } else {
                        "<rejected>".to_string()
                    };

                    format!(
                        "Promise {{ {status} : {value}}}",
                        value = js_value.serialize(nesting_level, colorize, &mut *context)?
                    )
                }
            };

            Ok(promise_string_representation)
        }
    }
}
