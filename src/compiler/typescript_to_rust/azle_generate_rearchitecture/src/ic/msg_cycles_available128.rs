use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn NAME<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            _args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
        }
    }
}
