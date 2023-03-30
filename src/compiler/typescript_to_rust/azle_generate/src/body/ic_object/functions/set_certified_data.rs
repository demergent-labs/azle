pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_set_certified_data(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let data_js_value: boa_engine::JsValue = _aargs.get(0).unwrap().clone();
            let data_vec: Vec<u8> = data_js_value.try_from_vm_value(&mut *_context).unwrap();
            Ok(ic_cdk::api::set_certified_data(&data_vec).try_into_vm_value(_context).unwrap())
        }
    }
}
