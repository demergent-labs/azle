pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        trait ToConsoleString {
            fn to_console_string(self, context: &mut boa_engine::Context) -> String;
        }

        impl ToConsoleString for boa_engine::JsError {
            fn to_console_string(self, context: &mut boa_engine::Context) -> String {
                self.serialize(0, context).unwrap_or_else(|e| e.to_string())
            }
        }

        impl ToConsoleString for boa_engine::JsValue {
            fn to_console_string(self, context: &mut boa_engine::Context) -> String {
                self.serialize(0, context).unwrap_or_else(|e| e.to_string())
            }
        }
    }
}
