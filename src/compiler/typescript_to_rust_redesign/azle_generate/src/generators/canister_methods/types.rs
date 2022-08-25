use quote::{
    format_ident,
    quote,
};
use swc_ecma_ast::{ TsType, TsKeywordTypeKind, TsKeywordType, TsTypeRef, TsArrayType };

use super::{ RustType, KeywordInfo, ArrayTypeInfo, TypeRefInfo };

pub fn ts_type_to_rust_type(ts_type: &TsType) -> RustType {
    match ts_type {
        TsType::TsKeywordType(ts_keyword_type) => RustType::KeywordType(parse_ts_keyword_type(ts_keyword_type)),
        TsType::TsTypeRef(ts_type_ref) => RustType::TypeRef(parse_ts_type_ref(ts_type_ref)),
        TsType::TsArrayType(ts_array_type) => RustType::ArrayType(parse_ts_array_type(ts_array_type)),
        TsType::TsTypeLit(_) => todo!("ts_type_to_rust_type for TsTypeLit"),
        TsType::TsThisType(_) => todo!("ts_type_to_rust_type for TsThisType"),
        TsType::TsFnOrConstructorType(_) => todo!("ts_type_to_rust_type for TsFnOorConstructorType"),
        TsType::TsTypeQuery(_) => todo!("ts_type_to_rust_type for TsTypeQuery"),
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
        "blob" => TypeRefInfo{token_stream: quote!(Vec<u8>), ..Default::default()},
        "float32" => TypeRefInfo{token_stream: quote!(f32), ..Default::default()},
        "float64" => TypeRefInfo{token_stream: quote!(f64), ..Default::default()},
        "int" => TypeRefInfo{token_stream: quote!(candid::Int), ..Default::default()},
        "int8" => TypeRefInfo{token_stream: quote!(i8), ..Default::default()},
        "int16" => TypeRefInfo{token_stream: quote!(i16), ..Default::default()},
        "int32" => TypeRefInfo{token_stream: quote!(i32), ..Default::default()},
        "int64" => TypeRefInfo{token_stream: quote!(i64), ..Default::default()},
        "nat" => TypeRefInfo{token_stream: quote!(candid::Nat), ..Default::default()},
        "nat8" => TypeRefInfo{token_stream: quote!(u8), ..Default::default()},
        "nat16" => TypeRefInfo{token_stream: quote!(u16), ..Default::default()},
        "nat32" => TypeRefInfo{token_stream: quote!(u32), ..Default::default()},
        "nat64" => TypeRefInfo{token_stream: quote!(u64), ..Default::default()},
        "Principal" => TypeRefInfo{token_stream: quote!(candid::Principal), ..Default::default()},
        "empty" => TypeRefInfo{token_stream: quote!(candid::Empty), ..Default::default()},
        "reserved" => TypeRefInfo{token_stream: quote!(candid::Reserved), ..Default::default()},
        "Opt" => parse_opt_type_ref(ts_type_ref),
        "Variant" => parse_variant_type_ref(ts_type_ref),
        _ => {
            let custom_type_ref_ident = format_ident!("{}", type_name);
            TypeRefInfo{token_stream: quote!(#custom_type_ref_ident), type_alias_dependency: Some(type_name.to_string()), ..Default::default()}
        }
    }
}

pub fn parse_ts_array_type(ts_array_type: &TsArrayType) -> ArrayTypeInfo {
    let elem_type = *ts_array_type.elem_type.clone();
    let rust_type = ts_type_to_rust_type(&elem_type);
    let elem_type_ident = rust_type.get_type_ident();
    let type_alias_dependency = rust_type.get_type_alias_dependency();
    ArrayTypeInfo{token_stream: quote!{Vec<#elem_type_ident>}, type_alias_dependency}
}

pub fn parse_opt_type_ref(ts_type_ref: &TsTypeRef) -> TypeRefInfo {
    let type_params = ts_type_ref.type_params.clone();
    match type_params {
        Some(params) => {
            let ts_type = *params.params[0].clone();
            let rust_type = ts_type_to_rust_type(&ts_type);
            let rust_ident = rust_type.get_type_ident();
            let type_alias_dependency = rust_type.get_type_alias_dependency();
            TypeRefInfo{token_stream: quote!(Option<#rust_ident>), type_alias_dependency}
        },
        None => todo!("Opt must have an enclosed type"),
    }
}

pub fn parse_variant_type_ref(ts_type_ref: &TsTypeRef) -> TypeRefInfo {
    let type_params = ts_type_ref.type_params.clone();
    match type_params {
        Some(params) => {
            let ts_type = *params.params[0].clone();
            let rust_type = ts_type_to_rust_type(&ts_type);
            let rust_ident = rust_type.get_type_ident();
            let type_alias_dependency = rust_type.get_type_alias_dependency();
            TypeRefInfo{token_stream: quote!(#rust_ident), type_alias_dependency}
        },
        None => todo!("Variant must have an enclosed type"),
    }
}

// TODO I need to better understand what I am doing before doing this.
// How does the AST see a variant? TypeRef for sure first, but then what? Inline type?
// fn parse_variant_type_ref(ts_type_ref: &TsTypeRef, name: String) -> TypeRefInfo {
//     let name_token = format_ident!("{}", name);
//     let type_params = ts_type_ref.type_params.clone();
//     let enum_info: EnumInfo = match type_params {
//         Some(param) => {
//             let ts_type = *param.params[0].clone();
//             // TODO handle custom type refs
//             let rust_type = ts_type_to_rust_type(&ts_type);
//             let type_dependencies = collect_dependencies(rust_type);
//             let inline_dependencies = collect_inline_dependencies(rust_type);
//             let type_ident = rust_type.get_type_ident();
//             let token_stream = quote!{
//                 #[derive(CandidType, Deserialize)]
//                 enum #name_token {
//                     #type_ident
//                 }
//             };
//             EnumInfo{token_stream, name, type_dependencies, inline_dependencies}
//         },
//         None => todo!("Variant must have an enclosed type"),
//     };

//     let enum_thing = quote!(
//         enum Reaction {
//             Fire(),
//             Great(),
//             Good(Good),
//             Fun(Fun),
//             Other(u16)
//         }
//     );

//     let enum_thing_info = EnumInfo {
//         token_stream: enum_thing,
//         name: String::from("Reation"),
//         type_dependencies: vec![String::from("Good"), String::from("Fun")],
//         inline_dependencies: vec![]
//     };

//     let type_ref_info = TypeRefInfo {
//         token_stream: quote!(Reaction), name: Some(String::from("Reaction")), inline_dependencies: vec![RustType::Enum((enum_thing_info))]
//     };

//     TypeRefInfo {
//         token_stream: quote!(#name_token), name: Some(name), inline_dependencies: vec![RustType::Enum(enum_info)]
//     }

// }
