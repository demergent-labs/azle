use cdk_framework::act::node::candid::service::{Method, Service};
use proc_macro2::TokenStream;
use quote::{format_ident, quote};

pub fn generate(service: &Service, method: &Method) -> TokenStream {
    let function_name_string = format!("notify_with_payment128_{}_{}", service.name, method.name);
    let real_function_name = format_ident!("{}", function_name_string);
    let wrapper_fn_name = format_ident!("{}_wrapper", function_name_string);
    let param_variables = super::generate_param_variables(method, &service.name);
    let args = super::generate_args_list(method);

    quote! {
        fn #wrapper_fn_name(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let canister_id_js_value = aargs
                .get(0)
                .ok_or_else(|| "An argument for 'canisterId' was not provided".to_js_error(None))?
                .clone();

            let args_js_value = aargs
                .get(1)
                .ok_or_else(|| "An argument for 'args' was not provided".to_js_error(None))?
                .clone();

            let cycles_js_value = aargs
                .get(2)
                .ok_or_else(|| "An argument for 'cycles' was not provided".to_js_error(None))?
                .clone();

            let canister_id_principal: candid::Principal = canister_id_js_value
                .try_from_vm_value(&mut *context)?;

            let args_js_object = args_js_value
                .as_object()
                .ok_or_else(|| "'args' is not an object".to_js_error(None))?;

            #(#param_variables)*

            let cycles: u128 = cycles_js_value.try_from_vm_value(&mut *context)?;

            let notify_result = #real_function_name(
                canister_id_principal,
                #args,
                cycles,
            );

            notify_result
                .try_into_vm_value(context)
                .map_err(|vmc_err| vmc_err.to_js_error(None))
        }
    }
}
