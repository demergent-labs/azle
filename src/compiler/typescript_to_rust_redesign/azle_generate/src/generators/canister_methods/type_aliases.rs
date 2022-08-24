use std::collections::{HashSet, HashMap};

use proc_macro2::TokenStream;
use quote::{
    format_ident,
    quote,
};
use swc_ecma_ast::{TsType, TsTypeAliasDecl};

use super::types::{parse_ts_keyword_type, ts_type_literal_to_rust_struct, parse_ts_type_ref};

pub fn generate_hash_map(ast_type_alias_decls: &Vec<TsTypeAliasDecl>) -> HashMap<String, TsTypeAliasDecl> {
    ast_type_alias_decls.iter().fold(HashMap::new(), |mut acc, ast_type_alias_decl| {
        let type_alias_names = ast_type_alias_decl.id.sym.chars().as_str().to_string();
        acc.insert(type_alias_names, ast_type_alias_decl.clone());
        acc
    })
}

pub fn generate_with_hash_map(ast_type_alias_decls: &Vec<TsTypeAliasDecl>, dependant_types: &HashSet<&String>) -> HashMap<String, TokenStream> {
    let hash_map = generate_hash_map(ast_type_alias_decls);
    dependant_types.iter().fold(HashMap::new(), |mut acc, dependant_type| {
        let type_alias_decl = hash_map.get(dependant_type.clone());
        let token_stream: HashMap<String, TokenStream> = match type_alias_decl {
            Some(decl) => generate_type_alias_token_stream_with_hash_map(decl, &hash_map),
            None => todo!(),
        };
        acc.extend(token_stream.into_iter());
        acc
    })
}

fn generate_type_alias_token_stream_with_hash_map(decl: &TsTypeAliasDecl, hash_map: &HashMap<String, TsTypeAliasDecl>) -> HashMap<String, TokenStream> {
    // TODO I feel like this might run into some namespace issues
    let ts_type_name = decl.id.sym.chars().as_str().to_string();
    let ts_type_ident = format_ident!("{}", ts_type_name);

    let ts_type = *decl.type_ann.clone();

    let mut result: HashMap<String, TokenStream> = HashMap::new();

    match ts_type {
        TsType::TsKeywordType(ts_keyword_type) => {
            let keyword_stream = parse_ts_keyword_type(&ts_keyword_type).token_stream;
            result.insert(ts_type_name, quote!(type #ts_type_ident = #keyword_stream;));
        },
        TsType::TsThisType(_) => todo!(),
        TsType::TsFnOrConstructorType(_) => todo!(),
        TsType::TsTypeRef(ts_type_ref) => {
            let type_ref = parse_ts_type_ref(&ts_type_ref);
            if let Some(name) = type_ref.name {
                let dep_type = hash_map.get(&name);
                match dep_type {
                    Some(dep_decl) => {
                        let ts_type_ref_result = generate_type_alias_token_stream_with_hash_map(dep_decl, hash_map);
                        result.extend(ts_type_ref_result.into_iter());
                    },
                    None => todo!("What if that decl isn't in the hash map"),
                }
            }
            let type_ref_stream = type_ref.token_stream;
            result.insert(ts_type_name, quote!(type #ts_type_ident = #type_ref_stream;));
        },
        TsType::TsTypeQuery(_) => todo!(),
        TsType::TsTypeLit(ts_type_lit) => {
            let rust_struct = ts_type_literal_to_rust_struct(&ts_type_ident, &ts_type_lit);
            // TODO handle if the rust struct has dependant types
            // rust_struct.dependant_types;
            result.insert(rust_struct.name, rust_struct.token_stream);
        },
        TsType::TsArrayType(_) => todo!(),
        TsType::TsTupleType(_) => todo!(),
        TsType::TsOptionalType(_) => todo!(),
        TsType::TsRestType(_) => todo!(),
        TsType::TsUnionOrIntersectionType(_) => todo!(),
        TsType::TsConditionalType(_) => todo!(),
        TsType::TsInferType(_) => todo!(),
        TsType::TsParenthesizedType(_) => todo!(),
        TsType::TsTypeOperator(_) => todo!(),
        TsType::TsIndexedAccessType(_) => todo!(),
        TsType::TsMappedType(_) => todo!(),
        TsType::TsLitType(_) => todo!(),
        TsType::TsTypePredicate(_) => todo!(),
        TsType::TsImportType(_) => todo!(),
    };
    result
}

pub fn generate_type_aliases_token_stream(ast_type_alias_decls: &Vec<TsTypeAliasDecl>, dependant_types: &HashSet<&String>) -> Vec<TokenStream> {
    ast_type_alias_decls.iter().fold(vec![], |acc, ast_type_alias_decl| {
        let type_alias_names = ast_type_alias_decl.id.sym.chars().as_str().to_string();
        if !dependant_types.contains(&type_alias_names) {
            return acc;
        }

        let type_alias_token_stream = generate_type_alias_token_stream(ast_type_alias_decl);
        vec![acc, vec![type_alias_token_stream]].concat()
    })
}

pub fn generate_type_alias_token_stream(type_alias_decl: &TsTypeAliasDecl) -> TokenStream {
    let ts_type_name = type_alias_decl.id.sym.chars().as_str();
    let ts_type_ident = format_ident!("{}", ts_type_name);

    let ts_type = *type_alias_decl.type_ann.clone();

    match ts_type {
        TsType::TsKeywordType(ts_keyword_type) => {
            let keyword_stream = parse_ts_keyword_type(&ts_keyword_type).token_stream;
            quote!(type #ts_type_ident = #keyword_stream;)
        },
        TsType::TsThisType(_) => todo!(),
        TsType::TsFnOrConstructorType(_) => todo!(),
        TsType::TsTypeRef(ts_type_ref) => {
            let type_ref = parse_ts_type_ref(&ts_type_ref);
            if let Some(name) = type_ref.name {
                todo!("Support nested type ref type aliases like {}", name);
            }
            let type_ref_stream = type_ref.token_stream;
            quote!(type #ts_type_ident = #type_ref_stream;)
        },
        TsType::TsTypeQuery(_) => todo!(),
        TsType::TsTypeLit(ts_type_lit) => {
            let rust_struct = ts_type_literal_to_rust_struct(&ts_type_ident, &ts_type_lit);
            // TODO handle if the rust struct has dependant types
            // rust_struct.dependant_types;
            rust_struct.token_stream
        },
        TsType::TsArrayType(_) => todo!(),
        TsType::TsTupleType(_) => todo!(),
        TsType::TsOptionalType(_) => todo!(),
        TsType::TsRestType(_) => todo!(),
        TsType::TsUnionOrIntersectionType(_) => todo!(),
        TsType::TsConditionalType(_) => todo!(),
        TsType::TsInferType(_) => todo!(),
        TsType::TsParenthesizedType(_) => todo!(),
        TsType::TsTypeOperator(_) => todo!(),
        TsType::TsIndexedAccessType(_) => todo!(),
        TsType::TsMappedType(_) => todo!(),
        TsType::TsLitType(_) => todo!(),
        TsType::TsTypePredicate(_) => todo!(),
        TsType::TsImportType(_) => todo!(),
    }
}
