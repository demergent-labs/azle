use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn js_promise_object_to_string(
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
            context: &mut boa_engine::Context,
        ) -> String {
            try_js_promise_object_to_string(js_object, nesting_level, context).unwrap_or_else(
                |js_error| {
                    let cause = js_error.to_std_string(0, &mut *context);

                    format!(
                        "InternalError: Encountered an error while serializing a Promise\n  \
                        [cause]: {cause}"
                    )
                },
            )
        }

        fn try_js_promise_object_to_string(
            js_object: &boa_engine::JsObject,
            nesting_level: usize,
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
                    format!("Promise {{ {status} }}", status="<pending>".dim())
                }
                boa_engine::builtins::promise::PromiseState::Fulfilled(js_value) => {
                    format!(
                        "Promise {{ {status} : {value}}}",
                        status="<fulfilled>".green(),
                        value=js_value.to_std_string(nesting_level, &mut *context)
                    )
                }
                boa_engine::builtins::promise::PromiseState::Rejected(js_value) => {
                    format!(
                        "Promise {{ {status} : {value}}}",
                        status="<rejected>".red(),
                        value=js_value.to_std_string(nesting_level, &mut *context)
                    )
                }
            };

            Ok(promise_string_representation)
        }
    }
}
