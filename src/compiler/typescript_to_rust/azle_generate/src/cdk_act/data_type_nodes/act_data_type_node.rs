use super::{
    arrays::ActArray,
    funcs::ActFunc,
    option::ActOption,
    primitives::{ActPrimitive, ActPrimitiveLit},
    record::ActRecord,
    tuple::ActTuple,
    type_ref::ActTypeRef,
    variants::ActVariant,
    ToIdent, ToTokenStream,
};
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};
use std::collections::HashMap;

#[derive(Clone, Debug)]
pub enum ActDataTypeNode {
    Primitive(ActPrimitive),
    Option(ActOption),
    TypeRef(ActTypeRef),
    Array(ActArray),
    Record(ActRecord),
    Variant(ActVariant),
    Func(ActFunc),
    Tuple(ActTuple),
}

#[derive(Clone, Debug)]
pub enum ActAliasedType {
    Primitive(ActPrimitiveLit),
    TypeRef(String),
}

impl ActAliasedType {
    pub fn to_token_stream(&self) -> TokenStream {
        match self {
            ActAliasedType::Primitive(primitive) => primitive.to_token_stream(),
            ActAliasedType::TypeRef(type_ref) => type_ref.to_ident().into_token_stream(),
        }
    }
}

impl ActDataTypeNode {
    // TODO change this to Ident? Or String? or at the very least have the match return an ident and then wrap the result in a quote?
    pub fn get_type_ident(&self) -> TokenStream {
        match self {
            ActDataTypeNode::Primitive(primitive) => match primitive {
                ActPrimitive::Literal(literal) => literal.to_token_stream(),
                ActPrimitive::TypeAlias(type_alias) => type_alias.name.to_ident().to_token_stream(),
            },
            ActDataTypeNode::TypeRef(type_ref) => match type_ref {
                ActTypeRef::Literal(literal) => literal.name.to_ident().to_token_stream(),
                ActTypeRef::TypeAlias(type_alias) => type_alias.name.to_ident().to_token_stream(),
            },
            ActDataTypeNode::Array(array_info) => match array_info {
                ActArray::Literal(literal) => literal.token_stream.clone(),
                ActArray::TypeAlias(type_alias) => type_alias.name.to_ident().to_token_stream(),
            },
            ActDataTypeNode::Record(struct_info) => struct_info.name.to_ident().to_token_stream(),
            ActDataTypeNode::Variant(enum_info) => enum_info.name.to_ident().to_token_stream(),
            ActDataTypeNode::Func(func_info) => func_info.name.to_ident().to_token_stream(),
            ActDataTypeNode::Tuple(tuple_info) => tuple_info.name.to_ident().to_token_stream(),
            ActDataTypeNode::Option(option_info) => match option_info {
                ActOption::Literal(literal) => literal.to_token_stream(),
                ActOption::TypeAlias(type_alias) => type_alias.name.to_ident().to_token_stream(),
            },
        }
    }

    // TODO change is_inline to needs to be defined?
    pub fn is_inline_type(&self) -> bool {
        match self {
            ActDataTypeNode::Primitive(_) => false,
            ActDataTypeNode::TypeRef(_) => false,
            ActDataTypeNode::Array(array_type_info) => match array_type_info {
                ActArray::Literal(literal) => literal.enclosed_inline_type.is_some(),
                ActArray::TypeAlias(type_alias) => type_alias.enclosed_inline_type.is_some(),
            },
            ActDataTypeNode::Record(struct_info) => struct_info.is_inline,
            ActDataTypeNode::Variant(enum_info) => enum_info.is_inline,
            ActDataTypeNode::Func(func_info) => func_info.is_inline,
            ActDataTypeNode::Tuple(tuple_info) => tuple_info.is_inline,
            ActDataTypeNode::Option(option_info) => {
                option_info.get_enclosed_type().is_inline_type()
            }
        }
    }

    pub fn get_definition(&self) -> Option<TokenStream> {
        match self {
            ActDataTypeNode::Record(struct_info) => Some(struct_info.to_token_stream()),
            ActDataTypeNode::Variant(enum_info) => Some(enum_info.to_token_stream()),
            ActDataTypeNode::Func(func_info) => Some(func_info.to_token_stream()),
            ActDataTypeNode::Tuple(tuple_info) => Some(tuple_info.to_token_stream()),
            ActDataTypeNode::Primitive(primitive) => match primitive {
                ActPrimitive::Literal(_) => None,
                ActPrimitive::TypeAlias(type_alias) => Some(type_alias.to_token_stream()),
            },
            ActDataTypeNode::TypeRef(type_ref) => match type_ref {
                ActTypeRef::Literal(_) => None,
                ActTypeRef::TypeAlias(type_alias) => Some(type_alias.to_token_stream()),
            },
            ActDataTypeNode::Option(type_ref_info) => match type_ref_info {
                ActOption::Literal(_) => None,
                ActOption::TypeAlias(type_alias) => Some(type_alias.to_token_stream()),
            },
            ActDataTypeNode::Array(array_type_info) => match array_type_info {
                ActArray::Literal(literal) => match &*literal.enclosed_inline_type {
                    Some(inline_type) => inline_type.get_definition(),
                    None => None,
                },
                ActArray::TypeAlias(type_alias) => match &*type_alias.enclosed_inline_type {
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
                .filter(|member| member.member_type.is_inline_type())
                .map(|member| member.member_type.clone())
                .collect(),
            ActDataTypeNode::Variant(enum_info) => enum_info
                .members
                .iter()
                .filter(|member| member.member_type.is_inline_type())
                .map(|member| member.member_type.clone())
                .collect(),
            ActDataTypeNode::Func(func_info) => vec![
                func_info.params.clone(),
                vec![*func_info.return_type.clone()],
            ]
            .concat()
            .iter()
            .filter(|elem| elem.is_inline_type())
            .cloned()
            .collect(),
            ActDataTypeNode::Primitive(_) => vec![],
            ActDataTypeNode::TypeRef(_) => vec![],
            ActDataTypeNode::Array(_) => vec![],
            ActDataTypeNode::Tuple(tuple_info) => tuple_info
                .elems
                .iter()
                .filter(|member| member.elem_type.is_inline_type())
                .map(|elem| elem.elem_type.clone())
                .collect(),
            ActDataTypeNode::Option(_) => vec![],
        }
    }

    pub fn collect_inline_types(&self) -> Vec<ActDataTypeNode> {
        let rust_type_structure = match self.is_inline_type() {
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
