use super::{nodes::ActNode, ActDataType};

pub trait Actable {
    fn to_act_node(&self) -> ActNode;
}

pub trait ToActDataType {
    fn to_act_data_type(&self, name: &Option<&String>) -> ActDataType;
}
