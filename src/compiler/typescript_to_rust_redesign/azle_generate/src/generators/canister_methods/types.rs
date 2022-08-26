use quote::{
    format_ident,
    quote,
};
use swc_ecma_ast::{ TsType, TsKeywordTypeKind, TsKeywordType, TsTypeRef, TsArrayType };

use super::{ RustType, KeywordInfo, ArrayTypeInfo, TypeRefInfo, type_aliases::ts_type_literal_to_rust_struct, rust_types::StructInfo };

pub fn ts_type_to_rust_type(ts_type: &TsType, count: u32) -> (RustType, u32) {
    let mut count = count;
    let rust_type = match ts_type {
        TsType::TsKeywordType(ts_keyword_type) => RustType::KeywordType(parse_ts_keyword_type(ts_keyword_type)),
        TsType::TsTypeRef(ts_type_ref) => {
            let result = parse_ts_type_ref(ts_type_ref, count);
            count = result.1;
            RustType::TypeRef(result.0)
        },
        TsType::TsArrayType(ts_array_type) => {
            let result = parse_ts_array_type(ts_array_type, count);
            count = result.1;
            RustType::ArrayType(result.0)
        },
        TsType::TsTypeLit(ts_type_lit) => {
            let ts_type_ident = format_ident!("AzleInlineStruct_{}", count);
            count += 1;
            let result = ts_type_literal_to_rust_struct(&ts_type_ident, ts_type_lit, count);
            count = result.1;
            let struct_info = result.0;
            // let struct_info = StructInfoTODORename{
            //     identifier: quote!(#ts_type_ident),
            //     structure: result.token_stream,
            //     inline_dependencies: Box::from(vec![]),
            //     type_alias_dependencies: result.type_alias_dependencies
            // };
            RustType::Struct(struct_info)
        },
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
    };
    (rust_type, count)
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
    KeywordInfo{identifier: token_stream}
}

pub fn parse_ts_type_ref(ts_type_ref: &TsTypeRef, count: u32) -> (TypeRefInfo, u32) {
    let type_name = ts_type_ref.type_name.as_ident().unwrap().sym.chars().as_str();
    let mut count = count;
    let type_ref_info = match type_name {
        "blob" => TypeRefInfo{identifier: quote!(Vec<u8>), ..Default::default()},
        "float32" => TypeRefInfo{identifier: quote!(f32), ..Default::default()},
        "float64" => TypeRefInfo{identifier: quote!(f64), ..Default::default()},
        "int" => TypeRefInfo{identifier: quote!(candid::Int), ..Default::default()},
        "int8" => TypeRefInfo{identifier: quote!(i8), ..Default::default()},
        "int16" => TypeRefInfo{identifier: quote!(i16), ..Default::default()},
        "int32" => TypeRefInfo{identifier: quote!(i32), ..Default::default()},
        "int64" => TypeRefInfo{identifier: quote!(i64), ..Default::default()},
        "nat" => TypeRefInfo{identifier: quote!(candid::Nat), ..Default::default()},
        "nat8" => TypeRefInfo{identifier: quote!(u8), ..Default::default()},
        "nat16" => TypeRefInfo{identifier: quote!(u16), ..Default::default()},
        "nat32" => TypeRefInfo{identifier: quote!(u32), ..Default::default()},
        "nat64" => TypeRefInfo{identifier: quote!(u64), ..Default::default()},
        "Principal" => TypeRefInfo{identifier: quote!(candid::Principal), ..Default::default()},
        "empty" => TypeRefInfo{identifier: quote!(candid::Empty), ..Default::default()},
        "reserved" => TypeRefInfo{identifier: quote!(candid::Reserved), ..Default::default()},
        "Opt" => {
            let result = parse_opt_type_ref(ts_type_ref, count);
            count = result.1;
            result.0
        },
        "Variant" => parse_variant_type_ref(ts_type_ref),
        _ => {
            let custom_type_ref_ident = format_ident!("{}", type_name);
            TypeRefInfo{identifier: quote!(#custom_type_ref_ident), type_alias_dependency: Some(type_name.to_string()), ..Default::default()}
        }
    };
    (type_ref_info, count)
}

/**
 * I am thinking of the array type as fully its own type, in elem type is just
 * part of the array type. pulling out the info from the elem type and using it
 * for the array type info is fine because we will never see the elem type info
 * otherwise. I am also currently assuming that the only way we have an enclosed type that needs to be
 */
pub fn parse_ts_array_type(ts_array_type: &TsArrayType, count: u32) -> (ArrayTypeInfo, u32) {
    let elem_type = *ts_array_type.elem_type.clone();
    let elem_rust_type = ts_type_to_rust_type(&elem_type, count);
    let count = elem_rust_type.1;
    let elem_rust_type = elem_rust_type.0;
    let elem_type_ident = elem_rust_type.get_type_ident();
    let type_alias_dependency = match &elem_rust_type {
        RustType::KeywordType(_) => None,
        RustType::TypeRef(type_ref_info) => type_ref_info.type_alias_dependency.clone(),
        RustType::ArrayType(array_type) => array_type.type_alias_dependency.clone(),
        RustType::Struct(_) => None,
    };
    let inline_enclosed_type = match &elem_rust_type {
        RustType::Struct(struct_info) => Some(struct_info.clone()),
        _ => None
    };
    (ArrayTypeInfo{identifier: quote!{Vec<#elem_type_ident>}, type_alias_dependency, inline_enclosed_type}, count)
}

pub fn parse_opt_type_ref(ts_type_ref: &TsTypeRef, count: u32) -> (TypeRefInfo, u32) {
    let type_params = ts_type_ref.type_params.clone();
    match type_params {
        Some(params) => {
            let enclosed_ts_type = *params.params[0].clone();
            let enclosed_rust_type = ts_type_to_rust_type(&enclosed_ts_type, count);
            let count = enclosed_rust_type.1;
            let enclosed_rust_type = enclosed_rust_type.0;
            let enclosed_rust_ident = enclosed_rust_type.get_type_ident();
            let type_alias_dependency = match &enclosed_rust_type {
                RustType::KeywordType(_) => None,
                RustType::TypeRef(type_ref_info) => type_ref_info.type_alias_dependency.clone(),
                RustType::ArrayType(array_type) => array_type.type_alias_dependency.clone(),
                RustType::Struct(_) => None,
            };
            let inline_enclosed_type = match &enclosed_rust_type {
                RustType::Struct(struct_info) => Some(struct_info.clone()),
                _ => None
            };
            (TypeRefInfo{identifier: quote!(Option<#enclosed_rust_ident>), type_alias_dependency, inline_enclosed_type}, count)
        },
        None => todo!("Opt must have an enclosed type"),
    }
}

pub fn parse_variant_type_ref(ts_type_ref: &TsTypeRef) -> TypeRefInfo {
    let type_params = ts_type_ref.type_params.clone();
    match type_params {
        Some(params) => {
            let enclosed_ts_type = *params.params[0].clone();
            let enclosed_rust_type = ts_type_to_rust_enum(&enclosed_ts_type);
            let enclosed_rust_ident = enclosed_rust_type.get_type_ident();
            let type_alias_dependency = match &enclosed_rust_type {
                RustType::KeywordType(_) => None,
                RustType::TypeRef(type_ref_info) => type_ref_info.type_alias_dependency.clone(),
                RustType::ArrayType(array_type) => array_type.type_alias_dependency.clone(),
                RustType::Struct(_) => None,
            };
            let inline_enclosed_type = match &enclosed_rust_type {
                RustType::Struct(struct_info) => Some(struct_info.clone()),
                _ => None
            };
            TypeRefInfo{identifier: quote!(#enclosed_rust_ident), type_alias_dependency, inline_enclosed_type}
        },
        None => todo!("Variant must have an enclosed type"),
    }
}

pub fn ts_type_to_rust_enum(ts_type: &TsType) -> RustType{
    return RustType::KeywordType(KeywordInfo{identifier: quote!{}})
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
