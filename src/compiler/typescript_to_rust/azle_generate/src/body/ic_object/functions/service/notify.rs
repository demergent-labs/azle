use cdk_framework::act::node::candid::service::{Method, Service};
use proc_macro2::TokenStream;
use quote::{format_ident, quote};

pub fn generate(service: &Service, method: &Method) -> TokenStream {
    let function_name_string = format!("notify_{}_{}", service.name, method.name);
    let real_function_name = format_ident!("_azle_{}", function_name_string);
    let wrapper_fn_name = format_ident!("{}_wrapper", function_name_string);
    let param_variables = super::generate_param_variables(method, &service.name);
    let args = super::generate_args_list(method);

    quote! {
        fn #wrapper_fn_name(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let canister_id_js_value = _aargs.get(0).unwrap().clone();
            let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.try_from_vm_value(&mut *_context).unwrap();

            let args_js_value = _aargs.get(1).unwrap().clone();
            let args_js_object = args_js_value.as_object().unwrap();

            #(#param_variables)*

            let notify_result = crate::#real_function_name(
                canister_id_principal,
                #args
            );

            Ok(notify_result.try_into_vm_value(_context).unwrap())
        }
    }
}
