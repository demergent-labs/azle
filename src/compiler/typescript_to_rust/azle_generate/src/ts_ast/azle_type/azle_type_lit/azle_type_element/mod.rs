use swc_common::SourceMap;
use swc_ecma_ast::TsTypeElement;

use cdk_framework::nodes::data_type_nodes::{ActRecordMember, ActVariantMember};

use self::{
    azle_method_signature::AzleMethodSignature, azle_property_signature::AzlePropertySignature,
};

mod azle_method_signature;
mod azle_property_signature;
mod errors;
mod get_dependencies;
mod get_source_info;
mod get_source_text;
mod get_span;
mod type_to_string;

pub enum AzleTypeElement<'a> {
    AzlePropertySignature(AzlePropertySignature<'a>),
    AzleMethodSignature(AzleMethodSignature<'a>),
}

impl AzleTypeElement<'_> {
    pub(super) fn from_ts_type_element(
        ts_type_element: TsTypeElement,
        source_map: &SourceMap,
    ) -> AzleTypeElement {
        match ts_type_element {
            TsTypeElement::TsPropertySignature(ts_property_signature) => {
                AzleTypeElement::AzlePropertySignature(AzlePropertySignature {
                    ts_property_signature,
                    source_map,
                })
            }
            TsTypeElement::TsMethodSignature(ts_method_signature) => {
                AzleTypeElement::AzleMethodSignature(AzleMethodSignature {
                    ts_method_signature,
                    source_map,
                })
            }
            _ => panic!(
                "{}",
                errors::unsupported_type_error(ts_type_element, source_map)
            ),
        }
    }

    pub(super) fn to_record_member(&self) -> ActRecordMember {
        let ts_property_signature = match self.as_azle_property_signature() {
            Some(ts_property_signature) => ts_property_signature,
            None => panic!("{}", self.record_property_signature_error()),
        };
        ts_property_signature.to_record_member()
    }

    pub(super) fn to_variant_member(&self) -> ActVariantMember {
        let ts_property_signature = match self.as_azle_property_signature() {
            Some(ts_property_signature) => ts_property_signature,
            None => panic!("{}", self.variant_property_signature_error()),
        };
        ts_property_signature.to_variant_member()
    }

    pub(self) fn get_source_map(&self) -> &SourceMap {
        match self {
            AzleTypeElement::AzlePropertySignature(azle_property_signature) => {
                azle_property_signature.source_map
            }
            AzleTypeElement::AzleMethodSignature(azle_method_signature) => {
                azle_method_signature.source_map
            }
        }
    }

    fn as_azle_property_signature(&self) -> Option<&AzlePropertySignature> {
        match self {
            AzleTypeElement::AzlePropertySignature(azle_property_signature) => {
                Some(azle_property_signature)
            }
            _ => None,
        }
    }
}
