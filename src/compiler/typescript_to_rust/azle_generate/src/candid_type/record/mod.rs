pub mod errors;

use cdk_framework::{
    act::node::candid::{record::Member, Record},
    traits::{CollectIterResults, CollectResults},
};
use swc_ecma_ast::{TsPropertySignature, TsTypeAliasDecl, TsTypeElement, TsTypeLit, TsTypeRef};

use crate::{traits::GetName, ts_ast::SourceMapped, Error};

use self::errors::RecordPropertySignature;

use super::errors::WrongEnclosedType;

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_record(&self) -> Result<Option<Record>, Vec<Error>> {
        self.process_ts_type_ref(&self.alias_table.record, |type_ref| {
            if self.is_something_that_could_be_in_the_alias_table() {
                return Ok(None);
            }
            let (type_params, record_type_ref) =
                (self.get_type_params(), type_ref.to_record()).collect_results()?;
            match record_type_ref {
                Some(members) => Ok(Some(Record {
                    name: Some(self.id.get_name()),
                    type_params: type_params.into(),
                    ..members
                })),
                None => Ok(None),
            }
        })
        .map(|result| result.flatten())
    }
}

impl SourceMapped<'_, TsTypeRef> {
    pub fn is_record(&self) -> bool {
        return self.alias_table.record.contains(&self.get_name());
    }

    pub fn to_record(&self) -> Result<Option<Record>, Vec<Error>> {
        if !self.is_record() {
            return Ok(None);
        }
        Ok(Some(
            match self.get_ts_type()?.as_ts_type_lit() {
                Some(ts_type_lit) => ts_type_lit,
                None => return Err(vec![WrongEnclosedType::error_from_ts_type_ref(self).into()]),
            }
            .to_record()?,
        ))
    }
}

impl SourceMapped<'_, TsTypeLit> {
    pub fn to_record(&self) -> Result<Record, Vec<Error>> {
        let members: Vec<Member> = self
            .members
            .iter()
            .map(|member| self.spawn(member).to_record_member())
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
        match self.as_property_signature() {
            Some(ts_property_signature) => ts_property_signature.to_record_member(),
            None => Err(vec![
                RecordPropertySignature::from_ts_type_element(self).into()
            ]),
        }
    }
}

impl SourceMapped<'_, TsPropertySignature> {
    pub fn to_record_member(&self) -> Result<Member, Vec<Error>> {
        let (name, candid_type) = (
            self.get_member_name().map_err(Error::into),
            self.get_act_data_type(),
        )
            .collect_results()?;
        Ok(Member { name, candid_type })
    }
}
