use proc_macro2::{Ident, TokenStream};
use quote::{
    format_ident,
    quote,
};
use swc_ecma_ast::{TsType, TsKeywordTypeKind, TsKeywordType, TsTypeRef, TsArrayType, TsTypeLit, TsPropertySignature, TsTypeElement };

use super::{RustType, StructInfo, KeywordInfo, ArrayTypeInfo, TypeRefInfo};

pub fn ts_type_to_rust_type(ts_type: &TsType) -> RustType {
    match ts_type {
        TsType::TsKeywordType(ts_keyword_type) => RustType::KeywordType(parse_ts_keyword_type(ts_keyword_type)),
        TsType::TsTypeRef(ts_type_ref) => RustType::TypeRef(parse_ts_type_ref(ts_type_ref)),
        TsType::TsArrayType(ts_array_type) => RustType::ArrayType(parse_ts_array_type(ts_array_type)),
        TsType::TsTypeLit(ts_type_lit) => RustType::Struct(parse_ts_type_lit(ts_type_lit)),
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

// TODO I'm not sure if this is right because it could be that this is in charge of enums as well
fn parse_ts_type_lit(ts_type_lit: &TsTypeLit) -> StructInfo {
    todo!("ts_type_to_rust_type for TsTypeLit for type {:#?}", ts_type_lit)
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
        "blob" => TypeRefInfo{token_stream: quote!(Vec<u8>), type_alias_dependency: None, inline_dependencies: vec![]},
        "float32" => TypeRefInfo{token_stream: quote!(f32), type_alias_dependency: None, inline_dependencies: vec![]},
        "float64" => TypeRefInfo{token_stream: quote!(f64), type_alias_dependency: None, inline_dependencies: vec![]},
        "int" => TypeRefInfo{token_stream: quote!(candid::Int), type_alias_dependency: None, inline_dependencies: vec![]},
        "int8" => TypeRefInfo{token_stream: quote!(i8), type_alias_dependency: None, inline_dependencies: vec![]},
        "int16" => TypeRefInfo{token_stream: quote!(i16), type_alias_dependency: None, inline_dependencies: vec![]},
        "int32" => TypeRefInfo{token_stream: quote!(i32), type_alias_dependency: None, inline_dependencies: vec![]},
        "int64" => TypeRefInfo{token_stream: quote!(i64), type_alias_dependency: None, inline_dependencies: vec![]},
        "nat" => TypeRefInfo{token_stream: quote!(candid::Nat), type_alias_dependency: None, inline_dependencies: vec![]},
        "nat8" => TypeRefInfo{token_stream: quote!(u8), type_alias_dependency: None, inline_dependencies: vec![]},
        "nat16" => TypeRefInfo{token_stream: quote!(u16), type_alias_dependency: None, inline_dependencies: vec![]},
        "nat32" => TypeRefInfo{token_stream: quote!(u32), type_alias_dependency: None, inline_dependencies: vec![]},
        "nat64" => TypeRefInfo{token_stream: quote!(u64), type_alias_dependency: None, inline_dependencies: vec![]},
        "Principal" => TypeRefInfo{token_stream: quote!(candid::Principal), type_alias_dependency: None, inline_dependencies: vec![]},
        "empty" => TypeRefInfo{token_stream: quote!(candid::Empty), type_alias_dependency: None, inline_dependencies: vec![]},
        "reserved" => TypeRefInfo{token_stream: quote!(candid::Reserved), type_alias_dependency: None, inline_dependencies: vec![]},
        "Opt" => parse_opt_type_ref(ts_type_ref),
        _ => {
            let custom_type_ref_ident = format_ident!("{}", type_name);
            TypeRefInfo{token_stream: quote!(#custom_type_ref_ident), type_alias_dependency: Some(type_name.to_string()), inline_dependencies: vec![]}
        }
    }
}

pub fn parse_ts_array_type(ts_array_type: &TsArrayType) -> ArrayTypeInfo {
    let elem_type = *ts_array_type.elem_type.clone();
    let rust_type = ts_type_to_rust_type(&elem_type);
    let elem_type_ident = rust_type.get_type_ident();
    // let type_dependencies = collect_dependencies(&rust_type);
    // let type_dependencies = rust_type.get_type_alias_dependencies();
    let type_dependencies = vec![rust_type.get_type_ident().to_string()];
    let inline_dependencies = collect_inline_dependencies(&rust_type);
    // TODO the Array type probably needs support Custom Type Refs
    ArrayTypeInfo{token_stream: quote!{Vec<#elem_type_ident>}, type_alias_dependencies: type_dependencies, inline_dependencies}
}

pub fn parse_opt_type_ref(ts_type_ref: &TsTypeRef) -> TypeRefInfo {
    let type_params = ts_type_ref.type_params.clone();
    let first_type_argument = match type_params {
        Some(params) => {
            let ts_type = *params.params[0].clone();
            // TODO handle custom type refs
            ts_type_to_rust_type(&ts_type).get_type_ident()
        },
        None => todo!("Opt must have an enclosed type"),
    };

    TypeRefInfo{token_stream: quote!(Option<#first_type_argument>), type_alias_dependency: None, inline_dependencies: vec![]}
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

fn parse_type_literal_member_name(prop_sig: &TsPropertySignature) -> Ident {
    format_ident!("{}", prop_sig.key.as_ident().unwrap().sym.chars().as_str())
}

fn parse_type_literal_member_type(prop_sig: &TsPropertySignature) -> RustType {
    let type_ann = prop_sig.type_ann.clone().unwrap();
    let ts_type = *type_ann.type_ann.clone();
    ts_type_to_rust_type(&ts_type)
}

// TODO I think I am overusing this, and in the wrong way
fn collect_dependencies(rust_type: &RustType) -> Vec<String> {
    // TODO should the name of the type be considered a dependency?
    match rust_type {
        RustType::TypeRef(TypeRefInfo{token_stream: _, type_alias_dependency: name, inline_dependencies: _}) => {
            // println!("Collecting dependencies for a typeref {:#?}", name);
            match name {
                Some(type_name) => vec![type_name.clone()],
                None => vec![],
            }
        },
        RustType::ArrayType(ArrayTypeInfo{token_stream: _, type_alias_dependencies: type_dependencies, inline_dependencies: _}) => {
            // println!("Collecting dependencies for an array {:#?}", type_dependencies);
            type_dependencies.to_vec()
        },
        RustType::Struct(StructInfo{token_stream: _, name: _, type_alias_dependencies: type_dependencies, inline_dependencies: _}) => {
            // println!("Collecting dependencies for a struct");
            type_dependencies.to_vec()
        },
        _ => vec![],
    }
}

// TODO implemnt this
fn collect_inline_dependencies(rust_type: &RustType) -> Vec<RustType> {
    return vec![RustType::KeywordType(KeywordInfo{token_stream: quote!(bool)})]
}

fn parse_type_literal_members(member: &TsTypeElement) -> (TokenStream, Vec<String>, Vec<RustType>) {
    match member.as_ts_property_signature() {
        Some(prop_sig) => {
            let member_name = parse_type_literal_member_name(prop_sig);
            let member_type = parse_type_literal_member_type(prop_sig);
            let member_type_token_stream = member_type.get_type_ident();
            let type_dependencies = collect_dependencies(&member_type);
            // let type_dependencies = member_type.get_type_alias_dependencies();
            let inline_dependencies = collect_inline_dependencies(&member_type);
            (quote!(#member_name: #member_type_token_stream), type_dependencies, inline_dependencies)
        }
        None => todo!("Handle parsing type literals if the member isn't a TsPropertySignature"),
    }
}

pub fn ts_type_literal_to_rust_struct(ts_type_ident: &Ident, ts_type_lit: &TsTypeLit) -> StructInfo {
    let members: Vec<(TokenStream, Vec<String>, Vec<RustType>)> = ts_type_lit.members.iter().map(|member| {
        parse_type_literal_members(member)
    }).collect();
    let member_token_streams = members.iter().map(|member| member.0.clone());
    let type_dependencies = members.iter().fold(vec![], |acc, member| vec![acc, member.1.clone()].concat());
    let inline_dependencies = members.iter().fold(vec![], |acc, member| vec![acc, member.2.clone()].concat());
    let token_stream = quote!(
        #[derive(serde::Serialize, serde::Deserialize, Debug, candid::CandidType, Clone)]
        struct #ts_type_ident {
            #(#member_token_streams),*
        }
    );
    StructInfo {
        token_stream,
        name: ts_type_ident.to_string(),
        type_alias_dependencies: type_dependencies,
        inline_dependencies
    }
}
