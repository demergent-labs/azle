pub mod errors;

use cdk_framework::{
    act::node::candid::{variant::Member, Variant},
    traits::{CollectIterResults, CollectResults},
};
use swc_ecma_ast::{TsPropertySignature, TsTypeAliasDecl, TsTypeElement, TsTypeLit, TsTypeRef};

use crate::{traits::GetName, ts_ast::SourceMapped, Error};

use self::errors::VariantPropertySignature;

use super::errors::WrongEnclosedType;

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_variant(&self) -> Result<Option<Variant>, Vec<Error>> {
        self.process_ts_type_ref(&self.alias_table.variant, |type_ref| {
            if self.is_something_that_could_be_in_the_alias_table() {
                return Ok(None);
            }
            // TODO this should be undone once we put all user-defined types in their own module
            let name_string = self.id.get_name();
            let name = Some(if name_string == "Result" {
                "_AzleResult".to_string()
            } else {
                name_string
            });

            let (type_params, variant_type_ref) =
                (self.get_type_params(), type_ref.to_variant()).collect_results()?;

            match variant_type_ref {
                Some(members) => Ok(Some(Variant {
                    name,
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
    pub fn is_variant(&self) -> bool {
        self.alias_table.variant.contains(&self.get_name())
    }

    pub fn to_variant(&self) -> Result<Option<Variant>, Vec<Error>> {
        if !self.is_variant() {
            return Ok(None);
        }
        Ok(Some(
            match self.get_ts_type()?.as_ts_type_lit() {
                Some(ts_type_lit) => ts_type_lit,
                None => return Err(vec![WrongEnclosedType::error_from_ts_type_ref(self).into()]),
            }
            .to_variant()?,
        ))
    }
}

impl SourceMapped<'_, TsTypeLit> {
    pub fn to_variant(&self) -> Result<Variant, Vec<Error>> {
        let ts_type_element_to_variant_member =
            |member: &TsTypeElement| self.spawn(member).to_variant_member();
        let members: Vec<Member> = self
            .members
            .iter()
            .map(ts_type_element_to_variant_member)
            .collect_results()?;

        Ok(Variant {
            name: None,
            members,
            type_params: vec![].into(),
        })
    }
}

impl SourceMapped<'_, TsTypeElement> {
    pub fn to_variant_member(&self) -> Result<Member, Vec<Error>> {
        let ts_property_signature = match self.as_property_signature() {
            Some(ts_property_signature) => ts_property_signature,
            None => {
                return Err(vec![
                    VariantPropertySignature::from_ts_type_element(self).into()
                ])
            }
        };
        ts_property_signature.to_variant_member()
    }
}

impl SourceMapped<'_, TsPropertySignature> {
    pub(super) fn to_variant_member(&self) -> Result<Member, Vec<Error>> {
        let (name, candid_type) = (
            self.get_member_name().map_err(Error::into),
            self.get_act_data_type(),
        )
            .collect_results()?;
        Ok(Member { name, candid_type })
    }
}
