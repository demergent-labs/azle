use cdk_framework::act::node::candid::{record::Member, Record};
use swc_ecma_ast::TsTypeAliasDecl;

use crate::ts_ast::{
    azle_type::{
        azle_type_lit::{
            azle_type_element::azle_property_signature::AzlePropertySignature, AzleTypeElement,
        },
        AzleTypeLit,
    },
    source_map::SourceMapped,
    GetName,
};

use super::azle_type_ref::AzleTypeRef;

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_record(&self) -> Option<Record> {
        self.process_ts_type_ref("Record", |azle_type_ref| {
            let mut record = azle_type_ref.to_record();
            record.name = Some(self.id.get_name().to_string());
            record
        })
    }
}

impl AzleTypeRef<'_> {
    pub fn to_record(&self) -> Record {
        match self.get_enclosed_azle_type().as_azle_type_lit() {
            Some(ts_type_lit) => ts_type_lit,
            None => panic!("{}", self.wrong_enclosed_type_error()),
        }
        .to_record()
    }
}

impl AzleTypeLit<'_> {
    pub fn to_record(&self) -> Record {
        let members: Vec<Member> = self
            .ts_type_lit
            .members
            .iter()
            .map(|member| {
                AzleTypeElement::from_ts_type_element(member.clone(), self.source_map)
                    .to_record_member()
            })
            .collect();

        Record {
            name: None,
            members,
        }
    }
}

impl AzleTypeElement<'_> {
    pub fn to_record_member(&self) -> Member {
        let ts_property_signature = match self.as_azle_property_signature() {
            Some(ts_property_signature) => ts_property_signature,
            None => panic!("{}", self.record_property_signature_error()),
        };
        ts_property_signature.to_record_member()
    }
}

impl AzlePropertySignature<'_> {
    pub fn to_record_member(&self) -> Member {
        Member {
            name: self.get_member_name(),
            candid_type: self.get_act_data_type(),
        }
    }
}
