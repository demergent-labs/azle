use cdk_framework::act::node::{candid::TypeAlias, CandidType};
use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsType, TsTypeAliasDecl};

use crate::ts_ast::{azle_type::AzleType, source_map::SourceMapped, GetName, GetTsType};

pub trait TypeAliasListHelpers {
    fn generate_type_alias_lookup(&self) -> HashMap<String, SourceMapped<TsTypeAliasDecl>>;
    fn build_type_alias_acts(&self, type_names: &HashSet<String>) -> Vec<CandidType>;
    fn get_type_aliases_by_type_ref_name(
        &self,
        type_ref_name: &str,
    ) -> Vec<SourceMapped<TsTypeAliasDecl>>;
}

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_data_type(&self) -> CandidType {
        // TODO: This should probably look ahead for Records, Funcs, Opts, etc.
        // and make those types directly rather than making a type alias to those types.
        // For example:
        // type SomeType = Record<{}>
        // should be parsed into a Record, rather than a type alias to an anonymous
        // record. It just ads messiness to the generated candid file.

        let name = self.get_name().to_string();

        let azle_type = AzleType::from_ts_type(self.get_ts_type(), self.source_map);

        CandidType::TypeAlias(TypeAlias {
            name,
            aliased_type: Box::from(azle_type.to_data_type()),
            type_params: vec![].into(),
        })
    }
}

impl GetTsType for SourceMapped<'_, TsTypeAliasDecl> {
    fn get_ts_type(&self) -> TsType {
        *self.type_ann.clone()
    }
}

impl GetName for SourceMapped<'_, TsTypeAliasDecl> {
    fn get_name(&self) -> &str {
        self.id.get_name()
    }
}

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn is_canister_type_alias_decl(&self) -> bool {
        self.type_ann.is_ts_type_ref()
            && &*self
                .type_ann
                .as_ts_type_ref()
                .unwrap()
                .type_name
                .as_ident()
                .unwrap()
                .get_name()
                == "Canister"
    }
}

impl TypeAliasListHelpers for Vec<SourceMapped<'_, TsTypeAliasDecl>> {
    fn generate_type_alias_lookup(&self) -> HashMap<String, SourceMapped<TsTypeAliasDecl>> {
        self.iter().fold(HashMap::new(), |mut acc, type_alias| {
            let type_alias_name = type_alias.id.get_name().to_string();
            acc.insert(
                type_alias_name,
                SourceMapped::new(type_alias, type_alias.source_map),
            );
            acc
        })
    }

    fn get_type_aliases_by_type_ref_name(
        &self,
        type_ref_name: &str,
    ) -> Vec<SourceMapped<TsTypeAliasDecl>> {
        self.clone()
            .into_iter()
            .filter(|type_alias| {
                type_alias
                    .type_ann
                    .as_ts_type_ref()
                    .and_then(|ts_type_ref| ts_type_ref.type_name.as_ident())
                    .map_or(false, |ident| ident.get_name() == type_ref_name)
            })
            .collect()
    }

    fn build_type_alias_acts(&self, type_names: &HashSet<String>) -> Vec<CandidType> {
        let type_alias_lookup = self.generate_type_alias_lookup();

        type_names
            .iter()
            .map(|dependent_type_name| {
                type_alias_lookup
                    .get(dependent_type_name)
                    .unwrap_or_else(|| {
                        panic!(
                            "ERROR: Dependent Type [{}] not found in TS program!",
                            dependent_type_name
                        )
                    })
                    .to_data_type()
            })
            .collect()
    }
}
