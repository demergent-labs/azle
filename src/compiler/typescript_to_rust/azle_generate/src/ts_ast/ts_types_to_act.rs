use crate::cdk_act::nodes::data_type_nodes::{
    ActDataType, ActPrimitive, ActPrimitiveLit, ActPrimitiveTypeAlias, ActTypeRef, ActTypeRefLit,
    ActTypeRefTypeAlias,
};

pub fn build_act_primitive_type_node(
    primitive_type: ActPrimitiveLit,
    alias_name: &Option<&String>,
) -> ActDataType {
    let primitive = match alias_name {
        None => ActPrimitive::Literal(primitive_type),
        Some(name) => ActPrimitive::TypeAlias(ActPrimitiveTypeAlias {
            name: name.clone().clone(),
            aliased_type: primitive_type,
        }),
    };
    ActDataType::Primitive(primitive)
}

pub fn build_act_custom_type_node(type_name: String, alias_name: &Option<&String>) -> ActDataType {
    let type_ref = match alias_name {
        None => ActTypeRef::Literal(ActTypeRefLit { name: type_name }),
        Some(name) => ActTypeRef::TypeAlias(ActTypeRefTypeAlias {
            name: name.clone().clone(),
            aliased_type: ActTypeRefLit { name: type_name },
        }),
    };
    ActDataType::TypeRef(type_ref)
}
