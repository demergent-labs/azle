pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn clear_timer(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let timer_id_js_value = _aargs.get(0).unwrap().clone();
            let timer_id: ic_cdk_timers::TimerId = timer_id_js_value.try_from_vm_value(&mut *_context).unwrap();

            ic_cdk_timers::clear_timer(timer_id);

            Ok(boa_engine::JsValue::Undefined)
        }
    }
}
