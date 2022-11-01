use proc_macro2::TokenStream;
use quote::{format_ident, quote};

use crate::cdk_act::{
    nodes::{ActExternalCanister, ActExternalCanisterMethod},
    ToTokenStream,
};

pub fn generate_ic_object_notify_with_payment128_functions(
    external_canisters: &Vec<ActExternalCanister>,
) -> Vec<TokenStream> {
    external_canisters.iter().map(|canister| {
        canister.methods.iter().map(|method| {
            let function_name_string = format!("_azle_notify_with_payment128_{}_{}", canister.name, method.name);
            let real_function_name = format_ident!("{}", function_name_string);
            let wrapper_fn_name = format_ident!("{}_wrapper", function_name_string);
            let param_variables = generate_param_variables(method);
            let params = method.params_as_args_list();
            quote!{
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

                    let cycles_js_value = _aargs.get(2).unwrap().clone();
                    let cycles: u128 = cycles_js_value.try_from_vm_value(&mut *_context).unwrap();

                    let notify_result = #real_function_name(
                        canister_id_principal,
                        #params
                        cycles,
                    );

                    Ok(notify_result.try_into_vm_value(_context))
                }
            }
        }).collect()
    }).collect::<Vec<Vec<TokenStream>>>().concat()
}

fn generate_param_variables(method: &ActExternalCanisterMethod) -> Vec<TokenStream> {
    method.params
        .iter()
        .enumerate()
        .map(|(index, param)| {
            let param_name_js_value = format_ident!("{}_js_value", param.name);
            let param_name = format_ident!("{}", param.name);
            let param_type = param.data_type.to_token_stream();

            quote! {
                let #param_name_js_value = args_js_object.get(#index, _context).unwrap();
                let #param_name: #param_type = #param_name_js_value.try_from_vm_value(&mut *_context).unwrap();
            }
        })
    .collect()
}
