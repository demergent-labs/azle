use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote};
use swc_ecma_ast::{
    TsArrayType, TsFnType, TsKeywordType, TsKeywordTypeKind, TsPropertySignature, TsTupleType,
    TsType, TsTypeElement, TsTypeLit, TsTypeRef,
};

use crate::generators::funcs;

use crate::cdk_act::act_data_type_node::{
    ActDataTypeNode, AliasedType, EnumInfo, EnumMember, FuncInfo, GenericTypeInfo, Primitive,
    PrimitiveInfo, PrimitiveType, StructInfo, StructMember, TupleInfo, TypeAliasInfo, TypeRef,
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

fn calculate_ts_type_lit_hash_for_tuple(type_lit: &TsTupleType) -> String {
    let mut s = DefaultHasher::new();
    type_lit.hash(&mut s);
    format!("{}", s.finish()).to_string()
}

fn generate_inline_ident_for_tuple(ts_type_ref: &TsTupleType) -> Ident {
    let id = calculate_ts_type_lit_hash_for_tuple(ts_type_ref);
    format_ident!("AzleInlineTuple_{}", id)
}

pub fn ts_type_to_act_node(ts_type: &TsType, name: &Option<&Ident>) -> ActDataTypeNode {
    let rust_type = match ts_type {
        TsType::TsKeywordType(ts_keyword_type) => parse_ts_keyword_type(ts_keyword_type, name),
        TsType::TsTypeRef(ts_type_ref) => parse_ts_type_ref(ts_type_ref, name),
        TsType::TsArrayType(ts_array_type) => parse_ts_array_type(ts_array_type, name),
        TsType::TsTypeLit(ts_type_lit) => {
            ActDataTypeNode::Record(parse_ts_type_lit_as_struct(name, ts_type_lit))
        }
        TsType::TsTupleType(ts_tuple_type) => {
            ActDataTypeNode::Tuple(parse_ts_tuple_type(ts_tuple_type, name))
        }
        TsType::TsThisType(_) => todo!("ts_type_to_rust_type for TsThisType"),
        TsType::TsFnOrConstructorType(_) => {
            todo!("ts_type_to_rust_type for TsFnOorConstructorType")
        }
        TsType::TsTypeQuery(_) => todo!("ts_type_to_rust_type for TsTypeQuery"),
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

fn parse_ts_tuple_type(ts_tuple_type: &TsTupleType, name: &Option<&Ident>) -> TupleInfo {
    let inline_ident = generate_inline_ident_for_tuple(ts_tuple_type);
    let type_ident = match name {
        Some(type_ident) => type_ident,
        None => &inline_ident,
    };

    let elem_types = get_elem_types(ts_tuple_type);
    let elem_idents = elem_types.iter().map(|elem_rust_type| {
        if elem_rust_type.needs_to_be_boxed() {
            let ident = elem_rust_type.get_type_ident();
            quote!(Box<#ident>)
        } else {
            elem_rust_type.get_type_ident()
        }
    });

    let definition = quote!(
        #[derive(serde::Deserialize, Debug, candid::CandidType, Clone, AzleIntoJsValue, AzleTryFromJsValue)]
        struct #type_ident (
            #(#elem_idents),*
        );
    );

    let inline_members: Vec<ActDataTypeNode> = elem_types
        .iter()
        .filter(|elem_type| elem_type.is_inline_rust_type())
        .cloned()
        .collect();

    TupleInfo {
        identifier: quote!(#type_ident),
        definition,
        is_inline: name.is_none(),
        inline_members: Box::from(inline_members),
    }
}

fn get_elem_types(ts_tuple_type: &TsTupleType) -> Vec<ActDataTypeNode> {
    ts_tuple_type
        .elem_types
        .iter()
        .map(|elem| ts_type_to_act_node(&elem.ty, &None))
        .collect()
}

fn parse_ts_keyword_type(
    ts_keyword_type: &TsKeywordType,
    name: &Option<&Ident>,
) -> ActDataTypeNode {
    let kind = ts_keyword_type.kind;
    let token_stream = match &kind {
        TsKeywordTypeKind::TsBooleanKeyword => PrimitiveType::Bool,
        TsKeywordTypeKind::TsStringKeyword => PrimitiveType::String,
        TsKeywordTypeKind::TsVoidKeyword => PrimitiveType::Unit,
        TsKeywordTypeKind::TsNullKeyword => PrimitiveType::Null,
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
    build_act_primitive_type_node(token_stream, name)
}

fn build_act_primitive_type_node(
    primitive_type: PrimitiveType,
    name: &Option<&Ident>,
) -> ActDataTypeNode {
    let primitive = match name {
        None => Primitive::Literal(primitive_type),
        Some(name) => Primitive::TypeAlias(TypeAliasInfo {
            name: name.clone().clone(),
            aliased_type: AliasedType::Primitive(primitive_type),
        }),
    };
    ActDataTypeNode::Primitive(primitive)
}

fn build_act_custom_type_node(token_stream: TokenStream, name: &Option<&Ident>) -> ActDataTypeNode {
    let type_ref = match name {
        None => TypeRef::Literal(PrimitiveInfo {
            identifier: token_stream,
        }),
        Some(name) => TypeRef::TypeAlias(TypeAliasInfo {
            name: name.clone().clone(),
            aliased_type: AliasedType::TypeRef(token_stream),
        }),
    };
    ActDataTypeNode::TypeRef(type_ref)
}

fn parse_ts_type_ref(ts_type_ref: &TsTypeRef, name: &Option<&Ident>) -> ActDataTypeNode {
    let type_name = ts_type_ref
        .type_name
        .as_ident()
        .unwrap()
        .sym
        .chars()
        .as_str();
    match type_name {
        "blob" => build_act_primitive_type_node(PrimitiveType::Blob, name),
        "float32" => build_act_primitive_type_node(PrimitiveType::Float32, name),
        "float64" => build_act_primitive_type_node(PrimitiveType::Float64, name),
        "int" => build_act_primitive_type_node(PrimitiveType::Int, name),
        "int8" => build_act_primitive_type_node(PrimitiveType::Int8, name),
        "int16" => build_act_primitive_type_node(PrimitiveType::Int16, name),
        "int32" => build_act_primitive_type_node(PrimitiveType::Int32, name),
        "int64" => build_act_primitive_type_node(PrimitiveType::Int64, name),
        "nat" => build_act_primitive_type_node(PrimitiveType::Nat, name),
        "nat8" => build_act_primitive_type_node(PrimitiveType::Nat8, name),
        "nat16" => build_act_primitive_type_node(PrimitiveType::Nat16, name),
        "nat32" => build_act_primitive_type_node(PrimitiveType::Nat32, name),
        "nat64" => build_act_primitive_type_node(PrimitiveType::Nat64, name),
        "Principal" => build_act_primitive_type_node(PrimitiveType::Principal, name),
        "empty" => build_act_primitive_type_node(PrimitiveType::Empty, name),
        "reserved" => build_act_primitive_type_node(PrimitiveType::Reserved, name),
        "Opt" => parse_opt_type_ref(ts_type_ref),
        "Func" => parse_func_type_ref(ts_type_ref, name),
        "Variant" => parse_variant_type_ref(ts_type_ref, name),
        _ => {
            let custom_type_ref_ident = format_ident!("{}", type_name);
            build_act_custom_type_node(quote!(#custom_type_ref_ident), name)
        }
    }
}

/**
 * I am thinking of the array type as fully its own type, in elem type is just
 * part of the array type. pulling out the info from the elem type and using it
 * for the array type info is fine because we will never see the elem type info
 * otherwise. I am also currently assuming that the only way we have an enclosed type that needs to be
 */
fn parse_ts_array_type(ts_array_type: &TsArrayType, name: &Option<&Ident>) -> ActDataTypeNode {
    let elem_type = *ts_array_type.elem_type.clone();
    let elem_rust_type = ts_type_to_act_node(&elem_type, &None);
    let elem_type_ident = elem_rust_type.get_type_ident();
    let inline_enclosed_type = if elem_rust_type.is_inline_rust_type() {
        Some(elem_rust_type)
    } else {
        None
    };
    let token_stream = quote! {Vec<#elem_type_ident>};
    match name {
        Some(_) => build_act_custom_type_node(token_stream, name),
        None => ActDataTypeNode::Array(GenericTypeInfo {
            identifier: token_stream,
            enclosed_inline_type: Box::from(inline_enclosed_type),
        }),
    }
}

fn parse_opt_type_ref(ts_type_ref: &TsTypeRef) -> ActDataTypeNode {
    let type_params = ts_type_ref.type_params.clone();
    match type_params {
        Some(params) => {
            // TODO do we want to check that 0 is the only valid index?
            let enclosed_ts_type = *params.params[0].clone();
            let enclosed_rust_type = ts_type_to_act_node(&enclosed_ts_type, &None);
            let enclosed_rust_ident = enclosed_rust_type.get_type_ident();
            let inline_enclosed_type = if enclosed_rust_type.is_inline_rust_type() {
                Some(enclosed_rust_type)
            } else {
                None
            };
            ActDataTypeNode::Option(GenericTypeInfo {
                identifier: quote!(Option<#enclosed_rust_ident>),
                enclosed_inline_type: Box::from(inline_enclosed_type),
            })
        }
        None => todo!("Opt must have an enclosed type"),
    }
}

fn parse_func_type_ref(ts_type_ref: &TsTypeRef, name: &Option<&Ident>) -> ActDataTypeNode {
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
    let inline_members: Vec<ActDataTypeNode> = types
        .iter()
        .filter(|rust_type| rust_type.is_inline_rust_type())
        .cloned()
        .collect();
    let structure = funcs::generate_func_struct_and_impls(quote!(#type_ident), ts_type);
    let func_info = FuncInfo {
        identifier: quote!(#type_ident),
        definition: structure,
        is_inline: name.is_none(),
        inline_members: Box::from(inline_members),
    };
    ActDataTypeNode::Func(func_info)
}

// Same comment as parse_func_param_types
fn parse_func_return_type(ts_type: &TsFnType) -> ActDataTypeNode {
    // This feels a little weird to ignore the query update and oneway of theses fun return types, but for right now I just need the inline goodies
    match &*ts_type.type_ann.type_ann {
        TsType::TsTypeRef(type_reference) => match &type_reference.type_params {
            Some(type_param_inst) => match type_param_inst.params.get(0) {
                Some(param) => ts_type_to_act_node(&*param, &None),
                None => panic!("Func must specify exactly one return type"),
            },
            None => {
                // TODO Handle Oneways more elegantly. Probably by using the
                // funcs.rs version of this function that is much more robust
                // the only problem is that it returns a token stream  instead
                // of a rust type and we need the rust type in order to evaluate
                // any inline dependencies we have
                if type_reference
                    .type_name
                    .as_ident()
                    .unwrap()
                    .sym
                    .chars()
                    .as_str()
                    == "Oneway"
                {
                    ActDataTypeNode::TypeRef(TypeRef::Literal(PrimitiveInfo {
                        identifier: quote!(),
                    }))
                } else {
                    panic!("Func must specify a return type")
                }
            }
        },
        _ => panic!("Must be a Query or Update or Oneway (which are all type refs"),
    }
}

// TODO can we merge this with funcs.rs's get_param_types? Or have that function use
// This one and then grab the info out for the token streams?
fn parse_func_param_types(ts_type: &TsFnType) -> Vec<ActDataTypeNode> {
    ts_type
        .params
        .iter()
        .map(|param| match param {
            swc_ecma_ast::TsFnParam::Ident(ident) => match &ident.type_ann {
                Some(param_type) => {
                    let ts_type = &*param_type.type_ann;
                    ts_type_to_act_node(ts_type, &None)
                }
                None => panic!("Func parameter must have a type"),
            },
            _ => panic!("Func parameter must be an identifier"),
        })
        .collect()
}

fn parse_variant_type_ref(ts_type_ref: &TsTypeRef, name: &Option<&Ident>) -> ActDataTypeNode {
    let enclosed_type = &*ts_type_ref.type_params.as_ref().unwrap().params[0];
    let enclosed_type_lit = enclosed_type.as_ts_type_lit().unwrap();
    ActDataTypeNode::Variant(parse_ts_type_lit_as_enum(name, &enclosed_type_lit))
}

fn parse_ts_type_lit_as_enum(ts_type_ident: &Option<&Ident>, ts_type_lit: &TsTypeLit) -> EnumInfo {
    // TODO it would be much neater to have this on the same line as None, but I don't know how to do that.
    let inline_ident = generate_inline_ident(ts_type_lit);
    let type_ident = match ts_type_ident {
        Some(type_ident) => type_ident,
        None => &inline_ident,
    };
    let members: Vec<EnumMember> = ts_type_lit.members.iter().fold(vec![], |acc, member| {
        let result = parse_type_literal_members_for_enum(member);
        vec![acc, vec![result]].concat()
    });
    EnumInfo {
        is_inline: ts_type_ident.is_none(),
        name: type_ident.clone(),
        members: members,
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

    let members: Vec<StructMember> = ts_type_lit.members.iter().fold(vec![], |acc, member| {
        let structures = parse_type_literal_fields(member);
        vec![acc, vec![structures]].concat()
    });

    StructInfo {
        name: type_ident.clone(),
        members,
        is_inline: ts_type_ident.is_none(),
    }
}

fn parse_type_literal_fields(member: &TsTypeElement) -> StructMember {
    match member.as_ts_property_signature() {
        Some(prop_sig) => StructMember {
            member_name: parse_type_literal_member_name(prop_sig),
            member_type: parse_type_literal_member_type(prop_sig),
        },
        None => todo!("Handle parsing type literals if the field isn't a TsPropertySignature"),
    }
}

fn parse_type_literal_member_name(prop_sig: &TsPropertySignature) -> Ident {
    format_ident!("{}", prop_sig.key.as_ident().unwrap().sym.chars().as_str())
}

pub fn parse_type_literal_member_type(prop_sig: &TsPropertySignature) -> ActDataTypeNode {
    let type_ann = prop_sig.type_ann.clone().unwrap();
    let ts_type = *type_ann.type_ann.clone();
    ts_type_to_act_node(&ts_type, &None)
}

fn parse_type_literal_members_for_enum(member: &TsTypeElement) -> EnumMember {
    match member.as_ts_property_signature() {
        Some(prop_sig) => EnumMember {
            member_name: parse_type_literal_member_name(prop_sig),
            member_type: parse_type_literal_member_type(prop_sig),
        },
        None => todo!("Handle parsing type literals if the member isn't a TsPropertySignature"),
    }
}
