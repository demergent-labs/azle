use swc_common::SourceMap;
use swc_ecma_ast::TsPropertySignature;

use crate::{
    cdk_act::{
        nodes::data_type_nodes::{ActRecordMember, ActVariantMember},
        ToActDataType,
    },
    ts_ast::{ast_traits::GetTsType, azle_type::AzleType, GetName},
};

mod errors;
mod get_dependencies;
mod get_source_info;
mod get_source_text;

pub struct AzlePropertySignature<'a> {
    pub ts_property_signature: TsPropertySignature,
    pub source_map: &'a SourceMap,
}

impl AzlePropertySignature<'_> {
    pub(super) fn to_record_member(&self) -> ActRecordMember {
        let ts_type = match &self.ts_property_signature.type_ann {
            Some(ts_type_ann) => ts_type_ann.get_ts_type(),
            None => panic!("{}", self.no_type_annotation_error()),
        };
        let azle_type = AzleType::from_ts_type(ts_type, self.source_map);
        ActRecordMember {
            member_name: self.ts_property_signature.get_name().to_string(),
            member_type: azle_type.to_act_data_type(&None),
        }
    }

    pub(super) fn to_variant_member(&self) -> ActVariantMember {
        let ts_type = match &self.ts_property_signature.type_ann {
            Some(ts_type_ann) => ts_type_ann.get_ts_type(),
            None => panic!("{}", self.no_type_annotation_error()),
        };
        let azle_type = AzleType::from_ts_type(ts_type, self.source_map);
        ActVariantMember {
            member_name: self.ts_property_signature.get_name().to_string(),
            member_type: azle_type.to_act_data_type(&None),
        }
    }
}
