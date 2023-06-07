pub mod errors;

use cdk_framework::{
    act::node::candid::{record::Member, Record},
    traits::CollectResults,
};
use swc_ecma_ast::{TsPropertySignature, TsTypeAliasDecl, TsTypeElement, TsTypeLit, TsTypeRef};

use crate::{
    errors::CollectResults as OtherCollectResults,
    traits::{GetName, GetNameWithError},
    ts_ast::SourceMapped,
    Error,
};

use self::errors::RecordPropertySignature;

use super::errors::WrongEnclosedType;

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_record(&self) -> Result<Option<Record>, Vec<Error>> {
        self.process_ts_type_ref(&self.symbol_table.record, |type_ref| {
            let (type_params, members) =
                (self.get_type_params(), type_ref.to_record()).collect_results()?;
            match members {
                Some(members) => Ok(Some(Record {
                    name: Some(self.id.get_name().to_string()),
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
    pub fn to_record(&self) -> Result<Option<Record>, Vec<Error>> {
        if self
            .symbol_table
            .record
            .contains(&self.get_name()?.to_string())
        {
            Ok(Some(
                match self.get_ts_type()?.as_ts_type_lit() {
                    Some(ts_type_lit) => ts_type_lit,
                    None => {
                        return Err(vec![WrongEnclosedType::error_from_ts_type_ref(self).into()])
                    }
                }
                .to_record()?,
            ))
        } else {
            Ok(None)
        }
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
