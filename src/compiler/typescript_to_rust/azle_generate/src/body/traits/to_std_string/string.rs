pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn string_to_std_string(
            string: &boa_engine::JsString,
            nesting_level: usize,
        ) -> String {
            match string.to_std_string() {
                Ok(string) => {
                    if nesting_level == 0 {
                        return string;
                    }

                    // TODO: Consider finding which delimiter is used least and
                    // using it.

                    if !string.contains("'") {
                        return format!("'{string}'");
                    }
                    if !string.contains("\"") {
                        return format!("\"{string}\"");
                    }
                    if !string.contains("`") {
                        return format!("`{string}`");
                    }

                    format!("'{}'", string.replace("'", "\\'"))

                    // Alternatively, we could get rid of most of this logic by
                    // using the debug formatter. It just always uses double
                    // quotes though, which isn't as nice.
                    // format!("{:?}", string)
                },
                Err(err) => format!("InternalError: {err}")
            }
        }
    }
}
