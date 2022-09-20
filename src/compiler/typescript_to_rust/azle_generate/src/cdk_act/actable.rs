use super::ActDataTypeNode;

pub trait Actable {
    fn to_act_node(&self) -> ActDataTypeNode;
}
