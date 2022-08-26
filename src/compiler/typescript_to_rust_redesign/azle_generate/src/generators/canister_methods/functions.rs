use proc_macro2::{Ident, TokenStream};
use quote::{
    format_ident,
    quote,
};
use swc_ecma_ast::{FnDecl, TsTypeAnn, Param };

use super::{RustType, ts_type_to_rust_type, rust_types::StructInfo};

#[derive(Clone)]
pub struct FunctionInformation {
    pub token_stream: TokenStream,
    // The dependant types need to have the name of the type so we can find the corresponding type and create a rust type
    pub dependant_types: Vec<String>,

    pub inline_dependant_types: Box<Vec<StructInfo>>
}

pub fn generate_function_info(ast_fnc_decl_query: &FnDecl, count: u32) -> (FunctionInformation, u32) {
    let function_name = ast_fnc_decl_query.ident.sym.chars().as_str().to_string();
    let function_name_ident = format_ident!("{}", function_name);

    let ts_type_ann = &ast_fnc_decl_query.function.return_type.as_ref();
    let return_type = generate_return_type(ts_type_ann, count);
    let count = return_type.1;
    let return_type = return_type.0;
    let return_type_token = return_type.get_type_ident();

    let param_name_idents = generate_param_name_idents(&ast_fnc_decl_query.function.params);
    let param_types = generate_param_types(&ast_fnc_decl_query.function.params, count);
    let count = param_types.1;
    let param_types = param_types.0;
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
            match param_type {
                RustType::KeywordType(_) => acc,
                RustType::TypeRef(type_ref_info) => {
                    let type_name = type_ref_info.type_alias_dependency.clone();
                    match type_name {
                        Some(name) => {
                            vec![acc, vec![name]].concat()
                        },
                        None => acc,
                    }
                },
                RustType::ArrayType(array_type_info) => {
                    let type_name = array_type_info.type_alias_dependency.clone();
                    match type_name {
                        Some(type_name) => {
                            vec![acc, vec![type_name]].concat()
                        },
                        None => acc,
                    }
                },
                RustType::Struct(struct_info) => vec![acc, struct_info.type_alias_dependencies.clone()].concat(),
            }
        });
    let inline_dependant_types = types
        .iter()
        .fold(vec![], |acc, thing| {
            let dependencies_option = thing.get_inline_dependencies();
            match dependencies_option {
                Some(dependency) => vec![acc, vec![dependency]].concat(),
                None => acc,
            }
        });
    let inline_dependant_types: Box<Vec<StructInfo>> = Box::from(inline_dependant_types);

    println!("These are the type_alias_dependant_types at the function level {:#?}", dependant_types);

    (FunctionInformation { token_stream, dependant_types, inline_dependant_types }, count)
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

fn generate_return_type(ts_type_ann:&Option<&TsTypeAnn>, count: u32) -> (RustType, u32) {
    let type_ann = ts_type_ann.clone().unwrap();
    let type_ref = type_ann.type_ann.as_ts_type_ref().unwrap();
    let type_params = type_ref.type_params.clone().unwrap();

    let params = *type_params.params[0].clone();
    ts_type_to_rust_type(&params, count)
}

fn generate_param_types(params: &Vec<Param>, count: u32) -> (Vec<RustType>, u32) {
    params.iter().fold((vec![], count), |acc, param| {
        let type_ann = &param.pat.as_ident().unwrap().type_ann.as_ref();
        let type_ann = type_ann.clone().unwrap();
        let ts_type = *type_ann.type_ann.clone();

        let result = ts_type_to_rust_type(&ts_type, acc.1);
        (vec![acc.0, vec![result.0]].concat(), result.1)
    })
}
