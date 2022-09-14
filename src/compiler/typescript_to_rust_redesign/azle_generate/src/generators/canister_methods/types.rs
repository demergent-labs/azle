use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote};
use swc_ecma_ast::{
    TsArrayType, TsFnType, TsKeywordType, TsKeywordTypeKind, TsPropertySignature, TsType,
    TsTypeElement, TsTypeLit, TsTypeRef,
};

use crate::generators::funcs;

use super::{
    rust_types::{EnumInfo, FuncInfo, StructInfo},
    ArrayTypeInfo, KeywordInfo, RustType, TypeRefInfo,
};

use core::panic;
use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};

fn calculate_ts_type_lit_hash(type_lit: &TsTypeLit) -> String {
    let mut s = DefaultHasher::new();
    type_lit.hash(&mut s);
    format!("{}", s.finish()).to_string()
}

fn generate_inline_ident(ts_type_lit: &TsTypeLit) -> Ident {
    let id = calculate_ts_type_lit_hash(ts_type_lit);
    // TODO could a variant and a struct produce the same hash if they have the same inline part?
    format_ident!("AzleInline_{}", id)
}

fn calculate_ts_type_lit_hash_for_type_ref(type_lit: &TsTypeRef) -> String {
    let mut s = DefaultHasher::new();
    type_lit.hash(&mut s);
    format!("{}", s.finish()).to_string()
}

fn generate_inline_ident_for_func(ts_type_ref: &TsTypeRef) -> Ident {
    let id = calculate_ts_type_lit_hash_for_type_ref(ts_type_ref);
    // TODO could a variant and a struct produce the same hash if they have the same inline part?
    format_ident!("AzleInlineFunc_{}", id)
}

pub fn ts_type_to_rust_type(ts_type: &TsType, name: &Option<&Ident>) -> RustType {
    let rust_type = match ts_type {
        TsType::TsKeywordType(ts_keyword_type) => {
            RustType::KeywordType(parse_ts_keyword_type(ts_keyword_type))
        }
        TsType::TsTypeRef(ts_type_ref) => parse_ts_type_ref(ts_type_ref, name),
        TsType::TsArrayType(ts_array_type) => {
            RustType::ArrayType(parse_ts_array_type(ts_array_type))
        }
        TsType::TsTypeLit(ts_type_lit) => {
            RustType::Struct(parse_ts_type_lit_as_struct(name, ts_type_lit))
        }
        TsType::TsThisType(_) => todo!("ts_type_to_rust_type for TsThisType"),
        TsType::TsFnOrConstructorType(_) => {
            todo!("ts_type_to_rust_type for TsFnOorConstructorType")
        }
        TsType::TsTypeQuery(_) => todo!("ts_type_to_rust_type for TsTypeQuery"),
        TsType::TsTupleType(_) => todo!("ts_type_to_rust_type for TsTupleType"),
        TsType::TsOptionalType(_) => todo!("ts_type_to_rust_type for TsOptionalType"),
        TsType::TsRestType(_) => todo!("ts_type_to_rust_type for TsRestType"),
        TsType::TsUnionOrIntersectionType(_) => {
            todo!("ts_type_to_rust_type for TsUnionOrIntersectionType")
        }
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
    rust_type
}

fn parse_ts_keyword_type(ts_keyword_type: &TsKeywordType) -> KeywordInfo {
    let kind = ts_keyword_type.kind;
    let token_stream = match &kind {
        TsKeywordTypeKind::TsBooleanKeyword => quote!(bool),
        TsKeywordTypeKind::TsStringKeyword => quote!(String),
        TsKeywordTypeKind::TsVoidKeyword => quote! {()},
        TsKeywordTypeKind::TsNullKeyword => quote! {(())},
        TsKeywordTypeKind::TsObjectKeyword => todo!("parse_ts_keyword_type for TsObjectKeyword"),
        TsKeywordTypeKind::TsNumberKeyword => todo!("parse_ts_keyword_type for TsNumberKeyword"),
        TsKeywordTypeKind::TsBigIntKeyword => todo!("parse_ts_keyword_type for TsBigIntKeyword"),
        TsKeywordTypeKind::TsNeverKeyword => todo!("parse_ts_keyword_type for TsNeverKeyword"),
        TsKeywordTypeKind::TsSymbolKeyword => todo!("parse_ts_keyword_type for TsSymbolKeyword"),
        TsKeywordTypeKind::TsIntrinsicKeyword => {
            todo!("parse_ts_keyword_type for TsIntrinsicKeyword")
        }
        TsKeywordTypeKind::TsUndefinedKeyword => {
            todo!("parse_ts_keyword_type for TsUndefinedKeyword")
        }
        TsKeywordTypeKind::TsUnknownKeyword => todo!("parse_ts_keyword_type for TsUnknownKeyword"),
        TsKeywordTypeKind::TsAnyKeyword => todo!("parse_ts_keyword_type for TsAnyKeyword"),
    };
    KeywordInfo {
        identifier: token_stream,
    }
}

fn parse_ts_type_ref(ts_type_ref: &TsTypeRef, name: &Option<&Ident>) -> RustType {
    let type_name = ts_type_ref
        .type_name
        .as_ident()
        .unwrap()
        .sym
        .chars()
        .as_str();
    match type_name {
        "blob" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(Vec<u8>),
            ..Default::default()
        }),
        "float32" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(f32),
            ..Default::default()
        }),
        "float64" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(f64),
            ..Default::default()
        }),
        "int" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(candid::Int),
            ..Default::default()
        }),
        "int8" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(i8),
            ..Default::default()
        }),
        "int16" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(i16),
            ..Default::default()
        }),
        "int32" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(i32),
            ..Default::default()
        }),
        "int64" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(i64),
            ..Default::default()
        }),
        "nat" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(candid::Nat),
            ..Default::default()
        }),
        "nat8" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(u8),
            ..Default::default()
        }),
        "nat16" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(u16),
            ..Default::default()
        }),
        "nat32" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(u32),
            ..Default::default()
        }),
        "nat64" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(u64),
            ..Default::default()
        }),
        "Principal" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(candid::Principal),
            ..Default::default()
        }),
        "empty" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(candid::Empty),
            ..Default::default()
        }),
        "reserved" => RustType::TypeRef(TypeRefInfo {
            identifier: quote!(candid::Reserved),
            ..Default::default()
        }),
        "Opt" => parse_opt_type_ref(ts_type_ref),
        "Func" => parse_func_type_ref(ts_type_ref, name),
        "Variant" => parse_variant_type_ref(ts_type_ref, name),
        _ => {
            let custom_type_ref_ident = format_ident!("{}", type_name);
            RustType::TypeRef(TypeRefInfo {
                identifier: quote!(#custom_type_ref_ident),
                ..Default::default()
            })
        }
    }
}

/**
 * I am thinking of the array type as fully its own type, in elem type is just
 * part of the array type. pulling out the info from the elem type and using it
 * for the array type info is fine because we will never see the elem type info
 * otherwise. I am also currently assuming that the only way we have an enclosed type that needs to be
 */
fn parse_ts_array_type(ts_array_type: &TsArrayType) -> ArrayTypeInfo {
    let elem_type = *ts_array_type.elem_type.clone();
    let elem_rust_type = ts_type_to_rust_type(&elem_type, &None);
    let elem_type_ident = elem_rust_type.get_type_ident();
    let inline_enclosed_type = if elem_rust_type.is_inline_rust_type() {
        Some(elem_rust_type)
    } else {
        None
    };
    ArrayTypeInfo {
        identifier: quote! {Vec<#elem_type_ident>},
        enclosed_inline_type: Box::from(inline_enclosed_type),
    }
}

fn parse_opt_type_ref(ts_type_ref: &TsTypeRef) -> RustType {
    let type_params = ts_type_ref.type_params.clone();
    match type_params {
        Some(params) => {
            // TODO do we want to check that 0 is the only valid index?
            let enclosed_ts_type = *params.params[0].clone();
            let enclosed_rust_type = ts_type_to_rust_type(&enclosed_ts_type, &None);
            let enclosed_rust_ident = enclosed_rust_type.get_type_ident();
            let inline_enclosed_type = if enclosed_rust_type.is_inline_rust_type() {
                Some(enclosed_rust_type)
            } else {
                None
            };
            RustType::TypeRef(TypeRefInfo {
                identifier: quote!(Option<#enclosed_rust_ident>),
                enclosed_inline_type: Box::from(inline_enclosed_type),
            })
        }
        None => todo!("Opt must have an enclosed type"),
    }
}

fn parse_func_type_ref(ts_type_ref: &TsTypeRef, name: &Option<&Ident>) -> RustType {
    let inline_ident = generate_inline_ident_for_func(ts_type_ref);
    let type_ident = match name {
        Some(type_ident) => type_ident,
        None => &inline_ident,
    };
    let ts_type = match &ts_type_ref.type_params {
        Some(type_params) => match &*type_params.params[0] {
            TsType::TsFnOrConstructorType(fn_or_const) => match fn_or_const {
                swc_ecma_ast::TsFnOrConstructorType::TsFnType(ts_fn_type) => ts_fn_type,
                swc_ecma_ast::TsFnOrConstructorType::TsConstructorType(_) => todo!(),
            },
            _ => todo!(),
        },
        None => todo!(),
    };
    let return_type = parse_func_return_type(ts_type);
    let param_types = parse_func_param_types(ts_type);
    let types = vec![vec![return_type], param_types].concat();
    let inline_members: Vec<RustType> = types
        .iter()
        .filter(|rust_type| rust_type.is_inline_rust_type())
        .cloned()
        .collect();
    let structure = funcs::generate_func_struct_and_impls_structure(quote!(#type_ident), ts_type);
    let func_info = FuncInfo {
        identifier: quote!(#type_ident),
        structure,
        is_inline: name.is_none(),
        inline_members: Box::from(inline_members),
    };
    RustType::Func(func_info)
}

// Same comment as parse_func_param_types
fn parse_func_return_type(ts_type: &TsFnType) -> RustType {
    // This feels a little weird to ignore the query update and oneway of theses fun return types, but for right now I just need the inline goodies
    match &*ts_type.type_ann.type_ann {
        TsType::TsTypeRef(type_reference) => match &type_reference.type_params {
            Some(type_param_inst) => match type_param_inst.params.get(0) {
                Some(param) => ts_type_to_rust_type(&*param, &None),
                None => todo!(),
            },
            None => todo!(),
        },
        _ => panic!("Must be a Query or Update or Oneway (which are all type refs"),
    }
}

// TODO can we merge this with funcs.rs's get_param_types? Or have that function use
// This one and then grab the info out for the token streams?
fn parse_func_param_types(ts_type: &TsFnType) -> Vec<RustType> {
    ts_type
        .params
        .iter()
        .map(|param| match param {
            swc_ecma_ast::TsFnParam::Ident(ident) => match &ident.type_ann {
                Some(param_type) => {
                    let ts_type = &*param_type.type_ann;
                    ts_type_to_rust_type(ts_type, &None)
                }
                None => panic!("Func paramter must have a type"),
            },
            _ => panic!("Func parameter must be an identifier"),
        })
        .collect()
}

fn parse_variant_type_ref(ts_type_ref: &TsTypeRef, name: &Option<&Ident>) -> RustType {
    let enclosed_type = &*ts_type_ref.type_params.as_ref().unwrap().params[0];
    let enclosed_type_lit = enclosed_type.as_ts_type_lit().unwrap();
    RustType::Enum(parse_ts_type_lit_as_enum(name, &enclosed_type_lit))
}

fn parse_ts_type_lit_as_enum(ts_type_ident: &Option<&Ident>, ts_type_lit: &TsTypeLit) -> EnumInfo {
    // TODO it would be much neater to have this on the same line as None, but I don't know how to do that.
    let inline_ident = generate_inline_ident(ts_type_lit);
    let type_ident = match ts_type_ident {
        Some(type_ident) => type_ident,
        None => &inline_ident,
    };
    let members: Vec<(TokenStream, Option<RustType>)> =
        ts_type_lit.members.iter().fold(vec![], |acc, member| {
            let (result, inline_deps) = parse_type_literal_members_for_enum(member);
            vec![acc, vec![(result, inline_deps)]].concat()
        });
    let field_token_streams = members.iter().map(|(field, _)| field.clone());
    let inline_dependencies: Vec<RustType> =
        members
            .iter()
            .fold(vec![], |acc, (_, inline_deps)| match inline_deps {
                Some(inline_dep) => vec![acc, vec![inline_dep.clone()]].concat(),
                None => acc,
            });
    let structure = quote!(
        #[derive(serde::Deserialize, Debug, candid::CandidType, Clone, AzleIntoJsValue, AzleTryFromJsValue)]
        enum #type_ident {
            #(#field_token_streams),*
        }
    );
    EnumInfo {
        structure,
        identifier: quote!(#type_ident),
        is_inline: ts_type_ident.is_none(),
        inline_members: Box::from(inline_dependencies),
    }
}

fn parse_ts_type_lit_as_struct(
    ts_type_ident: &Option<&Ident>,
    ts_type_lit: &TsTypeLit,
) -> StructInfo {
    // TODO it would be much neater to have this on the same line as None, but I don't know how to do that.
    let inline_ident = generate_inline_ident(ts_type_lit);
    let type_ident = match ts_type_ident {
        Some(type_ident) => type_ident,
        None => &inline_ident,
    };
    let fields: Vec<(TokenStream, Option<RustType>)> =
        ts_type_lit.members.iter().fold(vec![], |acc, member| {
            let (structures, inline_deps) = parse_type_literal_fields(member);
            vec![acc, vec![(structures, inline_deps)]].concat()
        });
    let field_token_streams = fields.iter().map(|(field, _)| field.clone());
    let inline_dependencies: Vec<RustType> =
        fields
            .iter()
            .fold(vec![], |acc, (_, inline_deps)| match &inline_deps {
                Some(struct_info) => vec![acc, vec![struct_info.clone()]].concat(),
                None => acc,
            });
    let structure = quote!(
        #[derive(serde::Deserialize, Debug, candid::CandidType, Clone, AzleIntoJsValue, AzleTryFromJsValue)]
        struct #type_ident {
            #(#field_token_streams),*
        }
    );
    let result = StructInfo {
        structure: structure.clone(),
        identifier: quote!(#type_ident),
        is_inline: ts_type_ident.is_none(),
        inline_members: Box::from(inline_dependencies),
    };

    result
}

fn parse_type_literal_fields(member: &TsTypeElement) -> (TokenStream, Option<RustType>) {
    match member.as_ts_property_signature() {
        Some(prop_sig) => {
            let member_name = parse_type_literal_member_name(prop_sig);
            let member_type = parse_type_literal_member_type(prop_sig);
            let member_type_token_stream = member_type.get_type_ident();
            let inline_enclosed_type = if member_type.is_inline_rust_type() {
                Some(member_type)
            } else {
                None
            };
            (
                quote!(#member_name: #member_type_token_stream),
                inline_enclosed_type,
            )
        }
        None => todo!("Handle parsing type literals if the field isn't a TsPropertySignature"),
    }
}

fn parse_type_literal_member_name(prop_sig: &TsPropertySignature) -> Ident {
    format_ident!("{}", prop_sig.key.as_ident().unwrap().sym.chars().as_str())
}

pub fn parse_type_literal_member_type(prop_sig: &TsPropertySignature) -> RustType {
    let type_ann = prop_sig.type_ann.clone().unwrap();
    let ts_type = *type_ann.type_ann.clone();
    ts_type_to_rust_type(&ts_type, &None)
}

fn parse_type_literal_members_for_enum(member: &TsTypeElement) -> (TokenStream, Option<RustType>) {
    match member.as_ts_property_signature() {
        Some(prop_sig) => {
            let member_name = parse_type_literal_member_name(prop_sig);
            let member_type = parse_type_literal_member_type(prop_sig);
            let member_type_token_stream = match member_type.clone() {
                RustType::KeywordType(keyword_type_info) => {
                    if keyword_type_info.identifier.to_string() == quote!((())).to_string() {
                        quote!()
                    } else {
                        let member_type_token_stream = member_type.get_type_ident();
                        quote!((#member_type_token_stream))
                    }
                }
                _ => {
                    let member_type_token_stream = member_type.get_type_ident();
                    quote!((#member_type_token_stream))
                }
            };
            let member_inline_dependencies = if member_type.is_inline_rust_type() {
                Some(member_type)
            } else {
                None
            };
            (
                quote! {#member_name#member_type_token_stream},
                member_inline_dependencies,
            )
        }
        None => todo!("Handle parsing type literals if the member isn't a TsPropertySignature"),
    }
}
