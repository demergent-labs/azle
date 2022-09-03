use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote};
use swc_ecma_ast::{
    TsArrayType, TsKeywordType, TsKeywordTypeKind, TsPropertySignature, TsType, TsTypeElement,
    TsTypeLit, TsTypeRef,
};
use uuid::Uuid;

use super::{rust_types::StructInfo, ArrayTypeInfo, KeywordInfo, RustType, TypeRefInfo};

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
                    let id = Uuid::new_v4().to_string().replace("-", "_");
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
        "Func" => TypeRefInfo {
            identifier: quote!(candid::Func),
            ..Default::default()
        },
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
                _ => None,
            };
            TypeRefInfo {
                identifier: quote!(#enclosed_rust_ident),
                type_alias_dependency,
                inline_enclosed_type,
            }
        }
        None => todo!("Variant must have an enclosed type"),
    }
}

fn ts_type_to_rust_enum(ts_type: &TsType) -> RustType {
    return RustType::KeywordType(KeywordInfo {
        identifier: quote! {},
    });
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
        name: ts_type_ident.to_string(),
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

fn azle_variant_to_rust_enum(ts_type_ident: &Ident, ts_type_lit: &TsTypeLit) -> EnumInfo {
    let fields: Vec<(TokenStream, Vec<String>)> =
        ts_type_lit.members.iter().fold(vec![], |acc, member| {
            let (result, type_alias_deps) = parse_type_literal_members_for_enum(member);
            vec![acc, vec![(result, type_alias_deps)]].concat()
        });
    // let members: Vec<(TokenStream, Vec<String>)> = ts_type_lit.members.iter().map(|member| {
    //     parse_type_literal_members_for_enum(member, count)
    // }).collect();
    let member_token_streams = fields.iter().map(|(member, _)| member.clone());
    let type_dependencies = fields
        .iter()
        .fold(vec![], |acc, member| vec![acc, member.1.clone()].concat());
    let token_stream = quote!(
        #[derive(serde::Serialize, serde::Deserialize, Debug, candid::CandidType, Clone)]
        enum #ts_type_ident {
            #(#member_token_streams),*
        }
    );
    EnumInfo {
        token_stream,
        name: "CoolEnumBro".to_string(),
        type_alias_dependencies: type_dependencies,
    }
}

fn parse_type_literal_members_for_enum(member: &TsTypeElement) -> (TokenStream, Vec<String>) {
    match member.as_ts_property_signature() {
        Some(prop_sig) => {
            let variant_name = parse_type_literal_field_name(prop_sig);
            let variant_type = parse_type_literal_field_type(prop_sig);
            if !prop_sig.optional {
                todo!("Handle if the user didn't make the type optional");
            }
            let member_type_token_stream = variant_type.get_type_ident();
            let type_dependencies = variant_type.get_type_alias_dependency();
            (
                quote! {#variant_name(#member_type_token_stream)},
                type_dependencies,
            )
        }
        None => todo!("Handle parsing type literals if the member isn't a TsPropertySignature"),
    }
}

// The idea is that you can put the name into a token stream and (which should be pretty much the same, and that will work after you install all of the dependencies)

// TODO I think the next thing I need to do is understand what I am doing with the
// Collect dependencies. My current theory is that I would have a struct not be a
// Struct type but have it be a type ref with a struct as a dependency
// It might be helpful to think about the keywords
// Maybe have simpler examples, work out the architecture,
// Determine where I determine the dependancies and make sure it's clear in the code
#[derive(Clone)]
pub struct EnumInfo {
    pub token_stream: TokenStream,
    pub name: String,
    pub type_alias_dependencies: Vec<String>,
}
