pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn candid_decode(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let candid_encoded: Vec<u8> = aargs.get(0).unwrap().clone().try_from_vm_value(&mut *context).unwrap();
            let candid_args: candid::IDLArgs = candid::IDLArgs::from_bytes(&candid_encoded).unwrap();
            let candid_string = candid_args.to_string();

            Ok(candid_string.try_into_vm_value(context).unwrap())
        }
    }
}
