use proc_macro2::{Ident, TokenStream};
use quote::{
    format_ident,
    quote,
};
use swc_ecma_ast::{TsType, TsKeywordTypeKind, TsKeywordType, TsTypeRef, TsArrayType, TsTypeLit, TsPropertySignature, TsTypeElement };

pub fn ts_type_to_rust_type(ts_type: &TsType) -> RustType {
    match ts_type {
        TsType::TsKeywordType(ts_keyword_type) => RustType::KeywordType(parse_ts_keyword_type(ts_keyword_type)),
        TsType::TsTypeRef(ts_type_ref) => RustType::TypeRef(parse_ts_type_ref(ts_type_ref)),
        TsType::TsArrayType(ts_array_type) => RustType::ArrayType(ts_array_type_to_rust_type(ts_array_type)),
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

pub fn parse_ts_keyword_type(ts_keyword_type: &TsKeywordType) -> KeywordInfo {
    let kind = ts_keyword_type.kind;
    let token_stream = match &kind {
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
    };
    KeywordInfo{token_stream}
}

pub fn parse_ts_type_ref(ts_type_ref: &TsTypeRef) -> TypeRefInfo {
    let type_name = ts_type_ref.type_name.as_ident().unwrap().sym.chars().as_str();
    match type_name {
        "blob" => TypeRefInfo{token_stream: quote!(Vec<u8>), name: None},
        "float32" => TypeRefInfo{token_stream: quote!(f32), name: None},
        "float64" => TypeRefInfo{token_stream: quote!(f64), name: None},
        "int" => TypeRefInfo{token_stream: quote!(candid::Int), name: None},
        "int8" => TypeRefInfo{token_stream: quote!(i8), name: None},
        "int16" => TypeRefInfo{token_stream: quote!(i16), name: None},
        "int32" => TypeRefInfo{token_stream: quote!(i32), name: None},
        "int64" => TypeRefInfo{token_stream: quote!(i64), name: None},
        "nat" => TypeRefInfo{token_stream: quote!(candid::Nat), name: None},
        "nat8" => TypeRefInfo{token_stream: quote!(u8), name: None},
        "nat16" => TypeRefInfo{token_stream: quote!(u16), name: None},
        "nat32" => TypeRefInfo{token_stream: quote!(u32), name: None},
        "nat64" => TypeRefInfo{token_stream: quote!(u64), name: None},
        "Principal" => TypeRefInfo{token_stream: quote!(candid::Principal), name: None},
        "empty" => TypeRefInfo{token_stream: quote!(candid::Empty), name: None},
        "reserved" => TypeRefInfo{token_stream: quote!(candid::Reserved), name: None},
        "Opt" => TypeRefInfo{token_stream: parse_opt_type_ref(ts_type_ref), name: None},
        _ => {
            let custom_type_ref_ident = format_ident!("{}", type_name);
            TypeRefInfo{token_stream: quote!(#custom_type_ref_ident), name: Some(type_name.to_string())}
        }
    }
}

pub fn parse_opt_type_ref(ts_type_ref: &TsTypeRef) -> TokenStream {
    let type_params = ts_type_ref.type_params.clone();
    let first_type_argument = match type_params {
        Some(params) => {
            let ts_type = *params.params[0].clone();
            // TODO handle custom type refs
            ts_type_to_rust_type(&ts_type).get_type_ident()
        },
        None => todo!("Opt must have an enclosed type"),
    };

    quote!(Option<#first_type_argument>)
}

pub fn ts_array_type_to_rust_type(ts_array_type: &TsArrayType) -> ArrayTypeInfo {
    let elem_type = *ts_array_type.elem_type.clone();
    let rust_type = ts_type_to_rust_type(&elem_type);
    let elem_type_ident = rust_type.get_type_ident();
    // TODO the Array type probably needs support Custom Type Refs
    ArrayTypeInfo{token_stream: quote!{Vec<#elem_type_ident>}}
}

fn parse_type_literal_member_name(prop_sig: &TsPropertySignature) -> Ident {
    format_ident!("{}", prop_sig.key.as_ident().unwrap().sym.chars().as_str())
}

fn parse_type_literal_member_type(prop_sig: &TsPropertySignature) -> RustType {
    let type_ann = prop_sig.type_ann.clone().unwrap();
    let ts_type = *type_ann.type_ann.clone();
    ts_type_to_rust_type(&ts_type)
}

fn parse_type_literal_members(member: &TsTypeElement) -> TokenStream {
    match member.as_ts_property_signature() {
        Some(prop_sig) => {
            let member_name = parse_type_literal_member_name(prop_sig);
            let member_type = parse_type_literal_member_type(prop_sig).get_type_ident();
            // TODO we will need to handle custom type refs
            quote!(#member_name: #member_type)
        }
        None => todo!("Handle parsing type literals if the member isn't a TsPropertySignature"),
    }
}

pub fn ts_type_literal_to_rust_struct(ts_type_ident: &Ident, ts_type_lit: &TsTypeLit) -> StructInfo {
    let members: Vec<TokenStream> = ts_type_lit.members.iter().map(|member| {
        parse_type_literal_members(member)
    }).collect();
    let token_stream = quote!(
        #[derive(serde::Serialize, serde::Deserialize, Debug, candid::CandidType, Clone)]
        struct #ts_type_ident {
            #(#members),*
        }
    );
    StructInfo {
        token_stream,
        name: ts_type_ident.to_string(),
        dep_types: None // TODO obviously we don't want this hard coded as none
    }
}

#[derive(Clone)]
pub enum RustType {
    KeywordType(KeywordInfo),
    TypeRef(TypeRefInfo),
    ArrayType(ArrayTypeInfo),
    Struct(StructInfo)
}

#[derive(Clone)]
pub struct KeywordInfo {
    pub token_stream: TokenStream
}

#[derive(Clone)]
pub struct ArrayTypeInfo {
    pub token_stream: TokenStream
}

#[derive(Clone)]
pub struct TypeRefInfo {
    pub token_stream: TokenStream,
    pub name: Option<String>
}
#[derive(Clone)]
pub struct StructInfo {
    pub token_stream: TokenStream,
    pub name: String,
    pub dep_types: Option<Vec<String>>
}

impl RustType {
    pub fn get_type_ident(&self) -> TokenStream {
        let token_stream = match self {
            RustType::KeywordType(KeywordInfo{token_stream}) => token_stream,
            RustType::TypeRef(TypeRefInfo{token_stream, name: _}) => token_stream,
            RustType::ArrayType(ArrayTypeInfo{token_stream}) => token_stream,
            RustType::Struct(StructInfo{token_stream, name: _, dep_types: _}) => token_stream,
        };
        quote!(#token_stream)
    }
}
