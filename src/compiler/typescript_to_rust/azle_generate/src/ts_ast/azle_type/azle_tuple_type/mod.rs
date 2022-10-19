mod get_dependencies;
pub mod get_source_info;
mod get_source_text;
mod to_act_data_type;

use swc_common::SourceMap;
use swc_ecma_ast::TsTupleType;

use crate::cdk_act::{nodes::data_type_nodes::ActTupleElem, ToActDataType};

use super::AzleType;

#[derive(Clone)]
pub struct AzleTupleType<'a> {
    pub ts_tuple_type: TsTupleType,
    pub source_map: &'a SourceMap,
}

impl AzleTupleType<'_> {
    fn get_elem_types(&self) -> Vec<ActTupleElem> {
        self.ts_tuple_type
            .elem_types
            .iter()
            .map(|elem| {
                let ts_type = elem.ty.clone();
                let azle_type = AzleType::from_ts_type(ts_type, self.source_map);
                ActTupleElem {
                    elem_type: azle_type.to_act_data_type(&None),
                }
            })
            .collect()
    }
}
