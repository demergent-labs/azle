pub fn generate_ic_object_function_candid_encode() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_candid_encode(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let candid_string = _aargs.get(0).unwrap().as_string().unwrap();
            let candid_args: candid::IDLArgs = candid_string.parse().unwrap();
            let candid_encoded: Vec<u8> = candid_args.to_bytes().unwrap();

            Ok(candid_encoded.try_into_vm_value(_context))
        }
    }
}
