use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote};
use swc_ecma_ast::{
    TsArrayType, TsKeywordType, TsKeywordTypeKind, TsPropertySignature, TsType, TsTypeElement,
    TsTypeLit, TsTypeRef,
};

use super::{
    rust_types::{EnumInfo, StructInfo},
    ArrayTypeInfo, KeywordInfo, RustType, TypeRefInfo,
};

use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};

fn calculate_ts_type_lit_hash(type_lit: &TsTypeLit) -> String {
    let mut s = DefaultHasher::new();
    type_lit.hash(&mut s);
    format!("{}", s.finish()).to_string()
}

pub fn ts_type_to_rust_type(ts_type: &TsType, struct_name: Option<&Ident>) -> RustType {
    let rust_type = match ts_type {
        TsType::TsKeywordType(ts_keyword_type) => {
            RustType::KeywordType(parse_ts_keyword_type(ts_keyword_type))
        }
        TsType::TsTypeRef(ts_type_ref) => {
            let type_ref_info = parse_ts_type_ref(ts_type_ref);
            RustType::TypeRef(type_ref_info)
        }
        TsType::TsArrayType(ts_array_type) => {
            let array_type_info = parse_ts_array_type(ts_array_type);
            RustType::ArrayType(array_type_info)
        }
        TsType::TsTypeLit(ts_type_lit) => {
            let type_ident = match struct_name {
                Some(type_ident) => type_ident.clone(),
                None => {
                    let id = calculate_ts_type_lit_hash(ts_type_lit);
                    let type_ident = format_ident!("AzleInlineStruct_{}", id);
                    type_ident
                }
            };
            let struct_info = ts_type_literal_to_rust_struct(&type_ident, ts_type_lit);
            let struct_info = struct_info;
            RustType::Struct(struct_info)
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

fn parse_ts_type_ref(ts_type_ref: &TsTypeRef) -> TypeRefInfo {
    let type_name = ts_type_ref
        .type_name
        .as_ident()
        .unwrap()
        .sym
        .chars()
        .as_str();
    match type_name {
        "blob" => TypeRefInfo {
            identifier: quote!(Vec<u8>),
            ..Default::default()
        },
        "float32" => TypeRefInfo {
            identifier: quote!(f32),
            ..Default::default()
        },
        "float64" => TypeRefInfo {
            identifier: quote!(f64),
            ..Default::default()
        },
        "int" => TypeRefInfo {
            identifier: quote!(candid::Int),
            ..Default::default()
        },
        "int8" => TypeRefInfo {
            identifier: quote!(i8),
            ..Default::default()
        },
        "int16" => TypeRefInfo {
            identifier: quote!(i16),
            ..Default::default()
        },
        "int32" => TypeRefInfo {
            identifier: quote!(i32),
            ..Default::default()
        },
        "int64" => TypeRefInfo {
            identifier: quote!(i64),
            ..Default::default()
        },
        "nat" => TypeRefInfo {
            identifier: quote!(candid::Nat),
            ..Default::default()
        },
        "nat8" => TypeRefInfo {
            identifier: quote!(u8),
            ..Default::default()
        },
        "nat16" => TypeRefInfo {
            identifier: quote!(u16),
            ..Default::default()
        },
        "nat32" => TypeRefInfo {
            identifier: quote!(u32),
            ..Default::default()
        },
        "nat64" => TypeRefInfo {
            identifier: quote!(u64),
            ..Default::default()
        },
        "Principal" => TypeRefInfo {
            identifier: quote!(candid::Principal),
            ..Default::default()
        },
        "empty" => TypeRefInfo {
            identifier: quote!(candid::Empty),
            ..Default::default()
        },
        "reserved" => TypeRefInfo {
            identifier: quote!(candid::Reserved),
            ..Default::default()
        },
        "Opt" => parse_opt_type_ref(ts_type_ref),
        // TODO: We may want to inline the func implementation here.
        // "Func" => TypeRefInfo {
        //     identifier: quote!(candid::Func),
        //     ..Default::default()
        // },
        "Variant" => parse_variant_type_ref(ts_type_ref),
        _ => {
            let custom_type_ref_ident = format_ident!("{}", type_name);
            TypeRefInfo {
                identifier: quote!(#custom_type_ref_ident),
                type_alias_dependency: Some(type_name.to_string()),
                ..Default::default()
            }
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
    let elem_rust_type = ts_type_to_rust_type(&elem_type, None);
    let elem_type_ident = elem_rust_type.get_type_ident();
    let type_alias_dependency = match &elem_rust_type {
        RustType::TypeRef(type_ref_info) => type_ref_info.type_alias_dependency.clone(),
        RustType::ArrayType(array_type) => array_type.type_alias_dependency.clone(),
        RustType::KeywordType(_) => None,
        RustType::Struct(_) => None,
        RustType::Enum(_) => todo!("parse_ts_array_type for Enum"),
    };
    let inline_enclosed_type = match &elem_rust_type {
        RustType::Struct(struct_info) => Some(struct_info.clone()),
        _ => None,
    };
    ArrayTypeInfo {
        identifier: quote! {Vec<#elem_type_ident>},
        type_alias_dependency,
        inline_enclosed_type,
    }
}

fn parse_opt_type_ref(ts_type_ref: &TsTypeRef) -> TypeRefInfo {
    let type_params = ts_type_ref.type_params.clone();
    match type_params {
        Some(params) => {
            // TODO do we want to check that 0 is the only valid index?
            let enclosed_ts_type = *params.params[0].clone();
            let enclosed_rust_type = ts_type_to_rust_type(&enclosed_ts_type, None);
            let enclosed_rust_ident = enclosed_rust_type.get_type_ident();
            let type_alias_dependency = match &enclosed_rust_type {
                RustType::TypeRef(type_ref_info) => type_ref_info.type_alias_dependency.clone(),
                RustType::ArrayType(array_type) => array_type.type_alias_dependency.clone(),
                RustType::KeywordType(_) => None,
                RustType::Struct(_) => None,
                RustType::Enum(_) => todo!("parse_opt_type_ref for Enums"),
            };
            let inline_enclosed_type = match &enclosed_rust_type {
                RustType::Struct(struct_info) => Some(struct_info.clone()),
                _ => None,
            };
            TypeRefInfo {
                identifier: quote!(Option<#enclosed_rust_ident>),
                type_alias_dependency,
                inline_enclosed_type,
            }
        }
        None => todo!("Opt must have an enclosed type"),
    }
}

fn parse_variant_type_ref(ts_type_ref: &TsTypeRef) -> TypeRefInfo {
    todo!("parse_variant_type_ref for {:#?}", ts_type_ref);
}

pub fn ts_type_literal_to_rust_enum(ts_type_ident: &Ident, ts_type_lit: &TsTypeLit) -> EnumInfo {
    let fields: Vec<(TokenStream, Vec<String>, Option<StructInfo>)> =
        ts_type_lit.members.iter().fold(vec![], |acc, member| {
            let (result, type_alias_deps, inline_deps) =
                parse_type_literal_members_for_enum(member);
            vec![acc, vec![(result, type_alias_deps, inline_deps)]].concat()
        });
    let field_token_streams = fields.iter().map(|(field, _, _)| field.clone());
    let type_dependencies = fields
        .iter()
        .fold(vec![], |acc, (_, deps, _)| vec![acc, deps.clone()].concat());
    let inline_dependencies: Vec<StructInfo> =
        fields
            .iter()
            .fold(vec![], |acc, (_, _, inline_deps)| match &inline_deps {
                Some(struct_info) => vec![acc, vec![struct_info.clone()]].concat(),
                None => acc,
            });
    let structure = quote!(
        #[derive(serde::Serialize, serde::Deserialize, Debug, candid::CandidType, Clone, AzleIntoJsValue, AzleTryFromJsValue)]
        enum #ts_type_ident {
            #(#field_token_streams),*
        }
    );
    EnumInfo {
        structure,
        identifier: quote!(#ts_type_ident),
        type_alias_dependencies: type_dependencies,
        inline_dependencies: Box::from(inline_dependencies),
    }
}

fn ts_type_literal_to_rust_struct(ts_type_ident: &Ident, ts_type_lit: &TsTypeLit) -> StructInfo {
    let fields: Vec<(TokenStream, Vec<String>, Option<StructInfo>)> =
        ts_type_lit.members.iter().fold(vec![], |acc, member| {
            let (structures, type_alias_deps, inline_deps) = parse_type_literal_fields(member);
            vec![acc, vec![(structures, type_alias_deps, inline_deps)]].concat()
        });
    let field_token_streams = fields.iter().map(|(field, _, _)| field.clone());
    let type_dependencies = fields
        .iter()
        .fold(vec![], |acc, (_, deps, _)| vec![acc, deps.clone()].concat());
    let inline_dependencies: Vec<StructInfo> =
        fields
            .iter()
            .fold(vec![], |acc, (_, _, inline_deps)| match &inline_deps {
                Some(struct_info) => vec![acc, vec![struct_info.clone()]].concat(),
                None => acc,
            });
    let structure = quote!(
        #[derive(serde::Serialize, serde::Deserialize, Debug, candid::CandidType, Clone, AzleIntoJsValue, AzleTryFromJsValue)]
        struct #ts_type_ident {
            #(#field_token_streams),*
        }
    );
    StructInfo {
        structure,
        identifier: quote!(#ts_type_ident),
        type_alias_dependencies: type_dependencies,
        inline_dependencies: Box::from(inline_dependencies),
    }
}

fn parse_type_literal_fields(
    field: &TsTypeElement,
) -> (TokenStream, Vec<String>, Option<StructInfo>) {
    match field.as_ts_property_signature() {
        Some(prop_sig) => {
            let field_name = parse_type_literal_field_name(prop_sig);
            let field_type = parse_type_literal_field_type(prop_sig);
            let field_type_token_stream = field_type.get_type_ident();
            let type_dependencies = field_type.get_type_alias_dependency();
            let inline_enclosed_type = match &field_type {
                RustType::Struct(struct_info) => Some(struct_info.clone()),
                _ => None,
            };
            (
                quote!(#field_name: #field_type_token_stream),
                type_dependencies,
                inline_enclosed_type,
            )
        }
        None => todo!("Handle parsing type literals if the field isn't a TsPropertySignature"),
    }
}

fn parse_type_literal_field_name(prop_sig: &TsPropertySignature) -> Ident {
    format_ident!("{}", prop_sig.key.as_ident().unwrap().sym.chars().as_str())
}

fn parse_type_literal_field_type(prop_sig: &TsPropertySignature) -> RustType {
    let type_ann = prop_sig.type_ann.clone().unwrap();
    let ts_type = *type_ann.type_ann.clone();
    ts_type_to_rust_type(&ts_type, None)
}

fn parse_type_literal_members_for_enum(
    member: &TsTypeElement,
) -> (TokenStream, Vec<String>, Option<StructInfo>) {
    match member.as_ts_property_signature() {
        Some(prop_sig) => {
            let variant_name = parse_type_literal_field_name(prop_sig);
            let variant_type = parse_type_literal_field_type(prop_sig);
            let variant_value = match variant_type.clone() {
                RustType::KeywordType(keyword_type_info) => {
                    if keyword_type_info.identifier.to_string() == quote!((())).to_string() {
                        quote!()
                    } else {
                        let member_type_token_stream = variant_type.get_type_ident();
                        quote!((#member_type_token_stream))
                    }
                }
                _ => {
                    let member_type_token_stream = variant_type.get_type_ident();
                    quote!((#member_type_token_stream))
                }
            };
            let type_dependencies = variant_type.get_type_alias_dependency();
            (
                quote! {#variant_name#variant_value},
                type_dependencies,
                None, // TODO actually return something instead of None
            )
        }
        None => todo!("Handle parsing type literals if the member isn't a TsPropertySignature"),
    }
}
