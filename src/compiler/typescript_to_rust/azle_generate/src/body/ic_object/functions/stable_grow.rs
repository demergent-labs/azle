pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn stable_grow(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let new_pages: u32 = _aargs
                .get(0)
                .unwrap()
                .clone()
                .try_from_vm_value(&mut *_context)
                .unwrap();
            Ok(ic_cdk::api::stable::stable_grow(new_pages).try_into_vm_value(_context).unwrap())
        }
    }
}
