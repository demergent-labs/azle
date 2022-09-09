use super::{rust_types::StructInfo, ts_type_to_rust_type, RustType};
use crate::generators::canister_methods::method_body::generate_canister_method_body;
use crate::utils;
use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote};
use swc_ecma_ast::{FnDecl, Param, TsType};

#[derive(Clone)]
pub struct FunctionInformation {
    pub function: TokenStream,
    // The dependant types need to have the name of the type so we can find the corresponding type and create a rust type
    pub type_alias_dependant_types: Vec<String>,
    pub inline_dependant_types: Box<Vec<StructInfo>>,
    pub manual: bool,
}

pub fn generate_function_info(ast_fnc_decl: &FnDecl) -> FunctionInformation {
    let function_name = ast_fnc_decl.ident.sym.chars().as_str().to_string();
    let function_name_ident = format_ident!("{}", function_name);

    let manual = utils::fn_decls::is_manual(ast_fnc_decl);

    let return_type = generate_return_type(&ast_fnc_decl);
    let return_type_token = return_type.get_type_ident();
    let wrapped_return_type = if manual {
        quote! {
            ic_cdk::api::call::ManualReply<#return_type_token>
        }
    } else {
        return_type_token
    };

    let param_name_idents = generate_param_name_idents(&ast_fnc_decl);
    let param_types = generate_param_types(&ast_fnc_decl);
    let params = generate_params_token_stream(&param_name_idents, &param_types);

    let canister_method_body = generate_canister_method_body(&ast_fnc_decl);

    let function_token_stream = quote! {
        async fn #function_name_ident(#(#params),*) -> #wrapped_return_type {
            #canister_method_body
        }
    };

    let types = vec![param_types, vec![return_type]].concat();
    let type_alias_dependant_types: Vec<String> =
        types
            .iter()
            .fold(vec![], |acc, param_type| match param_type {
                RustType::KeywordType(_) => acc,
                RustType::TypeRef(type_ref_info) => {
                    let type_name = type_ref_info.type_alias_dependency.clone();
                    match type_name {
                        Some(name) => vec![acc, vec![name]].concat(),
                        None => acc,
                    }
                }
                RustType::ArrayType(array_type_info) => {
                    let type_name = array_type_info.type_alias_dependency.clone();
                    match type_name {
                        Some(type_name) => vec![acc, vec![type_name]].concat(),
                        None => acc,
                    }
                }
                RustType::Struct(struct_info) => {
                    vec![acc, struct_info.type_alias_dependencies.clone()].concat()
                }
                RustType::Enum(_) => todo!("Generate function_token_stream for Enum"),
            });
    let inline_dependant_types = types.iter().fold(vec![], |acc, sub_struct| {
        let dependencies_option = sub_struct.get_inline_dependencies();
        match dependencies_option {
            Some(dependency) => vec![acc, vec![dependency]].concat(),
            None => acc,
        }
    });
    let inline_dependant_types: Box<Vec<StructInfo>> = Box::from(inline_dependant_types);

    FunctionInformation {
        function: function_token_stream,
        type_alias_dependant_types,
        inline_dependant_types,
        manual,
    }
}

pub fn generate_param_name_idents(ast_fn_decl: &FnDecl) -> Vec<Ident> {
    let params = &ast_fn_decl.function.params;
    params
        .iter()
        .map(|param| {
            let thing = param
                .pat
                .as_ident()
                .unwrap()
                .sym
                .chars()
                .as_str()
                .to_string();
            format_ident!("{}", thing)
        })
        .collect()
}

pub fn generate_params_token_stream(names: &Vec<Ident>, types: &Vec<RustType>) -> Vec<TokenStream> {
    names
        .iter()
        .enumerate()
        .map(|(i, name)| {
            let param_type_token_stream = types[i].get_type_ident();
            quote! {
                #name: #param_type_token_stream
            }
        })
        .collect()
}

fn generate_return_type(ast_fnc_decl: &FnDecl) -> RustType {
    let return_ts_type = get_return_ts_type(ast_fnc_decl);
    ts_type_to_rust_type(&return_ts_type, None)
}

pub fn get_return_ts_type(ast_fnc_decl: &FnDecl) -> TsType {
    let ts_type_ann = ast_fnc_decl.function.return_type.as_ref();
    let return_type_ann = ts_type_ann.clone().unwrap();
    let return_type_ref = return_type_ann.type_ann.as_ts_type_ref().unwrap();
    let return_type_params = return_type_ref.type_params.clone().unwrap();

    let return_ts_type = *return_type_params.params[0].clone();
    return_ts_type
}

pub fn get_param_ts_types(ast_fnc_decl: &FnDecl) -> Vec<TsType> {
    let params = &ast_fnc_decl.function.params;
    params.iter().fold(vec![], |acc, param| {
        let param_type_ann = &param.pat.as_ident().unwrap().type_ann.as_ref();
        let param_type_ann = param_type_ann.clone().unwrap();
        let param_ts_type = *param_type_ann.type_ann.clone();

        vec![acc, vec![param_ts_type]].concat()
    })
}

pub fn generate_param_types(ast_fnc_decl: &FnDecl) -> Vec<RustType> {
    get_param_ts_types(ast_fnc_decl)
        .iter()
        .map(|ts_type| ts_type_to_rust_type(ts_type, None))
        .collect()
}
