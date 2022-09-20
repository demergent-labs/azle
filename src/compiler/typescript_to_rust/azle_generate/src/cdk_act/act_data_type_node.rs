use std::collections::HashMap;

use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote, ToTokens};

#[derive(Clone, Debug)]
pub enum ActDataTypeNode {
    Primitive(Primitive),
    Option(GenericTypeInfo),
    TypeRef(TypeRef),
    Array(GenericTypeInfo),
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
    Literal(PrimitiveInfo),
    TypeAlias(TypeAliasInfo),
}

#[derive(Clone, Debug)]
pub struct TypeAliasInfo {
    pub name: Ident,
    pub aliased_type: AliasedType,
}

impl TypeAliasInfo {
    pub fn to_token_stream(&self) -> TokenStream {
        let name = format_ident!("{}", self.name);
        let alias = self.aliased_type.to_token_stream();
        quote!(type #name = #alias;)
    }
}

#[derive(Clone, Debug)]
pub enum AliasedType {
    Primitive(PrimitiveType),
    TypeRef(TokenStream),
}

impl AliasedType {
    pub fn to_token_stream(&self) -> TokenStream {
        match self {
            AliasedType::Primitive(primitive) => primitive.to_token_stream(),
            AliasedType::TypeRef(type_ref) => type_ref.into_token_stream(), // TODO this can't possible work can it?
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
            PrimitiveType::Empty => todo!(),
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
pub struct PrimitiveInfo {
    pub identifier: TokenStream,
}

#[derive(Clone, Debug)]
pub struct GenericTypeInfo {
    pub identifier: TokenStream,
    pub enclosed_inline_type: Box<Option<ActDataTypeNode>>,
}

#[derive(Clone, Default, Debug)]
pub struct StructInfo {
    pub identifier: TokenStream,
    pub definition: TokenStream,
    pub inline_members: Box<Vec<ActDataTypeNode>>,

    // pub name: Ident,
    // pub members: Box<Vec<ActDataTypeNode>>,
    pub is_inline: bool,
}

#[derive(Clone, Debug)]
pub struct EnumInfo {
    pub identifier: TokenStream,
    pub definition: TokenStream,
    pub is_inline: bool,
    pub inline_members: Box<Vec<ActDataTypeNode>>,
}

#[derive(Clone, Debug)]
pub struct FuncInfo {
    pub identifier: TokenStream,
    pub definition: TokenStream,
    pub is_inline: bool,
    pub inline_members: Box<Vec<ActDataTypeNode>>,
}

#[derive(Clone, Debug)]
pub struct TupleInfo {
    pub identifier: TokenStream,
    pub definition: TokenStream,
    pub is_inline: bool,
    pub inline_members: Box<Vec<ActDataTypeNode>>,
}

impl ActDataTypeNode {
    pub fn get_type_ident(&self) -> TokenStream {
        let token_stream = match self {
            ActDataTypeNode::Primitive(primitive) => match primitive {
                Primitive::Literal(literal) => literal.to_token_stream(),
                Primitive::TypeAlias(type_alias) => {
                    let name = type_alias.name.clone();
                    quote!(#name)
                }
            },
            ActDataTypeNode::TypeRef(type_ref) => match type_ref {
                TypeRef::Literal(literal) => literal.identifier.clone(),
                TypeRef::TypeAlias(type_alias) => {
                    let name = type_alias.name.clone();
                    quote!(#name)
                }
            },
            ActDataTypeNode::Array(array_info) => array_info.identifier.clone(),
            ActDataTypeNode::Record(struct_info) => struct_info.identifier.clone(),
            ActDataTypeNode::Variant(enum_info) => enum_info.identifier.clone(),
            ActDataTypeNode::Func(func_info) => func_info.identifier.clone(),
            ActDataTypeNode::Tuple(tuple_info) => tuple_info.identifier.clone(),
            ActDataTypeNode::Option(option_info) => option_info.identifier.clone(),
        };
        quote!(#token_stream)
    }

    // TODO change is_inline to needs to be defined?
    pub fn is_inline_rust_type(&self) -> bool {
        match self {
            ActDataTypeNode::Primitive(_) => false,
            ActDataTypeNode::TypeRef(_) => false,
            ActDataTypeNode::Array(array_type_info) => {
                array_type_info.enclosed_inline_type.is_some()
            }
            ActDataTypeNode::Record(struct_info) => struct_info.is_inline,
            ActDataTypeNode::Variant(enum_info) => enum_info.is_inline,
            ActDataTypeNode::Func(func_info) => func_info.is_inline,
            ActDataTypeNode::Tuple(tuple_info) => tuple_info.is_inline,
            ActDataTypeNode::Option(option_info) => option_info.enclosed_inline_type.is_some(),
        }
    }

    pub fn get_definition(&self) -> Option<TokenStream> {
        match self {
            ActDataTypeNode::Record(struct_info) => Some(struct_info.definition.clone()),
            ActDataTypeNode::Variant(enum_info) => Some(enum_info.definition.clone()),
            ActDataTypeNode::Func(func_info) => Some(func_info.definition.clone()),
            ActDataTypeNode::Tuple(tuple_info) => Some(tuple_info.definition.clone()),
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
            ActDataTypeNode::Array(array_type_info) => {
                match &*array_type_info.enclosed_inline_type {
                    Some(inline_type) => inline_type.get_definition(),
                    None => None,
                }
            }
        }
    }

    pub fn needs_to_be_boxed(&self) -> bool {
        true
    }

    pub fn get_inline_members(&self) -> Vec<ActDataTypeNode> {
        match self {
            ActDataTypeNode::Record(struct_info) => *struct_info.inline_members.clone(),
            ActDataTypeNode::Variant(enum_info) => *enum_info.inline_members.clone(),
            ActDataTypeNode::Func(func_info) => *func_info.inline_members.clone(),
            ActDataTypeNode::Primitive(_) => vec![],
            ActDataTypeNode::TypeRef(_) => vec![],
            ActDataTypeNode::Array(_) => vec![],
            ActDataTypeNode::Tuple(tuple_info) => *tuple_info.inline_members.clone(),
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
