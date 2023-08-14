pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn string_to_std_string(
            string: &boa_engine::JsString,
            nesting_level: usize,
        ) -> String {
            match string.to_std_string() {
                Ok(string) => {
                    let green_start = "\x1B[32m";
                    let green_end = "\x1B[0m";

                    if nesting_level == 0 {
                        return string;
                    }
                    if !string.contains("'") {
                        return format!("{green_start}'{}'{green_end}", string);
                    }
                    if !string.contains("\"") {
                        return format!("{green_start}\"{}\"{green_end}", string.replace("\"", "\\\""));
                    }
                    if !string.contains("`") {
                        return format!("{green_start}`{}`{green_end}", string);
                    }

                    format!("{green_start}'{}'{green_end}", string.replace("'", "\\'"))

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
