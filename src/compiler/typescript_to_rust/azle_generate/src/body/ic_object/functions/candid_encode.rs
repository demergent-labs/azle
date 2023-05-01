pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn candid_encode(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let candid_string: String = aargs.get(0).unwrap().clone().try_from_vm_value(&mut *context).unwrap();
            let candid_args: candid::IDLArgs = candid_string.parse().unwrap();
            let candid_encoded: Vec<u8> = candid_args.to_bytes().unwrap();

            Ok(candid_encoded.try_into_vm_value(&mut *context).unwrap())
        }
    }
}
