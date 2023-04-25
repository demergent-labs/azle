pub fn generate() -> proc_macro2::TokenStream {
    quote::quote! {
        fn notify_raw(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let canister_id_js_value = aargs.get(0).unwrap().clone();
            let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.try_from_vm_value(&mut *context).unwrap();

            let method_js_value = aargs.get(1).unwrap().clone();
            let method_string: String = method_js_value.try_from_vm_value(&mut *context).unwrap();

            let args_raw_js_value = aargs.get(2).unwrap().clone();
            let args_raw_vec: Vec<u8> = args_raw_js_value.try_from_vm_value(&mut *context).unwrap();

            let payment_js_value = aargs.get(3).unwrap().clone();
            let payment: u128 = payment_js_value.try_from_vm_value(&mut *context).unwrap();

            let notify_result = ic_cdk::api::call::notify_raw(
                canister_id_principal,
                &method_string,
                &args_raw_vec,
                payment
            );

            Ok(notify_result.try_into_vm_value(context).unwrap())
        }
    }
}
