pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        trait ToStdString {
            fn to_std_string(self, context: &mut boa_engine::Context) -> String;
        }

        impl ToStdString for boa_engine::JsError {
            fn to_std_string(self, context: &mut boa_engine::Context) -> String {
                self.serialize(0, false, context)
                    .unwrap_or_else(|e| e.to_string())
            }
        }

        impl ToStdString for boa_engine::JsValue {
            fn to_std_string(self, context: &mut boa_engine::Context) -> String {
                self.serialize(0, false, context)
                    .unwrap_or_else(|e| e.to_string())
            }
        }
    }
}
