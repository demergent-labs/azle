use proc_macro2::Ident;
use quote::{format_ident, quote};
use swc_ecma_ast::{
    Expr, Param, Program, TsFnParam, TsMethodSignature, TsType, TsTypeAliasDecl, TsTypeElement,
    TsTypeLit,
};

use crate::utils::{
    ident::ident_to_string,
    type_aliases::{
        get_type_alias_decl_name, get_type_alias_decls_for_system_structure_type,
        SystemStructureType,
    },
};

use super::canister_methods::{
    functions::{generate_param_name_idents, generate_param_types, generate_params_token_stream},
    ts_type_to_rust_type,
};

#[derive(Clone)]
struct CrossCanisterCallFunctionsInfo {
    call: CrossCanisterCallFunctionInfo,
    call_with_payment: CrossCanisterCallFunctionInfo,
    call_with_payment128: CrossCanisterCallFunctionInfo,
    notify: CrossCanisterCallFunctionInfo,
    notify_with_payment128: CrossCanisterCallFunctionInfo,
}

#[derive(Clone)]
struct CrossCanisterCallFunctionInfo {
    name: String,
    rust: proc_macro2::TokenStream,
}

// struct RustParams {
//     param_names: Vec<String>,
//     param_name_token_streams: Vec<proc_macro2::TokenStream>,
//     param_types: Vec<proc_macro2::TokenStream>,
// }

struct CrossCanisterCallFunctionNames {
    method_name: String,
    call_function_name: String,
    call_with_payment_function_name: String,
    call_with_payment128_function_name: String,
    notify_function_name: String,
    notify_with_payment128_function_name: String,
}

struct RustParam {
    param_name: proc_macro2::TokenStream,
    param_type: proc_macro2::TokenStream,
}

pub fn generate_cross_canister_call_functions(programs: &Vec<Program>) -> proc_macro2::TokenStream {
    let canister_type_alias_decls =
        get_type_alias_decls_for_system_structure_type(programs, &SystemStructureType::Canister);

    let cross_canister_call_functions_infos =
        generate_cross_canister_call_functions_infos_from_canister_type_alias_decls(
            &canister_type_alias_decls,
        );

    let call_functions: Vec<proc_macro2::TokenStream> = cross_canister_call_functions_infos
        .into_iter()
        .map(|cross_canister_call_functions_info| cross_canister_call_functions_info.call.rust)
        .collect();

    quote! {
        #(#call_functions)*
    }
}

fn generate_cross_canister_call_functions_infos_from_canister_type_alias_decls(
    canister_type_alias_decls: &Vec<TsTypeAliasDecl>,
) -> Vec<CrossCanisterCallFunctionsInfo> {
    canister_type_alias_decls
        .iter()
        .fold(vec![], |acc, canister_type_alias_decl| {
            let cross_canister_call_functions_infos =
                generate_cross_canister_call_functions_infos_from_canister_type_alias_decl(
                    canister_type_alias_decl,
                );

            vec![acc, cross_canister_call_functions_infos].concat()
        })
}

fn generate_cross_canister_call_functions_infos_from_canister_type_alias_decl(
    canister_type_alias_decl: &TsTypeAliasDecl,
) -> Vec<CrossCanisterCallFunctionsInfo> {
    match &*canister_type_alias_decl.type_ann {
        TsType::TsTypeRef(ts_type_ref) => {
            match &ts_type_ref.type_params {
                Some(type_params) => {
                    let canister_type_alias_decl_name =
                        get_type_alias_decl_name(canister_type_alias_decl);

                    let type_param = &type_params.params[0]; // TODO I think we can assume this will be here

                    match &**type_param {
                        TsType::TsTypeLit(ts_type_lit) => {
                            generate_cross_canister_call_functions_infos_from_canister_type_literal(
                                ts_type_lit,
                                &canister_type_alias_decl_name,
                            )
                        }
                        _ => panic!("The Canister type param must be a type literal"),
                    }
                }
                None => panic!("A Canister type must have one type param"),
            }
        }
        _ => panic!("A Canister type must be a TsTypeRef"),
    }
}

fn generate_cross_canister_call_functions_infos_from_canister_type_literal(
    canister_type_literal_node: &TsTypeLit,
    canister_type_alias_decl_name: &str,
) -> Vec<CrossCanisterCallFunctionsInfo> {
    canister_type_literal_node
        .members
        .iter()
        .map(|member| {
            generate_cross_canister_call_functions_info_from_canister_type_element(
                member,
                canister_type_alias_decl_name,
            )
        })
        .collect()
}

fn generate_cross_canister_call_functions_info_from_canister_type_element(
    canister_type_element: &TsTypeElement,
    canister_type_alias_decl_name: &str,
) -> CrossCanisterCallFunctionsInfo {
    match canister_type_element {
        TsTypeElement::TsMethodSignature(ts_method_signature) => {
            let cross_canister_call_function_names = get_cross_canister_call_function_names(
                ts_method_signature,
                canister_type_alias_decl_name,
            );

            let call_params = get_ts_method_signature_rust_params(ts_method_signature);
            let function_return_type = get_ts_method_signature_return_type(ts_method_signature);

            let method_name = get_method_name(ts_method_signature);

            let call_rust = generate_call_rust(
                &cross_canister_call_function_names.call_function_name,
                &method_name,
                &function_return_type,
                &call_params,
            );

            CrossCanisterCallFunctionsInfo {
                call: CrossCanisterCallFunctionInfo {
                    name: cross_canister_call_function_names.call_function_name,
                    rust: call_rust,
                },
                call_with_payment: CrossCanisterCallFunctionInfo {
                    name: cross_canister_call_function_names.call_with_payment_function_name,
                    rust: quote!(),
                },
                call_with_payment128: CrossCanisterCallFunctionInfo {
                    name: cross_canister_call_function_names.call_with_payment128_function_name,
                    rust: quote!(),
                },
                notify: CrossCanisterCallFunctionInfo {
                    name: cross_canister_call_function_names.notify_function_name,
                    rust: quote!(),
                },
                notify_with_payment128: CrossCanisterCallFunctionInfo {
                    name: cross_canister_call_function_names.notify_with_payment128_function_name,
                    rust: quote!(),
                },
            }
        }
        _ => panic!("Canister methods must be method signatures"),
    }
}

fn get_cross_canister_call_function_names(
    ts_method_signature: &TsMethodSignature,
    canister_type_alias_decl_name: &str,
) -> CrossCanisterCallFunctionNames {
    let method_name = get_method_name(ts_method_signature);

    CrossCanisterCallFunctionNames {
        method_name: method_name.clone(),
        call_function_name: format!(
            "_azle_call_{}_{}",
            canister_type_alias_decl_name, &method_name
        ),
        call_with_payment_function_name: format!(
            "_azle_call_with_payment_{}_{}",
            canister_type_alias_decl_name, &method_name
        ),
        call_with_payment128_function_name: format!(
            "_azle_call_with_payment128_{}_{}",
            canister_type_alias_decl_name, &method_name
        ),
        notify_function_name: format!(
            "_azle_notify_{}_{}",
            canister_type_alias_decl_name, &method_name
        ),
        notify_with_payment128_function_name: format!(
            "_azle_notify_with_payment128_{}_{}",
            canister_type_alias_decl_name, &method_name
        ),
    }
}

fn get_method_name(ts_method_signature: &TsMethodSignature) -> String {
    match &*ts_method_signature.key {
        Expr::Ident(ident) => ident.sym.chars().as_str().to_string(),
        _ => panic!(""),
    }
}

fn generate_call_rust(
    function_name: &str,
    method_name: &str,
    function_return_type: &proc_macro2::TokenStream,
    rust_params: &RustParams,
) -> proc_macro2::TokenStream {
    let function_name_ident = format_ident!("{}", function_name);

    let params = vec![
        vec![quote! { canister_id_principal: ic_cdk::export::Principal }],
        rust_params.params.clone(),
    ]
    .concat();

    let param_names = &rust_params.param_names;

    quote! {
        async fn #function_name_ident(#(#params),*) -> CallResult<(#function_return_type,)> {
            ic_cdk::api::call::call(
                canister_id_principal,
                #method_name,
                (#(#param_names),*,)
            ).await
        }
    }
}

// TODO we need to go one level deeper here
fn get_ts_method_signature_return_type(
    ts_method_signature: &TsMethodSignature,
) -> proc_macro2::TokenStream {
    // TODO need to go one level deeper through the CanisteResult
    // ts_type_to_rust_type(
    //     &ts_method_signature.type_ann.as_ref().unwrap().type_ann,
    //     None,
    // )
    // .get_type_ident()
    quote! { String }
}

// TODO this part should be refactored to allow us to get a params data structure by just passing in a &FnDecl
// TODO that params data structures can have the name, the type, and both strings and idents as necessary
fn get_ts_method_signature_rust_params(ts_method_signature: &TsMethodSignature) -> RustParams {
    let params = ts_method_signature
        .params
        .iter()
        .map(|ts_fn_param| match ts_fn_param {
            TsFnParam::Ident(binding_ident) => {
                let param_name = ident_to_string(&binding_ident.id);
                let param_name_ident = format_ident!("{}", param_name);
                let param_type =
                    ts_type_to_rust_type(&binding_ident.type_ann.as_ref().unwrap().type_ann, None)
                        .get_type_ident();

                quote! {
                    #param_name_ident: #param_type
                }
            }
            _ => todo!(),
        })
        .collect();

    let param_names = ts_method_signature
        .params
        .iter()
        .map(|ts_fn_param| match ts_fn_param {
            TsFnParam::Ident(binding_ident) => {
                let param_name = ident_to_string(&binding_ident.id);

                let param_name_ident = format_ident!("{}", param_name);

                quote! { #param_name_ident }
            }
            _ => todo!(),
        })
        .collect();

    let param_types = ts_method_signature
        .params
        .iter()
        .map(|ts_fn_param| match ts_fn_param {
            TsFnParam::Ident(binding_ident) => {
                let param_type =
                    ts_type_to_rust_type(&binding_ident.type_ann.as_ref().unwrap().type_ann, None)
                        .get_type_ident();

                quote! {
                    #param_type
                }
            }
            _ => todo!(),
        })
        .collect();

    RustParams {
        params,
        param_names,
        param_types,
    }
}

struct RustParams {
    params: Vec<proc_macro2::TokenStream>,
    param_names: Vec<proc_macro2::TokenStream>,
    param_types: Vec<proc_macro2::TokenStream>,
}
