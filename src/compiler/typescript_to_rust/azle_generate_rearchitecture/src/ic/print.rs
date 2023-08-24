use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn print<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            for arg in args {
                let value = arg.to_js_value()?;
                ic_cdk::println!("{:?} ", value);
            }
            context.undefined_value()
        }
    }
}
