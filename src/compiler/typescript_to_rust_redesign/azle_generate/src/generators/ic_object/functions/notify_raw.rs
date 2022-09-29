pub fn generate_ic_object_function_notify_raw() -> proc_macro2::TokenStream {
    quote::quote! {
        fn _azle_ic_notify_raw(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let canister_id_js_value = _aargs.get(0).unwrap().clone();
            let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.azle_try_from_js_value(_context).unwrap();

            let method_js_value = _aargs.get(1).unwrap().clone();
            let method_string = method_js_value.as_string().unwrap().to_string();

            let args_raw_js_value = _aargs.get(2).unwrap().clone();
            let args_raw_vec: Vec<u8> = args_raw_js_value.azle_try_from_js_value(_context).unwrap();

            let payment_js_value = _aargs.get(3).unwrap().clone();
            let payment: u128 = payment_js_value.azle_try_from_js_value(_context).unwrap();

            let notify_result = ic_cdk::api::call::notify_raw(
                canister_id_principal,
                &method_string,
                &args_raw_vec,
                payment
            );

            Ok(notify_result.azle_into_js_value(_context))
        }
    }
}
