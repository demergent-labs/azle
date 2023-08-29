use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn trap<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let message: String = args
                .get(0)
                .expect("trap must have one argument")
                .to_js_value()?
                .try_into()?;

            ic_cdk::api::trap(&message);
        }
    }
}
