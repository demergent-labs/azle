use proc_macro2::{Ident, TokenStream};
use quote::{
    format_ident,
    quote,
};
use swc_ecma_ast::{FnDecl, TsTypeAnn, Param };

use super::{StructInfo, RustType, TypeRefInfo, ts_type_to_rust_type};

pub struct FunctionInformation {
    pub token_stream: TokenStream,
    // The dependant types need to have the name of the type so we can find the corresponding type and create a rust type
    pub dependant_types: Vec<String>,
    // The type literals needs to have the full token stream for their rust type counterpart since they are only defined in line so we have no way to find them again.
    pub type_literals: Vec<StructInfo>
}

pub fn generate_function_info(ast_fnc_decl_query: &FnDecl) -> FunctionInformation {
    let function_name = ast_fnc_decl_query.ident.sym.chars().as_str().to_string();
    let function_name_ident = format_ident!("{}", function_name);

    let ts_type_ann = &ast_fnc_decl_query.function.return_type.as_ref();
    let return_type = generate_return_type(ts_type_ann);
    let return_type_token = return_type.get_type_ident();

    let param_name_idents = generate_param_name_idents(&ast_fnc_decl_query.function.params);
    let param_types = generate_param_types(&ast_fnc_decl_query.function.params);
    let params = generate_params_token_stream(&param_name_idents, &param_types);

    let token_stream = quote! {
        async fn #function_name_ident(#(#params),*) -> #return_type_token {
            Default::default()
        }
    };

    let types = vec![param_types, vec![return_type]].concat();
    let dependant_types: Vec<String> = types
        .iter()
        .fold(vec![], |acc, param_type| {
            let type_name: Option<String> = match param_type {
                RustType::KeywordType(_) => None,
                RustType::TypeRef(TypeRefInfo{token_stream: _, type_alias_dependency: type_dependency, inline_dependencies: _}) => type_dependency.clone(),
                RustType::ArrayType(_) => None,
                RustType::Struct(_) => None,
                RustType::Enum(_) => todo!(),
            };
            match type_name {
                Some(name) => {
                    let name = String::from(name);
                    vec![acc, vec![name]].concat()
                },
                None => acc,
            }
        });

    let type_literals = vec![];

    FunctionInformation { token_stream, dependant_types, type_literals }
}

fn generate_param_name_idents(params: &Vec<Param>) -> Vec<Ident> {
    params.iter().map(|param| {
        let thing = param.pat.as_ident().unwrap().sym.chars().as_str().to_string();
        format_ident!("{}", thing)
    }).collect()
}

fn generate_params_token_stream(names: &Vec<Ident>, types: &Vec<RustType>) -> Vec<TokenStream> {
    names.iter().enumerate().map(|(i, name)| {
        let param_type_token_stream = types[i].get_type_ident();
        quote!{
            #name: #param_type_token_stream
        }
    }).collect()
}

fn generate_return_type(ts_type_ann:&Option<&TsTypeAnn>) -> RustType {
    let type_ann = ts_type_ann.clone().unwrap();
    let type_ref = type_ann.type_ann.as_ts_type_ref().unwrap();
    let type_params = type_ref.type_params.clone().unwrap();

    let params = *type_params.params[0].clone();
    ts_type_to_rust_type(&params)
}

fn generate_param_types(params: &Vec<Param>) -> Vec<RustType> {
    params.iter().map(|param| {
        let type_ann = &param.pat.as_ident().unwrap().type_ann.as_ref();
        let type_ann = type_ann.clone().unwrap();
        let ts_type = *type_ann.type_ann.clone();

        ts_type_to_rust_type(&ts_type)
    }).collect()
}
