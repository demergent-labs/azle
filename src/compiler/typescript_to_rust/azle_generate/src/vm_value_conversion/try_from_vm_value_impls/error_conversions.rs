pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        impl From<&str> for CdkActTryFromVmValueError {
            fn from(value: &str) -> Self {
                Self(value.to_string())
            }
        }

        impl From<&str> for CdkActTryIntoVmValueError {
            fn from(value: &str) -> Self {
                Self(value.to_string())
            }
        }

        impl From<String> for CdkActTryFromVmValueError {
            fn from(value: String) -> Self {
                Self(value)
            }
        }

        impl From<String> for CdkActTryIntoVmValueError {
            fn from(value: String) -> Self {
                Self(value)
            }
        }
    }
}
