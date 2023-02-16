use cdk_framework::{ActDataType, ToActDataType};
use swc_ecma_ast::TsFnType;

use crate::ts_ast::{azle_type::AzleType, source_map::SourceMapped};

impl SourceMapped<'_, TsFnType> {
    pub fn build_return_type(&self) -> ActDataType {
        let azle_type = AzleType::from_ts_type(*self.type_ann.type_ann.clone(), self.source_map);
        azle_type.to_act_data_type(&None)
    }
}
