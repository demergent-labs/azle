use super::{
    act_arrays::ActArray, act_funcs::ActFunc, act_option::ActOption, act_primitives::ActPrimitive,
    act_record::ActRecord, act_tuple::ActTuple, act_type_ref::ActTypeRef, act_variants::ActVariant,
    Literally, ToIdent, ToTokenStream,
};
use proc_macro2::TokenStream;
use quote::{quote, ToTokens};
use std::collections::HashMap;

#[derive(Clone, Debug)]
pub enum ActDataTypeNode {
    Array(ActArray),
    Func(ActFunc),
    Option(ActOption),
    Primitive(ActPrimitive),
    Record(ActRecord),
    Tuple(ActTuple),
    TypeRef(ActTypeRef),
    Variant(ActVariant),
}

impl ActDataTypeNode {
    pub fn get_name(&self) -> String {
        match self {
            ActDataTypeNode::Array(array) => array.get_name(),
            ActDataTypeNode::Func(func) => func.get_name(),
            ActDataTypeNode::Option(option) => option.get_name(),
            ActDataTypeNode::Primitive(primitive) => primitive.get_name(),
            ActDataTypeNode::Record(record) => record.get_name(),
            ActDataTypeNode::Tuple(tuple) => tuple.get_name(),
            ActDataTypeNode::TypeRef(type_ref) => type_ref.get_name(),
            ActDataTypeNode::Variant(variant) => variant.get_name(),
        }
    }
    pub fn get_type_name(&self) -> String {
        match self {
            ActDataTypeNode::Array(_) => "Array",
            ActDataTypeNode::Func(_) => "Func",
            ActDataTypeNode::Option(_) => "Option",
            ActDataTypeNode::Primitive(_) => "Primitive",
            ActDataTypeNode::Record(_) => "Record",
            ActDataTypeNode::Tuple(_) => "Tuple",
            ActDataTypeNode::TypeRef(_) => "TypeRef",
            ActDataTypeNode::Variant(_) => "Variant",
        }
        .to_string()
    }
    // TODO change this to Ident? Or String? or at the very least have the match return an ident and then wrap the result in a quote?
    pub fn get_type_identifier(&self) -> TokenStream {
        match self {
            ActDataTypeNode::Primitive(act_primitive) => match act_primitive {
                ActPrimitive::Literal(literal) => literal.to_token_stream(),
                ActPrimitive::TypeAlias(type_alias) => {
                    type_alias.name.to_identifier().to_token_stream()
                }
            },
            ActDataTypeNode::TypeRef(act_type_ref) => match act_type_ref {
                ActTypeRef::Literal(literal) => literal.name.to_identifier().to_token_stream(),
                ActTypeRef::TypeAlias(type_alias) => {
                    type_alias.name.to_identifier().to_token_stream()
                }
            },
            ActDataTypeNode::Array(act_array) => act_array.to_token_stream(),
            ActDataTypeNode::Record(act_record) => act_record.to_token_stream(),
            ActDataTypeNode::Variant(act_variant) => act_variant.to_token_stream(),
            ActDataTypeNode::Func(act_func) => act_func.to_token_stream(),
            ActDataTypeNode::Tuple(act_tuple) => act_tuple.to_token_stream(),
            ActDataTypeNode::Option(act_option) => match act_option {
                ActOption::Literal(literal) => literal.to_token_stream(),
                ActOption::TypeAlias(type_alias) => {
                    type_alias.name.to_identifier().to_token_stream()
                }
            },
        }
    }

    // TODO change is_inline to needs to be defined? Or maybe leave it as is_inline_type, think about it
    // Another thing to consider is that no all languages have inline types.
    pub fn needs_definition(&self) -> bool {
        match self {
            ActDataTypeNode::Primitive(_) => false,
            ActDataTypeNode::TypeRef(_) => false,
            ActDataTypeNode::Array(_) => false,
            ActDataTypeNode::Option(_) => false,
            ActDataTypeNode::Record(act_record) => act_record.is_literal(),
            ActDataTypeNode::Variant(act_variant) => act_variant.is_literal(),
            ActDataTypeNode::Func(act_func) => act_func.is_literal(),
            ActDataTypeNode::Tuple(act_tuple) => act_tuple.is_literal(),
        }
    }

    // TODO change to to the implementation of to_token_stream
    pub fn get_definition(&self) -> Option<TokenStream> {
        match self {
            ActDataTypeNode::Record(act_record) => Some(act_record.to_token_stream()),
            ActDataTypeNode::Variant(act_variant) => Some(act_variant.to_token_stream()),
            ActDataTypeNode::Func(act_func) => Some(act_func.to_token_stream()),
            ActDataTypeNode::Tuple(act_tuple) => Some(act_tuple.to_token_stream()),
            ActDataTypeNode::Primitive(act_primitive) => Some(act_primitive.to_token_stream()),
            ActDataTypeNode::TypeRef(act_type_ref) => Some(act_type_ref.to_token_stream()),
            ActDataTypeNode::Option(act_option) => Some(act_option.to_token_stream()),
            ActDataTypeNode::Array(act_array) => Some(act_array.to_token_stream()),
        }
    }

    pub fn as_type_alias(&self) -> ActDataTypeNode {
        match self {
            ActDataTypeNode::Primitive(primitive) => {
                ActDataTypeNode::Primitive(primitive.as_type_alias())
            }
            ActDataTypeNode::Option(option) => ActDataTypeNode::Option(option.as_type_alias()),
            ActDataTypeNode::TypeRef(type_ref) => {
                ActDataTypeNode::TypeRef(type_ref.as_type_alias())
            }
            ActDataTypeNode::Array(array) => ActDataTypeNode::Array(array.as_type_alias()),
            ActDataTypeNode::Record(record) => ActDataTypeNode::Record(record.as_type_alias()),
            ActDataTypeNode::Variant(variant) => ActDataTypeNode::Variant(variant.as_type_alias()),
            ActDataTypeNode::Func(func) => ActDataTypeNode::Func(func.as_type_alias()),
            ActDataTypeNode::Tuple(tuple) => ActDataTypeNode::Tuple(tuple.as_type_alias()),
        }
    }

    pub fn needs_to_be_boxed(&self) -> bool {
        true
    }

    pub fn get_literal_members(&self) -> Vec<ActDataTypeNode> {
        match self {
            ActDataTypeNode::Record(act_record) => act_record.get_literal_members(),
            ActDataTypeNode::Variant(act_variant) => act_variant.get_literal_members(),
            ActDataTypeNode::Func(act_func) => act_func.get_literal_members(),
            ActDataTypeNode::Primitive(primitive) => primitive.get_literal_members(),
            ActDataTypeNode::TypeRef(type_ref) => type_ref.get_literal_members(),
            ActDataTypeNode::Array(act_array) => act_array.get_literal_members(),
            ActDataTypeNode::Tuple(act_tuple) => act_tuple.get_literal_members(),
            ActDataTypeNode::Option(act_option) => act_option.get_literal_members(),
        }
    }

    pub fn get_members(&self) -> Vec<ActDataTypeNode> {
        match self {
            ActDataTypeNode::Record(act_record) => act_record.get_members(),
            ActDataTypeNode::Variant(act_variant) => act_variant.get_members(),
            ActDataTypeNode::Func(act_func) => act_func.get_members(),
            ActDataTypeNode::Primitive(primitive) => primitive.get_members(),
            ActDataTypeNode::TypeRef(type_ref) => type_ref.get_members(),
            ActDataTypeNode::Array(act_array) => act_array.get_members(),
            ActDataTypeNode::Tuple(act_tuple) => act_tuple.get_members(),
            ActDataTypeNode::Option(act_option) => act_option.get_members(),
        }
    }

    pub fn collect_inline_types(&self) -> Vec<ActDataTypeNode> {
        let act_data_type = match self.needs_definition() {
            true => vec![self.as_type_alias()],
            false => vec![],
        };
        let member_act_data_types = self.get_members();
        let all_descendant_act_data_types =
            member_act_data_types.iter().fold(vec![], |acc, member| {
                vec![acc, member.collect_inline_types()].concat()
            });
        vec![act_data_type, all_descendant_act_data_types].concat()
    }

    pub fn to_type_definition_token_stream(&self) -> TokenStream {
        match self.get_definition() {
            Some(definition) => definition,
            None => quote!(),
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
                match acc.get(&act_node.get_type_identifier().to_string()) {
                    Some(_) => acc,
                    None => {
                        acc.insert(act_node.get_type_identifier().to_string(), act_node.clone());
                        acc
                    }
                }
            });
    map.values().cloned().collect()
}
