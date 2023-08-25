use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn candid_decode<'a>(
            context: &'a JSContextRef,
            _this: &CallbackArg,
            _args: &[CallbackArg],
        ) -> Result<JSValueRef<'a>, anyhow::Error> {
            let candid_encoded: Vec<u8> = _args.get(0).expect("candidDecode must have at least one argument").to_js_value()?.try_into()?;

            let candid_args: candid::IDLArgs = candid::IDLArgs::from_bytes(&candid_encoded)?;
            let candid_string = candid_args.to_string();

            let candid_string_js_value: JSValue = candid_string.into();
            to_qjs_value(&context, &candid_string_js_value)
        }
    }
}
