use std::{collections::HashMap, vec};

use proc_macro2::TokenStream;
use quote::quote;

#[derive(Clone, Debug)]
pub enum ActDataTypeNode {
    Primitive(PrimitiveInfo),
    Option(GenericTypeInfo),
    CustomType(PrimitiveInfo),
    Array(GenericTypeInfo),
    Record(StructInfo),
    Variant(EnumInfo),
    Func(FuncInfo),
    Tuple(TupleInfo),
    TypeAlias(TypeAliasInfo),
}

pub enum Primitive {
    Literal,
    TypeAlias,
}
pub enum TypeRef {
    Literal(PrimitiveInfo),
    TypeAlias,
}

pub enum PrimitiveType {
    Bool,
    Int,
    Int64,
    Principal,
    etc,
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
    pub is_inline: bool,
    pub inline_members: Box<Vec<ActDataTypeNode>>,
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
pub struct TypeAliasInfo {
    pub identifier: TokenStream,
    pub definition: TokenStream,
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
            ActDataTypeNode::Primitive(keyword_info) => &keyword_info.identifier,
            ActDataTypeNode::CustomType(type_ref_info) => &type_ref_info.identifier,
            ActDataTypeNode::Array(array_info) => &array_info.identifier,
            ActDataTypeNode::Record(struct_info) => &struct_info.identifier,
            ActDataTypeNode::Variant(enum_info) => &enum_info.identifier,
            ActDataTypeNode::Func(func_info) => &func_info.identifier,
            ActDataTypeNode::Tuple(tuple_info) => &tuple_info.identifier,
            ActDataTypeNode::Option(option_info) => &option_info.identifier,
            ActDataTypeNode::TypeAlias(type_alias_info) => &type_alias_info.identifier,
        };
        quote!(#token_stream)
    }

    // TODO change is_inline to needs to be defined?
    pub fn is_inline_rust_type(&self) -> bool {
        match self {
            ActDataTypeNode::Primitive(_) => false,
            ActDataTypeNode::CustomType(_) => false,
            ActDataTypeNode::Array(array_type_info) => {
                array_type_info.enclosed_inline_type.is_some()
            }
            ActDataTypeNode::Record(struct_info) => struct_info.is_inline,
            ActDataTypeNode::Variant(enum_info) => enum_info.is_inline,
            ActDataTypeNode::Func(func_info) => func_info.is_inline,
            ActDataTypeNode::Tuple(tuple_info) => tuple_info.is_inline,
            ActDataTypeNode::Option(option_info) => option_info.enclosed_inline_type.is_some(),
            ActDataTypeNode::TypeAlias(_) => false,
        }
    }

    pub fn get_definition(&self) -> Option<TokenStream> {
        match self {
            ActDataTypeNode::Record(struct_info) => Some(struct_info.definition.clone()),
            ActDataTypeNode::Variant(enum_info) => Some(enum_info.definition.clone()),
            ActDataTypeNode::Func(func_info) => Some(func_info.definition.clone()),
            ActDataTypeNode::Tuple(tuple_info) => Some(tuple_info.definition.clone()),
            ActDataTypeNode::Primitive(_) => None,
            ActDataTypeNode::CustomType(_) => None,
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
            ActDataTypeNode::TypeAlias(type_alias_info) => Some(type_alias_info.definition.clone()),
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
            ActDataTypeNode::CustomType(_) => vec![],
            ActDataTypeNode::Array(_) => vec![],
            ActDataTypeNode::Tuple(tuple_info) => *tuple_info.inline_members.clone(),
            ActDataTypeNode::Option(_) => vec![],
            ActDataTypeNode::TypeAlias(_) => vec![],
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
