use cdk_framework::nodes::ActExternalCanister;
use proc_macro2::TokenStream;
use quote::{format_ident, quote};

use crate::generators::ic_object;

pub fn generate(external_canisters: &Vec<ActExternalCanister>) -> Vec<TokenStream> {
    external_canisters.iter().map(|canister| {
        canister.methods.iter().map(|method| {
            let function_name_string = format!("_azle_notify_{}_{}", canister.name, method.name);
            let real_function_name = format_ident!("{}", function_name_string);
            let wrapper_fn_name = format_ident!("{}_wrapper", function_name_string);
            let param_variables = ic_object::generate_param_variables(method);
            let args = ic_object::generate_args_list(method);

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

                    let notify_result = #real_function_name(
                        canister_id_principal,
                        #args
                    );

                    Ok(notify_result.try_into_vm_value(_context).unwrap())
                }
            }
        }).collect()
    }).collect::<Vec<Vec<TokenStream>>>().concat()
}
