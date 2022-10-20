use swc_common::SourceMap;
use swc_ecma_ast::{TsPropertySignature, TsTypeElement};

use crate::{
    cdk_act::{
        nodes::data_type_nodes::{ActRecordMember, ActVariantMember},
        ToActDataType,
    },
    ts_ast::{azle_type::AzleType, GetName, GetTsType},
};

mod errors;
mod get_dependencies;
mod get_source_info;
mod get_source_text;

pub struct AzleTypeElement<'a> {
    pub ts_type_element: TsTypeElement,
    pub source_map: &'a SourceMap,
}

impl AzleTypeElement<'_> {
    pub fn to_record_member(&self) -> ActRecordMember {
        let ts_property_signature = match self.as_ts_property_signature() {
            Some(ts_property_signature) => ts_property_signature,
            None => panic!("{}", self.record_property_signature_error()),
        };
        let ts_type = match &ts_property_signature.type_ann {
            Some(ts_type_ann) => ts_type_ann.get_ts_type(),
            None => panic!("{}", self.no_type_annotation_error()),
        };
        let azle_type = AzleType::from_ts_type(ts_type, self.source_map);
        ActRecordMember {
            member_name: ts_property_signature.get_name().to_string(),
            member_type: azle_type.to_act_data_type(&None),
        }
    }

    pub fn to_variant_member(&self) -> ActVariantMember {
        let ts_property_signature = match self.as_ts_property_signature() {
            Some(ts_property_signature) => ts_property_signature,
            None => panic!("{}", self.variant_property_signature_error()),
        };
        let ts_type = match &ts_property_signature.type_ann {
            Some(ts_type_ann) => ts_type_ann.get_ts_type(),
            None => panic!("{}", self.no_type_annotation_error()),
        };
        let azle_type = AzleType::from_ts_type(ts_type, self.source_map);
        ActVariantMember {
            member_name: ts_property_signature.get_name().to_string(),
            member_type: azle_type.to_act_data_type(&None),
        }
    }

    fn as_ts_property_signature(&self) -> Option<&TsPropertySignature> {
        match &self.ts_type_element {
            TsTypeElement::TsPropertySignature(ts_property_signature) => {
                Some(ts_property_signature)
            }
            _ => None,
        }
    }
}
