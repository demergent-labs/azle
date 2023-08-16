pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn print(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let output_string = aargs
                .iter()
                .map(|val| val.clone().to_console_string(context))
                .collect::<Vec<String>>()
                .join(" ");

            ic_cdk::println!("{}", output_string);

            return Ok(boa_engine::JsValue::Undefined);
        }
    }
}
