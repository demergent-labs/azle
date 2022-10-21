use super::ActDataType;

pub trait Actable {
    fn to_act_node(&self) -> ActDataType;
}

pub trait ToActDataType {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> ActDataType;
}
