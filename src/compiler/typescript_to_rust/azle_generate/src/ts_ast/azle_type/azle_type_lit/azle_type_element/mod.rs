mod errors;
pub mod get_dependencies;
mod get_name;
mod get_source_info;
mod get_source_text;
mod get_ts_type;

use swc_common::SourceMap;
use swc_ecma_ast::TsTypeElement;

use crate::{
    cdk_act::{
        nodes::data_type_nodes::{ActRecordMember, ActVariantMember},
        ToActDataType,
    },
    ts_ast::{azle_type::AzleType, GetName, GetTsType},
};

pub struct AzleTypeElement<'a> {
    pub ts_type_element: TsTypeElement,
    pub source_map: &'a SourceMap,
}

impl AzleTypeElement<'_> {
    pub fn to_record_member(&self) -> ActRecordMember {
        let azle_type = AzleType::from_ts_type(self.get_ts_type(), self.source_map);
        ActRecordMember {
            member_name: self.get_name().to_string(),
            member_type: azle_type.to_act_data_type(&None),
        }
    }

    pub fn to_variant_member(&self) -> ActVariantMember {
        let azle_type = AzleType::from_ts_type(self.get_ts_type(), self.source_map);
        ActVariantMember {
            member_name: self.get_name().to_string(),
            member_type: azle_type.to_act_data_type(&None),
        }
    }
}
