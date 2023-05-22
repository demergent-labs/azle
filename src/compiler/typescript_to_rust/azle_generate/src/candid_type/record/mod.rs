pub mod errors;

use cdk_framework::act::node::candid::{record::Member, Record};
use swc_ecma_ast::{TsPropertySignature, TsTypeAliasDecl, TsTypeElement, TsTypeLit, TsTypeRef};

use crate::{errors::CollectResults, traits::GetName, ts_ast::SourceMapped, Error};

use self::errors::RecordPropertySignature;

use super::errors::WrongEnclosedType;

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_record(&self) -> Result<Option<Record>, Vec<Error>> {
        self.process_ts_type_ref("Record", |type_ref| {
            Ok(Record {
                name: Some(self.id.get_name().to_string()),
                type_params: self.get_type_params()?.into(),
                ..type_ref.to_record()?
            })
        })
    }
}

impl SourceMapped<'_, TsTypeRef> {
    pub fn to_record(&self) -> Result<Record, Vec<Error>> {
        match self.get_ts_type()?.as_ts_type_lit() {
            Some(ts_type_lit) => ts_type_lit,
            None => return Err(vec![WrongEnclosedType::from_ts_type_ref(self).into()]),
        }
        .to_record()
    }
}

impl SourceMapped<'_, TsTypeLit> {
    pub fn to_record(&self) -> Result<Record, Vec<Error>> {
        let members: Vec<Member> = self
            .members
            .iter()
            .map(|member| SourceMapped::new(member, self.source_map).to_record_member())
            .collect_results()?;

        Ok(Record {
            name: None,
            members,
            type_params: vec![].into(),
        })
    }
}

impl SourceMapped<'_, TsTypeElement> {
    pub fn to_record_member(&self) -> Result<Member, Vec<Error>> {
        let ts_property_signature = match self.as_property_signature() {
            Some(ts_property_signature) => ts_property_signature,
            None => {
                return Err(vec![
                    RecordPropertySignature::from_ts_type_element(self).into()
                ])
            }
        };
        ts_property_signature.to_record_member()
    }
}

impl SourceMapped<'_, TsPropertySignature> {
    pub fn to_record_member(&self) -> Result<Member, Vec<Error>> {
        Ok(Member {
            name: self.get_member_name(),
            candid_type: self.get_act_data_type()?,
        })
    }
}
