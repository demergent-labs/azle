pub fn generate_try_into_vm_value() -> proc_macro2::TokenStream {
    quote::quote! {
        pub trait CdkActTryIntoVmValue<Context, VmValue> {
            fn try_into_vm_value(self, context: Context) -> VmValue;
        }

        #[derive(Debug)]
        pub struct CdkActTryIntoVmValueError(pub String);
    }
}
