pub fn generate_try_from_vm_value() -> proc_macro2::TokenStream {
    quote::quote! {
        pub trait CdkActTryFromVmValue<T, Context> {
            fn try_from_vm_value(self, context: Context) -> Result<T, CdkActTryFromVmValueError>;
        }

        #[derive(Debug)]
        pub struct CdkActTryFromVmValueError(pub String);
    }
}
