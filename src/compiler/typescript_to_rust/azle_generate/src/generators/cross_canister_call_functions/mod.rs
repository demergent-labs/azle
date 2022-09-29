use crate::{
    cdk_act::{SystemStructureType, ToTokenStream},
    ts_ast::{
        ident::ident_to_string, program::get_type_alias_decls_for_system_structure_type,
        ts_type_alias_decl::get_type_alias_decl_name, ts_types_to_act,
    },
};
use quote::{format_ident, quote};
use swc_ecma_ast::{
    Expr, Program, TsFnParam, TsMethodSignature, TsType, TsTypeAliasDecl, TsTypeElement, TsTypeLit,
};

#[derive(Clone)]
pub struct CrossCanisterCallFunctionsInfo {
    pub call: CrossCanisterCallFunctionInfo,
    pub call_with_payment: CrossCanisterCallFunctionInfo,
    pub call_with_payment128: CrossCanisterCallFunctionInfo,
    pub notify: CrossCanisterCallFunctionInfo,
    pub notify_with_payment128: CrossCanisterCallFunctionInfo,
}

#[derive(Clone)]
pub struct CrossCanisterCallFunctionInfo {
    pub name: String,
    pub rust_params: RustParams,
    pub rust: proc_macro2::TokenStream,
}

#[derive(Clone)]
pub struct RustParams {
    pub params: Vec<proc_macro2::TokenStream>,
    pub param_names: Vec<proc_macro2::TokenStream>,
    pub param_types: Vec<proc_macro2::TokenStream>,
}

struct CrossCanisterCallFunctionNames {
    call_function_name: String,
    call_with_payment_function_name: String,
    call_with_payment128_function_name: String,
    notify_function_name: String,
    notify_with_payment128_function_name: String,
}

pub fn generate_cross_canister_call_functions(programs: &Vec<Program>) -> proc_macro2::TokenStream {
    let cross_canister_call_functions_infos =
        generate_cross_canister_call_functions_infos(programs);

    let call_functions: Vec<proc_macro2::TokenStream> = cross_canister_call_functions_infos
        .iter()
        .map(|cross_canister_call_functions_info| {
            cross_canister_call_functions_info.call.rust.clone()
        })
        .collect();

    let call_with_payment_functions: Vec<proc_macro2::TokenStream> =
        cross_canister_call_functions_infos
            .iter()
            .map(|cross_canister_call_functions_info| {
                cross_canister_call_functions_info
                    .call_with_payment
                    .rust
                    .clone()
            })
            .collect();

    let call_with_payment128_functions: Vec<proc_macro2::TokenStream> =
        cross_canister_call_functions_infos
            .iter()
            .map(|cross_canister_call_functions_info| {
                cross_canister_call_functions_info
                    .call_with_payment128
                    .rust
                    .clone()
            })
            .collect();

    let notify_functions: Vec<proc_macro2::TokenStream> = cross_canister_call_functions_infos
        .iter()
        .map(|cross_canister_call_functions_info| {
            cross_canister_call_functions_info.notify.rust.clone()
        })
        .collect();

    let notify_with_payment128_functions: Vec<proc_macro2::TokenStream> =
        cross_canister_call_functions_infos
            .iter()
            .map(|cross_canister_call_functions_info| {
                cross_canister_call_functions_info
                    .notify_with_payment128
                    .rust
                    .clone()
            })
            .collect();

    quote! {
        #(#call_functions)*
        #(#call_with_payment_functions)*
        #(#call_with_payment128_functions)*
        #(#notify_functions)*
        #(#notify_with_payment128_functions)*
    }
}

pub fn generate_cross_canister_call_functions_infos(
    programs: &Vec<Program>,
) -> Vec<CrossCanisterCallFunctionsInfo> {
    let canister_type_alias_decls =
        get_type_alias_decls_for_system_structure_type(programs, &SystemStructureType::Canister);

    let cross_canister_call_functions_infos =
        generate_cross_canister_call_functions_infos_from_canister_type_alias_decls(
            &canister_type_alias_decls,
        );

    cross_canister_call_functions_infos
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

            let call_with_payment_rust = generate_call_with_payment_rust(
                &cross_canister_call_function_names.call_with_payment_function_name,
                &method_name,
                &function_return_type,
                &call_params,
            );

            let call_with_payment128_rust = generate_call_with_payment128_rust(
                &cross_canister_call_function_names.call_with_payment128_function_name,
                &method_name,
                &function_return_type,
                &call_params,
            );

            let notify_rust = generate_notify_rust(
                &cross_canister_call_function_names.notify_function_name,
                &method_name,
                &call_params,
            );

            let notify_with_payment128_rust = generate_notify_with_payment128_rust(
                &cross_canister_call_function_names.notify_with_payment128_function_name,
                &method_name,
                &call_params,
            );

            CrossCanisterCallFunctionsInfo {
                call: CrossCanisterCallFunctionInfo {
                    name: cross_canister_call_function_names.call_function_name,
                    rust_params: call_params.clone(),
                    rust: call_rust,
                },
                call_with_payment: CrossCanisterCallFunctionInfo {
                    name: cross_canister_call_function_names.call_with_payment_function_name,
                    rust_params: call_params.clone(),
                    rust: call_with_payment_rust,
                },
                call_with_payment128: CrossCanisterCallFunctionInfo {
                    name: cross_canister_call_function_names.call_with_payment128_function_name,
                    rust_params: call_params.clone(),
                    rust: call_with_payment128_rust,
                },
                notify: CrossCanisterCallFunctionInfo {
                    name: cross_canister_call_function_names.notify_function_name,
                    rust_params: call_params.clone(),
                    rust: notify_rust,
                },
                notify_with_payment128: CrossCanisterCallFunctionInfo {
                    name: cross_canister_call_function_names.notify_with_payment128_function_name,
                    rust_params: call_params,
                    rust: notify_with_payment128_rust,
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

    let comma = if param_names.len() == 1 {
        quote! { , }
    } else {
        quote! {}
    };

    quote! {
        async fn #function_name_ident(#(#params),*) -> CallResult<(#function_return_type,)> {
            ic_cdk::api::call::call(
                canister_id_principal,
                #method_name,
                (#(#param_names),*#comma)
            ).await
        }
    }
}

fn generate_call_with_payment_rust(
    function_name: &str,
    method_name: &str,
    function_return_type: &proc_macro2::TokenStream,
    rust_params: &RustParams,
) -> proc_macro2::TokenStream {
    let function_name_ident = format_ident!("{}", function_name);

    let params = vec![
        vec![quote! { canister_id_principal: ic_cdk::export::Principal }],
        rust_params.params.clone(),
        vec![quote! { cycles: u64 }],
    ]
    .concat();

    let param_names = &rust_params.param_names;

    let comma = if param_names.len() == 1 {
        quote! { , }
    } else {
        quote! {}
    };
    quote! {
        async fn #function_name_ident(#(#params),*) -> CallResult<(#function_return_type,)> {
            ic_cdk::api::call::call_with_payment(
                canister_id_principal,
                #method_name,
                (#(#param_names),*#comma),
                cycles
            ).await
        }
    }
}

fn generate_call_with_payment128_rust(
    function_name: &str,
    method_name: &str,
    function_return_type: &proc_macro2::TokenStream,
    rust_params: &RustParams,
) -> proc_macro2::TokenStream {
    let function_name_ident = format_ident!("{}", function_name);

    let params = vec![
        vec![quote! { canister_id_principal: ic_cdk::export::Principal }],
        rust_params.params.clone(),
        vec![quote! { cycles: u128 }],
    ]
    .concat();

    let param_names = &rust_params.param_names;

    let comma = if param_names.len() == 1 {
        quote! { , }
    } else {
        quote! {}
    };

    quote! {
        async fn #function_name_ident(#(#params),*) -> CallResult<(#function_return_type,)> {
            ic_cdk::api::call::call_with_payment128(
                canister_id_principal,
                #method_name,
                (#(#param_names),*#comma),
                cycles
            ).await
        }
    }
}

fn generate_notify_rust(
    function_name: &str,
    method_name: &str,
    rust_params: &RustParams,
) -> proc_macro2::TokenStream {
    let function_name_ident = format_ident!("{}", function_name);

    let param_names = &rust_params.param_names;

    let param_variables: Vec<proc_macro2::TokenStream> = param_names
        .iter()
        .enumerate()
        .map(|(index, param_name)| {
            let param_name_js_value = format_ident!("{}_js_value", param_name.to_string());
            let param_type = &rust_params.param_types[index];

            quote! {
                let #param_name_js_value = args_js_object.get(#index, _context).unwrap();
                let #param_name: #param_type = #param_name_js_value.azle_try_from_js_value(_context).unwrap();
            }
        })
        .collect();

    let comma = if param_names.len() == 1 {
        quote! { , }
    } else {
        quote! {}
    };

    quote! {
        fn #function_name_ident(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let canister_id_js_value = _aargs.get(0).unwrap().clone();
            let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.azle_try_from_js_value(_context).unwrap();

            let args_js_value = _aargs.get(1).unwrap().clone();
            let args_js_object = args_js_value.as_object().unwrap();

            #(#param_variables)*

            let notify_result = ic_cdk::api::call::notify(
                canister_id_principal,
                #method_name,
                (#(#param_names),*#comma)
            );

            Ok(notify_result.azle_into_js_value(_context))
        }
    }
}

fn generate_notify_with_payment128_rust(
    function_name: &str,
    method_name: &str,
    rust_params: &RustParams,
) -> proc_macro2::TokenStream {
    let function_name_ident = format_ident!("{}", function_name);

    let param_names = &rust_params.param_names;

    let param_variables: Vec<proc_macro2::TokenStream> = param_names
        .iter()
        .enumerate()
        .map(|(index, param_name)| {
            let param_name_js_value = format_ident!("{}_js_value", param_name.to_string());
            let param_type = &rust_params.param_types[index];

            quote! {
                let #param_name_js_value = args_js_object.get(#index, _context).unwrap();
                let #param_name: #param_type = #param_name_js_value.azle_try_from_js_value(_context).unwrap();
            }
        })
        .collect();

    let comma = if param_names.len() == 1 {
        quote! { , }
    } else {
        quote! {}
    };

    quote! {
        fn #function_name_ident(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let canister_id_js_value = _aargs.get(0).unwrap().clone();
            let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.azle_try_from_js_value(_context).unwrap();

            let args_js_value = _aargs.get(1).unwrap().clone();
            let args_js_object = args_js_value.as_object().unwrap();

            #(#param_variables)*

            let cycles_js_value = _aargs.get(2).unwrap().clone();
            let cycles: u128 = cycles_js_value.azle_try_from_js_value(_context).unwrap();

            let notify_result = ic_cdk::api::call::notify_with_payment128(
                canister_id_principal,
                #method_name,
                (#(#param_names),*#comma),
                cycles
            );

            Ok(notify_result.azle_into_js_value(_context))
        }
    }
}

fn get_ts_method_signature_return_type(
    ts_method_signature: &TsMethodSignature,
) -> proc_macro2::TokenStream {
    let ts_type_ann = &*ts_method_signature.type_ann.as_ref().unwrap().type_ann;
    let ts_type_ref = &ts_type_ann.as_ts_type_ref().unwrap();
    let type_params = ts_type_ref.type_params.as_ref().unwrap();
    let return_type = &**type_params.params.get(0).unwrap();

    ts_types_to_act::ts_type_to_act_node(return_type, &None).to_token_stream()
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
                let param_type = ts_types_to_act::ts_type_to_act_node(
                    &binding_ident.type_ann.as_ref().unwrap().type_ann,
                    &None,
                )
                .to_token_stream();

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
                let param_type = ts_types_to_act::ts_type_to_act_node(
                    &binding_ident.type_ann.as_ref().unwrap().type_ann,
                    &None,
                )
                .to_token_stream();

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
