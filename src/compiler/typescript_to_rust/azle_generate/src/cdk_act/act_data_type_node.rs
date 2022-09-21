use std::collections::HashMap;

use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote, ToTokens};

use crate::generators::funcs;

#[derive(Clone, Debug)]
pub enum ActDataTypeNode {
    Primitive(Primitive),
    Option(GenericTypeInfo),
    TypeRef(TypeRef),
    Array(ArrayTypeInfo),
    Record(StructInfo),
    Variant(EnumInfo),
    Func(FuncInfo),
    Tuple(TupleInfo),
}

#[derive(Clone, Debug)]
pub enum Primitive {
    Literal(PrimitiveType),
    TypeAlias(TypeAliasInfo),
}

#[derive(Clone, Debug)]
pub enum TypeRef {
    Literal(TypeRefInfo),
    TypeAlias(TypeAliasInfo),
}

#[derive(Clone, Debug)]
pub enum ArrayTypeInfo {
    Literal(ArrayLiteral),
    TypeAlias(ArrayTypeAlias),
}

#[derive(Clone, Debug)]
pub struct ArrayLiteral {
    pub token_stream: TokenStream,
    pub enclosed_inline_type: Box<Option<ActDataTypeNode>>,
}

#[derive(Clone, Debug)]
pub struct ArrayTypeAlias {
    pub name: String,
    pub aliased_type: TokenStream,
    pub enclosed_inline_type: Box<Option<ActDataTypeNode>>,
}

impl ArrayTypeAlias {
    pub fn to_token_stream(&self) -> TokenStream {
        let name = &self.name.to_ident().to_token_stream();
        let aliased_type = &self.aliased_type;
        quote!(type #name = #aliased_type;)
    }
}

#[derive(Clone, Debug)]
pub struct TypeAliasInfo {
    pub name: String,
    pub aliased_type: AliasedType,
}

impl TypeAliasInfo {
    pub fn to_token_stream(&self) -> TokenStream {
        let name = self.name.to_ident().to_token_stream();
        let alias = self.aliased_type.to_token_stream();
        quote!(type #name = #alias;)
    }
}

#[derive(Clone, Debug)]
pub enum AliasedType {
    Primitive(PrimitiveType),
    TypeRef(String),
}

impl AliasedType {
    pub fn to_token_stream(&self) -> TokenStream {
        match self {
            AliasedType::Primitive(primitive) => primitive.to_token_stream(),
            AliasedType::TypeRef(type_ref) => type_ref.to_ident().into_token_stream(), // TODO this can't possible work can it?
        }
    }
}

#[derive(Clone, Debug)]
pub enum PrimitiveType {
    Bool,
    Blob,
    Empty,
    Float32,
    Float64,
    Int,
    Int8,
    Int16,
    Int32,
    Int64,
    Nat,
    Nat8,
    Nat16,
    Nat32,
    Nat64,
    Null,
    Principal,
    Reserved,
    String,
    Unit,
}

impl PrimitiveType {
    pub fn to_token_stream(&self) -> TokenStream {
        match self {
            PrimitiveType::Bool => quote!(bool),
            PrimitiveType::Blob => quote!(Vec<u8>),
            PrimitiveType::Empty => quote!(candid::Empty),
            PrimitiveType::Float32 => quote!(f32),
            PrimitiveType::Float64 => quote!(f64),
            PrimitiveType::Int => quote!(candid::Int),
            PrimitiveType::Int8 => quote!(i8),
            PrimitiveType::Int16 => quote!(i16),
            PrimitiveType::Int32 => quote!(i32),
            PrimitiveType::Int64 => quote!(i64),
            PrimitiveType::Nat => quote!(candid::Nat),
            PrimitiveType::Nat8 => quote!(u8),
            PrimitiveType::Nat16 => quote!(u16),
            PrimitiveType::Nat32 => quote!(u32),
            PrimitiveType::Nat64 => quote!(u64),
            PrimitiveType::Null => quote! {(())},
            PrimitiveType::Principal => quote!(candid::Principal),
            PrimitiveType::Reserved => quote!(candid::Reserved),
            PrimitiveType::String => quote!(String),
            PrimitiveType::Unit => quote! {()},
        }
    }
}

#[derive(Clone, Debug)]
pub struct TypeRefInfo {
    pub name: String,
}

#[derive(Clone, Debug)]
pub struct GenericTypeInfo {
    pub name: Option<String>,
    pub identifier: TokenStream,
    pub enclosed_inline_type: Box<Option<ActDataTypeNode>>,
}

#[derive(Clone, Debug)]
pub struct StructInfo {
    pub name: String,
    pub members: Vec<StructMember>,
    pub is_inline: bool,
}

impl StructInfo {
    pub fn to_token_stream(&self) -> TokenStream {
        let type_ident = &self.name.to_ident();
        let member_token_streams: Vec<TokenStream> = self
            .members
            .iter()
            .map(|member| member.to_token_stream())
            .collect();
        quote!(
            #[derive(serde::Deserialize, Debug, candid::CandidType, Clone, AzleIntoJsValue, AzleTryFromJsValue)]
            struct #type_ident {
                #(#member_token_streams),*
            }
        )
    }
}

impl EnumInfo {
    pub fn to_token_stream(&self) -> TokenStream {
        let type_ident = &self.name.to_ident();
        let member_token_streams: Vec<TokenStream> = self
            .members
            .iter()
            .map(|member| member.to_token_stream())
            .collect();
        quote!(
            #[derive(serde::Deserialize, Debug, candid::CandidType, Clone, AzleIntoJsValue, AzleTryFromJsValue)]
            enum #type_ident {
                #(#member_token_streams),*
            }
        )
    }
}

#[derive(Clone, Debug)]
pub struct EnumInfo {
    pub name: String,
    pub members: Vec<EnumMember>,
    pub is_inline: bool,
}

#[derive(Clone, Debug)]
pub struct FuncInfo {
    pub name: String,
    pub params: Vec<ActDataTypeNode>,
    pub return_type: Box<ActDataTypeNode>,
    pub param_strings: Vec<String>,
    pub return_string: String,
    pub mode: String,
    pub is_inline: bool,
}

impl FuncInfo {
    pub fn to_token_stream(&self) -> TokenStream {
        funcs::generate_func_struct_and_impls(
            &self.name.to_ident(),
            &self.mode,
            &self.param_strings,
            &self.return_string,
        )
    }
}

impl TupleInfo {
    pub fn to_token_stream(&self) -> TokenStream {
        let type_ident = &self.name.to_ident();
        let elem_idents: Vec<TokenStream> = self
            .elems
            .iter()
            .map(|elem| elem.to_token_stream())
            .collect();
        quote!(
            #[derive(serde::Deserialize, Debug, candid::CandidType, Clone, AzleIntoJsValue, AzleTryFromJsValue)]
            struct #type_ident (
                #(#elem_idents),*
            );
        )
    }
}

#[derive(Clone, Debug)]
pub struct TupleInfo {
    pub name: String,
    pub elems: Vec<TupleElem>,
    pub is_inline: bool,
}

#[derive(Clone, Debug)]
pub struct TupleElem {
    pub elem_type: ActDataTypeNode,
}

impl TupleElem {
    pub fn to_token_stream(&self) -> TokenStream {
        if self.elem_type.needs_to_be_boxed() {
            let ident = self.elem_type.get_type_ident();
            quote!(Box<#ident>)
        } else {
            self.elem_type.get_type_ident()
        }
    }
}

#[derive(Clone, Debug)]
pub struct StructMember {
    pub member_name: String,
    pub member_type: ActDataTypeNode,
}

#[derive(Clone, Debug)]
pub struct EnumMember {
    pub member_name: String,
    pub member_type: ActDataTypeNode,
}

impl EnumMember {
    pub fn to_token_stream(&self) -> TokenStream {
        let member_type_token_stream = match self.member_type.clone() {
            ActDataTypeNode::Primitive(_) => {
                if self.member_type.get_type_ident().to_string() == quote!((())).to_string() {
                    quote!()
                } else {
                    let member_type_token_stream = self.member_type.get_type_ident();
                    quote!((#member_type_token_stream))
                }
            }
            _ => {
                let member_type_token_stream = if self.member_type.needs_to_be_boxed() {
                    let ident = self.member_type.get_type_ident();
                    quote!(Box<#ident>)
                } else {
                    self.member_type.get_type_ident()
                };
                quote!((#member_type_token_stream))
            }
        };
        let member_name = &self.member_name.to_ident();
        quote! {#member_name#member_type_token_stream}
    }
}

impl StructMember {
    pub fn to_token_stream(&self) -> TokenStream {
        let member_type_token_stream = if self.member_type.needs_to_be_boxed() {
            let ident = self.member_type.get_type_ident();
            quote!(Box<#ident>)
        } else {
            self.member_type.get_type_ident()
        };
        let member_name = &self.member_name.to_ident();
        quote!(#member_name: #member_type_token_stream)
    }
}

pub trait Identable {
    fn to_ident(&self) -> Ident;
}

impl Identable for String {
    fn to_ident(&self) -> Ident {
        format_ident!("{}", self)
    }
}

impl ActDataTypeNode {
    // TODO change this to Ident? Or String? or at the very least have the match return an ident and then wrap the result in a quote?
    pub fn get_type_ident(&self) -> TokenStream {
        match self {
            ActDataTypeNode::Primitive(primitive) => match primitive {
                Primitive::Literal(literal) => literal.to_token_stream(),
                Primitive::TypeAlias(type_alias) => type_alias.name.to_ident().to_token_stream(),
            },
            ActDataTypeNode::TypeRef(type_ref) => match type_ref {
                TypeRef::Literal(literal) => literal.name.to_ident().to_token_stream(),
                TypeRef::TypeAlias(type_alias) => type_alias.name.to_ident().to_token_stream(),
            },
            ActDataTypeNode::Array(array_info) => match array_info {
                ArrayTypeInfo::Literal(literal) => literal.token_stream.clone(),
                ArrayTypeInfo::TypeAlias(type_alias) => {
                    type_alias.name.to_ident().to_token_stream()
                }
            },
            ActDataTypeNode::Record(struct_info) => struct_info.name.to_ident().to_token_stream(),
            ActDataTypeNode::Variant(enum_info) => enum_info.name.to_ident().to_token_stream(),
            ActDataTypeNode::Func(func_info) => func_info.name.to_ident().to_token_stream(),
            ActDataTypeNode::Tuple(tuple_info) => tuple_info.name.to_ident().to_token_stream(),
            ActDataTypeNode::Option(option_info) => option_info.identifier.clone(),
        }
    }

    // TODO change is_inline to needs to be defined?
    pub fn is_inline_rust_type(&self) -> bool {
        match self {
            ActDataTypeNode::Primitive(_) => false,
            ActDataTypeNode::TypeRef(_) => false,
            ActDataTypeNode::Array(array_type_info) => match array_type_info {
                ArrayTypeInfo::Literal(literal) => literal.enclosed_inline_type.is_some(),
                ArrayTypeInfo::TypeAlias(type_alias) => type_alias.enclosed_inline_type.is_some(),
            },
            ActDataTypeNode::Record(struct_info) => struct_info.is_inline,
            ActDataTypeNode::Variant(enum_info) => enum_info.is_inline,
            ActDataTypeNode::Func(func_info) => func_info.is_inline,
            ActDataTypeNode::Tuple(tuple_info) => tuple_info.is_inline,
            ActDataTypeNode::Option(option_info) => option_info.enclosed_inline_type.is_some(),
        }
    }

    pub fn get_definition(&self) -> Option<TokenStream> {
        match self {
            ActDataTypeNode::Record(struct_info) => Some(struct_info.to_token_stream()),
            ActDataTypeNode::Variant(enum_info) => Some(enum_info.to_token_stream()),
            ActDataTypeNode::Func(func_info) => Some(func_info.to_token_stream()),
            ActDataTypeNode::Tuple(tuple_info) => Some(tuple_info.to_token_stream()),
            ActDataTypeNode::Primitive(primitive) => match primitive {
                Primitive::Literal(_) => None,
                Primitive::TypeAlias(type_alias) => Some(type_alias.to_token_stream()),
            },
            ActDataTypeNode::TypeRef(type_ref) => match type_ref {
                TypeRef::Literal(_) => None,
                TypeRef::TypeAlias(type_alias) => Some(type_alias.to_token_stream()),
            },
            ActDataTypeNode::Option(type_ref_info) => match &*type_ref_info.enclosed_inline_type {
                Some(inline_type) => inline_type.get_definition(),
                None => None,
            },
            ActDataTypeNode::Array(array_type_info) => match array_type_info {
                ArrayTypeInfo::Literal(literal) => match &*literal.enclosed_inline_type {
                    Some(inline_type) => inline_type.get_definition(),
                    None => None,
                },
                ArrayTypeInfo::TypeAlias(type_alias) => match &*type_alias.enclosed_inline_type {
                    Some(inline_type) => inline_type.get_definition(),
                    None => Some(type_alias.to_token_stream()),
                },
            },
        }
    }

    pub fn needs_to_be_boxed(&self) -> bool {
        true
    }

    pub fn get_inline_members(&self) -> Vec<ActDataTypeNode> {
        match self {
            ActDataTypeNode::Record(struct_info) => struct_info
                .members
                .iter()
                .filter(|member| member.member_type.is_inline_rust_type())
                .map(|member| member.member_type.clone())
                .collect(),
            ActDataTypeNode::Variant(enum_info) => enum_info
                .members
                .iter()
                .filter(|member| member.member_type.is_inline_rust_type())
                .map(|member| member.member_type.clone())
                .collect(),
            ActDataTypeNode::Func(func_info) => vec![
                func_info.params.clone(),
                vec![*func_info.return_type.clone()],
            ]
            .concat()
            .iter()
            .filter(|elem| elem.is_inline_rust_type())
            .cloned()
            .collect(),
            ActDataTypeNode::Primitive(_) => vec![],
            ActDataTypeNode::TypeRef(_) => vec![],
            ActDataTypeNode::Array(_) => vec![],
            ActDataTypeNode::Tuple(tuple_info) => tuple_info
                .elems
                .iter()
                .filter(|member| member.elem_type.is_inline_rust_type())
                .map(|elem| elem.elem_type.clone())
                .collect(),
            ActDataTypeNode::Option(_) => vec![],
        }
    }

    pub fn collect_inline_types(&self) -> Vec<ActDataTypeNode> {
        // TODO I'm not sure if we need to return self in this case? Maybe just the member_structures
        let rust_type_structure = match self.is_inline_rust_type() {
            true => vec![self.clone()],
            false => vec![],
        };
        let member_structures = self.get_inline_members();
        let member_structures = member_structures.iter().fold(vec![], |acc, member| {
            vec![acc, member.collect_inline_types()].concat()
        });
        vec![rust_type_structure, member_structures].concat()
    }

    pub fn to_type_definition_token_stream(&self) -> TokenStream {
        let rust_type_definition = match self.get_definition() {
            Some(definition) => definition,
            None => quote!(),
        };
        quote! {
            #rust_type_definition
        }
    }
}

pub fn build_inline_types_from_type_alias_acts(
    type_aliases: &Vec<ActDataTypeNode>,
) -> Vec<ActDataTypeNode> {
    type_aliases.iter().fold(vec![], |acc, type_alias| {
        vec![acc, type_alias.collect_inline_types()].concat()
    })
}

pub fn deduplicate(act_data_type_nodes: Vec<ActDataTypeNode>) -> Vec<ActDataTypeNode> {
    let map: HashMap<String, ActDataTypeNode> =
        act_data_type_nodes
            .iter()
            .fold(HashMap::new(), |mut acc, act_node| {
                match acc.get(&act_node.get_type_ident().to_string()) {
                    Some(_) => acc,
                    None => {
                        acc.insert(act_node.get_type_ident().to_string(), act_node.clone());
                        acc
                    }
                }
            });
    map.values().cloned().collect()
}
