use proc_macro2::{Ident, TokenStream};
use quote::{
    format_ident,
    quote,
};
use swc_ecma_ast::{FnDecl, TsType, TsKeywordTypeKind, TsTypeAnn, TsKeywordType, TsTypeRef, Param, TsArrayType, TsTypeLit, TsTypeElement, TsPropertySignature, TsTypeAliasDecl };

pub fn generate_type_aliases_token_stream(ast_type_alias_decls: &Vec<TsTypeAliasDecl>) -> Vec<TokenStream> {
    ast_type_alias_decls.iter().map(|ast_type_alias_decl| {
        generate_type_alias_token_stream(ast_type_alias_decl)
    }).collect()
}

pub fn generate_type_alias_token_stream(type_alias_decl: &TsTypeAliasDecl) -> TokenStream {
    let ts_type = *type_alias_decl.type_ann.clone();
    if !ts_type.is_ts_type_lit() {
        println!("There was an error generating type alias for {:#?}", ts_type);
        // TODO I don't think we should run into this right?
        todo!("Maybe we need a better error here?");
    }

    let ts_type_lit = ts_type.as_ts_type_lit().unwrap();
    let ts_type_name = type_alias_decl.id.sym.chars().as_str();

    let ts_type_ident = format_ident!("{}", ts_type_name);

    let result = ts_type_literal_to_rust_struct(ts_type_ident, ts_type_lit);
    result
}

pub fn generate_function_token_stream(ast_fnc_decl_query: &FnDecl) -> TokenStream {
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
        TsKeywordTypeKind::TsObjectKeyword => todo!("parse_ts_keyword_type for TsObjectKeyword"),
        TsKeywordTypeKind::TsNumberKeyword => todo!("parse_ts_keyword_type for TsNumberKeyword"),
        TsKeywordTypeKind::TsBigIntKeyword => todo!("parse_ts_keyword_type for TsBigIntKeyword"),
        TsKeywordTypeKind::TsNeverKeyword => todo!("parse_ts_keyword_type for TsNeverKeyword"),
        TsKeywordTypeKind::TsSymbolKeyword => todo!("parse_ts_keyword_type for TsSymbolKeyword"),
        TsKeywordTypeKind::TsIntrinsicKeyword => todo!("parse_ts_keyword_type for TsIntrinsicKeyword"),
        TsKeywordTypeKind::TsUndefinedKeyword => todo!("parse_ts_keyword_type for TsUndefinedKeyword"),
        TsKeywordTypeKind::TsUnknownKeyword => todo!("parse_ts_keyword_type for TsUnknownKeyword"),
        TsKeywordTypeKind::TsAnyKeyword => todo!("parse_ts_keyword_type for TsAnyKeyword"),
    }
}

fn parse_ts_type_ref(ts_type_ref: TsTypeRef) -> TokenStream {
    let type_name = ts_type_ref.type_name.as_ident().unwrap().sym.chars().as_str();
    match type_name {
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
        _ => {
            let custom_type_ref_ident = format_ident!("{}", type_name);
            quote!(#custom_type_ref_ident)
        }
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

fn ts_type_literal_to_rust_struct(ts_type_ident: Ident, ts_type_lit: &TsTypeLit) -> TokenStream {
    let members: Vec<TokenStream> = ts_type_lit.members.iter().map(|member| {
        parse_type_literal_members(member)
    }).collect();
    quote!(
        #[derive(serde::Serialize, serde::Deserialize, Debug, candid::CandidType, Clone)]
        struct #ts_type_ident {
            #(#members),*
        }
    )
}

fn parse_type_literal_members(member: &TsTypeElement) -> TokenStream {
    match member.as_ts_property_signature() {
        Some(prop_sig) => {
            let member_name = parse_type_literal_member_name(prop_sig);
            let member_type = parse_type_literal_member_type(prop_sig);
            quote!(#member_name: #member_type)
        }
        None => todo!("Handle parsing type literals if the member isn't a TsPropertySignature"),
    }
}

fn parse_type_literal_member_name(prop_sig: &TsPropertySignature) -> Ident {
    format_ident!("{}", prop_sig.key.as_ident().unwrap().sym.chars().as_str())
}

fn parse_type_literal_member_type(prop_sig: &TsPropertySignature) -> TokenStream {
    let type_ann = prop_sig.type_ann.clone().unwrap();
    let ts_type = *type_ann.type_ann.clone();
    ts_type_to_rust_type(ts_type)
}

fn ts_type_to_rust_type(ts_type: TsType) -> TokenStream {
    match ts_type {
        TsType::TsKeywordType(ts_keyword_type) => parse_ts_keyword_type(ts_keyword_type),
        TsType::TsTypeRef(ts_type_ref) => parse_ts_type_ref(ts_type_ref),
        TsType::TsArrayType(ts_array_type) => parse_ts_array_type(ts_array_type),
        TsType::TsThisType(_) => todo!("ts_type_to_rust_type for TsThisType"),
        TsType::TsFnOrConstructorType(_) => todo!("ts_type_to_rust_type for TsFnOorConstructorType"),
        TsType::TsTypeQuery(_) => todo!("ts_type_to_rust_type for TsTypeQuery"),
        TsType::TsTypeLit(_) => todo!("ts_type_to_rust_type for TsTypeLit"),
        TsType::TsTupleType(_) => todo!("ts_type_to_rust_type for TsTupleType"),
        TsType::TsOptionalType(_) => todo!("ts_type_to_rust_type for TsOptionalType"),
        TsType::TsRestType(_) => todo!("ts_type_to_rust_type for TsRestType"),
        TsType::TsUnionOrIntersectionType(_) => todo!("ts_type_to_rust_type for TsUnionOrIntersectionType"),
        TsType::TsConditionalType(_) => todo!("ts_type_to_rust_type for TsConditionalType"),
        TsType::TsInferType(_) => todo!("ts_type_to_rust_type for TsInferType"),
        TsType::TsParenthesizedType(_) => todo!("ts_type_to_rust_type for TsParenthesizedType"),
        TsType::TsTypeOperator(_) => todo!("ts_type_to_rust_type for TsTypeOperator"),
        TsType::TsIndexedAccessType(_) => todo!("ts_type_to_rust_type for TsIndexedAccessType"),
        TsType::TsMappedType(_) => todo!("ts_type_to_rust_type for TsMappedType"),
        TsType::TsLitType(_) => todo!("ts_type_to_rust_type for TsLitType"),
        TsType::TsTypePredicate(_) => todo!("ts_type_to_rust_type for TsTypePredicate"),
        TsType::TsImportType(_) => todo!("ts_type_to_rust_type for TsImportType"),
    }
}
