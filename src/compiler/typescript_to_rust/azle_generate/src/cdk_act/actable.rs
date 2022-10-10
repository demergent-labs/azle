use swc_common::SourceMap;

use super::{nodes::ActNode, ActDataType};

pub trait Actable {
    fn to_act_node(&self, source_map: &SourceMap) -> ActNode;
}

pub trait ToActDataType {
    fn to_act_data_type(&self, alias_name: &Option<&String>, source_map: &SourceMap)
        -> ActDataType;
}
