pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn serialize_string(
            string: &boa_engine::JsString,
            nesting_level: usize,
            colorize: bool,
        ) -> Result<String, boa_engine::JsError> {
            let std_string = string.to_std_string().map_err(|err| {
                let cause = err.to_string().to_js_error(None);

                "Encountered an error while serializing a String".to_js_error(Some(cause))
            })?;

            if nesting_level == 0 {
                return Ok(std_string);
            }

            // TODO: Consider finding which delimiter is used least and
            // using it.

            if !std_string.contains("'") {
                let output = format!("'{std_string}'");

                return Ok(if colorize { output.green() } else { output });
            }
            if !std_string.contains("\"") {
                let output = format!("\"{std_string}\"");

                return Ok(if colorize { output.green() } else { output });
            }
            if !std_string.contains("`") {
                let output = format!("`{std_string}`");

                return Ok(if colorize { output.green() } else { output });
            }

            let output = format!("'{}'", std_string.replace("'", "\\'"));

            Ok(if colorize { output.green() } else { output })

            // Alternatively, we could get rid of most of this logic by
            // using the debug formatter. It just always uses double
            // quotes though, which isn't as nice.
            // format!("{:?}", std_string)
        }
    }
}
