use super::ActDataTypeNode;

pub trait Actable {
    fn to_act_node(&self) -> ActDataTypeNode;
}

pub trait ToActDataType {
    fn to_act_data_type(&self, name: &Option<&String>) -> ActDataTypeNode;
}
