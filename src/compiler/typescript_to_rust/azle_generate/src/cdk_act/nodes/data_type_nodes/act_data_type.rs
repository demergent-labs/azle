use super::{
    act_arrays::ActArray, act_funcs::ActFunc, act_option::ActOption, act_primitives::ActPrimitive,
    act_record::ActRecord, act_tuple::ActTuple, act_type_ref::ActTypeRef, act_variants::ActVariant,
    HasMembers, Literally, TypeAliasize,
};
use crate::cdk_act::ToTokenStream;
use proc_macro2::TokenStream;
use std::collections::HashMap;

#[derive(Clone, Debug)]
pub enum ActDataType {
    Array(ActArray),
    Func(ActFunc),
    Option(ActOption),
    Primitive(ActPrimitive),
    Record(ActRecord),
    Tuple(ActTuple),
    TypeRef(ActTypeRef),
    Variant(ActVariant),
}

impl ActDataType {
    pub fn needs_definition(&self) -> bool {
        match self {
            ActDataType::Primitive(_) => false,
            ActDataType::TypeRef(_) => false,
            ActDataType::Array(_) => false,
            ActDataType::Option(_) => false,
            ActDataType::Record(act_record) => act_record.act_type.is_literal(),
            ActDataType::Variant(act_variant) => act_variant.act_type.is_literal(),
            ActDataType::Func(act_func) => act_func.act_type.is_literal(),
            ActDataType::Tuple(act_tuple) => act_tuple.act_type.is_literal(),
        }
    }

    pub fn as_type_alias(&self) -> Option<ActDataType> {
        match self {
            ActDataType::Primitive(_) => None,
            ActDataType::Option(_) => None,
            ActDataType::TypeRef(_) => None,
            ActDataType::Array(_) => None,
            ActDataType::Record(record) => Some(ActDataType::Record(record.as_type_alias())),
            ActDataType::Variant(variant) => Some(ActDataType::Variant(variant.as_type_alias())),
            ActDataType::Func(func) => Some(ActDataType::Func(func.as_type_alias())),
            ActDataType::Tuple(tuple) => Some(ActDataType::Tuple(tuple.as_type_alias())),
        }
    }

    pub fn needs_to_be_boxed(&self) -> bool {
        true
    }

    pub fn get_members(&self) -> Vec<ActDataType> {
        match self {
            ActDataType::Record(act_record) => act_record.get_members(),
            ActDataType::Variant(act_variant) => act_variant.get_members(),
            ActDataType::Func(act_func) => act_func.get_members(),
            ActDataType::Primitive(_) => vec![],
            ActDataType::TypeRef(_) => vec![],
            ActDataType::Array(act_array) => act_array.get_members(),
            ActDataType::Tuple(act_tuple) => act_tuple.get_members(),
            ActDataType::Option(act_option) => act_option.get_members(),
        }
    }

    pub fn collect_inline_types(&self) -> Vec<ActDataType> {
        let act_data_type = match self.needs_definition() {
            true => match self.as_type_alias() {
                Some(type_alias) => vec![type_alias],
                None => vec![],
            },
            false => vec![],
        };
        let member_act_data_types = self.get_members();
        let all_descendant_act_data_types =
            member_act_data_types.iter().fold(vec![], |acc, member| {
                vec![acc, member.collect_inline_types()].concat()
            });
        vec![act_data_type, all_descendant_act_data_types].concat()
    }
}

impl ToTokenStream for ActDataType {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            ActDataType::Record(act_record) => act_record.act_type.to_token_stream(),
            ActDataType::Variant(act_variant) => act_variant.act_type.to_token_stream(),
            ActDataType::Func(act_func) => act_func.act_type.to_token_stream(),
            ActDataType::Tuple(act_tuple) => act_tuple.act_type.to_token_stream(),
            ActDataType::Primitive(act_primitive) => act_primitive.act_type.to_token_stream(),
            ActDataType::TypeRef(act_type_ref) => act_type_ref.act_type.to_token_stream(),
            ActDataType::Option(act_option) => act_option.to_token_stream(),
            ActDataType::Array(act_array) => act_array.act_type.to_token_stream(),
        }
    }
}

pub fn build_inline_type_acts(type_aliases: &Vec<ActDataType>) -> Vec<ActDataType> {
    type_aliases.iter().fold(vec![], |acc, type_alias| {
        vec![acc, type_alias.collect_inline_types()].concat()
    })
}

pub fn deduplicate(act_data_type_nodes: Vec<ActDataType>) -> Vec<ActDataType> {
    let map: HashMap<String, ActDataType> =
        act_data_type_nodes
            .iter()
            .fold(HashMap::new(), |mut acc, act_node| {
                match acc.get(&act_node.to_token_stream().to_string()) {
                    Some(_) => acc,
                    None => {
                        acc.insert(act_node.to_token_stream().to_string(), act_node.clone());
                        acc
                    }
                }
            });
    map.values().cloned().collect()
}
