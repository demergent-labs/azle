use proc_macro2::{Ident, TokenStream};
use quote::{
    format_ident,
    quote,
};
use swc_ecma_ast::{FnDecl, TsType, TsKeywordTypeKind, TsTypeAnn, TsKeywordType, TsTypeRef, Param, TsArrayType, Id };

pub fn generate_function_token_stream(ast_fnc_decl_query: &FnDecl) -> proc_macro2::TokenStream {
    let function_name = ast_fnc_decl_query.ident.to_string().replace("#0", "");
    let function_name_ident = format_ident!("{}", function_name);

    let ts_type_ann = &ast_fnc_decl_query.function.return_type.as_ref();
    let return_type = generate_return_type(ts_type_ann);

    let param_name_idents = generate_param_name_idents(&ast_fnc_decl_query.function.params);
    let param_types = generate_param_types(&ast_fnc_decl_query.function.params);
    let params = generate_params_quote(param_name_idents, param_types);

    quote! {
        async fn #function_name_ident(#(#params),*) -> #return_type {
            Default::default()
        }
    }
}

fn generate_param_name_idents(params: &Vec<Param>) -> Vec<Ident> {
    params.iter().map(|param| {
        let thing = param.pat.as_ident().unwrap().id.to_string().replace("#0", "");
        format_ident!("{}", thing)
    }).collect()
}

fn generate_params_quote(names: Vec<Ident>, types: Vec<TokenStream>) -> Vec<TokenStream> {
    names.iter().enumerate().map(|(i, name)| {
        let param_type = types[i].clone();
        quote!{
            #name: #param_type
        }
    }).collect()
}

fn parse_ts_keyword_type(ts_keyword_type: TsKeywordType) -> TokenStream {
    let kind = ts_keyword_type.kind;
    match &kind {
        TsKeywordTypeKind::TsBooleanKeyword => quote!(bool),
        TsKeywordTypeKind::TsStringKeyword => quote!(String),
        TsKeywordTypeKind::TsVoidKeyword => quote!{()},
        TsKeywordTypeKind::TsNullKeyword => quote!{(())},
        TsKeywordTypeKind::TsObjectKeyword => todo!(),
        TsKeywordTypeKind::TsNumberKeyword => todo!(),
        TsKeywordTypeKind::TsBigIntKeyword => todo!(),
        TsKeywordTypeKind::TsNeverKeyword => todo!(),
        TsKeywordTypeKind::TsSymbolKeyword => todo!(),
        TsKeywordTypeKind::TsIntrinsicKeyword => todo!(),
        TsKeywordTypeKind::TsUndefinedKeyword => todo!(),
        TsKeywordTypeKind::TsUnknownKeyword => todo!(),
        TsKeywordTypeKind::TsAnyKeyword => todo!(),
    }
}

fn parse_ts_type_ref(ts_type_ref: TsTypeRef) -> TokenStream {
    let type_name = ts_type_ref.type_name.as_ident().unwrap().sym.chars().as_str();
    match &type_name[..] {
        "blob" => quote!(Vec<u8>),
        "float32" => quote!(f32),
        "float64" => quote!(f64),
        "int" => quote!(candid::Int),
        "int8" => quote!(i8),
        "int16" => quote!(i16),
        "int32" => quote!(i32),
        "int64" => quote!(i64),
        "nat" => quote!(candid::Nat),
        "nat8" => quote!(u8),
        "nat16" => quote!(u16),
        "nat32" => quote!(u32),
        "nat64" => quote!(u64),
        "Principal" => quote!(candid::Principal),
        "empty" => quote!(candid::Empty),
        "reserved" => quote!(candid::Reserved),
        _ => todo!(),
    }
}

fn parse_ts_array_type(ts_array_type: TsArrayType) -> TokenStream {
    let elem_type = *ts_array_type.elem_type;
    let elem_type_ident = ts_type_to_rust_type(elem_type);
    quote!{Vec<#elem_type_ident>}
}

fn generate_return_type(ts_type_ann:&Option<&TsTypeAnn>) -> TokenStream {
    let type_ann = ts_type_ann.clone().unwrap();
    let type_ref = type_ann.type_ann.as_ts_type_ref().unwrap();
    let type_params = type_ref.type_params.clone().unwrap();

    let params = *type_params.params[0].clone();
    ts_type_to_rust_type(params)
}

fn generate_param_types(params: &Vec<Param>) -> Vec<TokenStream> {
    params.iter().map(|param| {
        let type_ann = &param.pat.as_ident().unwrap().type_ann.as_ref();

        let type_ann = type_ann.clone().unwrap();
        let ts_type = *type_ann.type_ann.clone();

        ts_type_to_rust_type(ts_type)
    }).collect()
}


fn ts_type_to_rust_type(ts_type: TsType) -> TokenStream {
    match ts_type {
        TsType::TsKeywordType(ts_keyword_type) => parse_ts_keyword_type(ts_keyword_type),
        TsType::TsTypeRef(ts_type_ref) => parse_ts_type_ref(ts_type_ref),
        TsType::TsArrayType(ts_array_type) => parse_ts_array_type(ts_array_type),
        TsType::TsThisType(_) => todo!(),
        TsType::TsFnOrConstructorType(_) => todo!(),
        TsType::TsTypeQuery(_) => todo!(),
        TsType::TsTypeLit(_) => todo!(),
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
