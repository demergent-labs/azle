use swc_common::SourceMap;
use swc_ecma_ast::{TsType, TsTypeElement};

use crate::cdk_act::{
    nodes::data_type_nodes::{ActRecordMember, ActVariantMember},
    ToActDataType,
};

use super::{ast_traits::GetTsType, GetName};

pub trait TsTypeElementHelperMethods {
    fn to_record_member(&self, source_map: &SourceMap) -> ActRecordMember;
    fn to_variant_member(&self, source_map: &SourceMap) -> ActVariantMember;
}

impl GetName for TsTypeElement {
    fn get_name(&self) -> &str {
        match self.as_ts_property_signature() {
            Some(prop_sig) => prop_sig.key.as_ident().unwrap().get_name(),
            None => {
                todo!("Handle parsing type literals if the field isn't a TsPropertySignature")
            }
        }
    }
}

impl GetTsType for TsTypeElement {
    fn get_ts_type(&self) -> TsType {
        match self.as_ts_property_signature() {
            Some(prop_sig) => prop_sig.type_ann.as_ref().unwrap().get_ts_type(),
            None => {
                todo!("Handle parsing type literals if the field isn't a TsPropertySignature")
            }
        }
    }
}

impl TsTypeElementHelperMethods for TsTypeElement {
    fn to_record_member(&self, source_map: &SourceMap) -> ActRecordMember {
        ActRecordMember {
            member_name: self.get_name().to_string(),
            member_type: self.get_ts_type().to_act_data_type(&None, source_map),
        }
    }

    fn to_variant_member(&self, source_map: &SourceMap) -> ActVariantMember {
        ActVariantMember {
            member_name: self.get_name().to_string(),
            member_type: self.get_ts_type().to_act_data_type(&None, source_map),
        }
    }
}
