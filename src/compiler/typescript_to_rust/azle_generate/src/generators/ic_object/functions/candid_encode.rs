pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_candid_encode(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let candid_string: String = _aargs.get(0).unwrap().clone().try_from_vm_value(&mut *_context).unwrap();
            let candid_args: candid::IDLArgs = candid_string.parse().unwrap();
            let candid_encoded: Vec<u8> = candid_args.to_bytes().unwrap();

            Ok(candid_encoded.try_into_vm_value(&mut *_context).unwrap())
        }
    }
}
