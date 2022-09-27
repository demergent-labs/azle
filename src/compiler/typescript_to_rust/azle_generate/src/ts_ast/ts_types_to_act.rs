use crate::cdk_act::nodes::data_type_nodes::{
    ActDataType, ActPrimitive, ActPrimitiveLit, ActPrimitiveTypeAlias, ActTypeRef, ActTypeRefLit,
    ActTypeRefTypeAlias,
};
use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};

pub fn build_act_primitive_type_node(
    primitive_type: ActPrimitiveLit,
    name: &Option<&String>,
) -> ActDataType {
    let primitive = match name {
        None => ActPrimitive::Literal(primitive_type),
        Some(name) => ActPrimitive::TypeAlias(ActPrimitiveTypeAlias {
            name: name.clone().clone(),
            aliased_type: primitive_type,
        }),
    };
    ActDataType::Primitive(primitive)
}

pub fn build_act_custom_type_node(token_stream: String, name: &Option<&String>) -> ActDataType {
    let type_ref = match name {
        None => ActTypeRef::Literal(ActTypeRefLit { name: token_stream }),
        Some(name) => ActTypeRef::TypeAlias(ActTypeRefTypeAlias {
            name: name.clone().clone(),
            aliased_type: ActTypeRefLit { name: token_stream },
        }),
    };
    ActDataType::TypeRef(type_ref)
}

pub fn calculate_hash<T: Hash>(hash: &T) -> String {
    let mut s = DefaultHasher::new();
    hash.hash(&mut s);
    format!("{}", s.finish()).to_string()
}
