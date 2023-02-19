use std::collections::{HashMap, HashSet};

use swc_common::SourceMap;
use swc_ecma_ast::{TsType, TsTypeAliasDecl};

use crate::ts_ast::{azle_type::AzleType, GetDependencies, GetName, GetTsType};
use cdk_framework::{ActDataType, Actable, SystemStructureType, ToActDataType};

#[derive(Clone)]
pub struct AzleTypeAliasDecl<'a> {
    pub ts_type_alias_decl: TsTypeAliasDecl,
    pub source_map: &'a SourceMap,
}

// TODO I am not super happy with this function... but that might be because I don't understand the system structure stuff
pub trait TsTypeAliasHelperMethods {
    fn is_type_alias_decl_system_structure_type(
        &self,
        system_structure_type: &SystemStructureType,
    ) -> bool;
}

pub trait AzleTypeAliasListHelperMethods {
    fn generate_type_alias_lookup(&self) -> HashMap<String, AzleTypeAliasDecl>;
    fn build_type_alias_acts(&self, type_names: &HashSet<String>) -> Vec<ActDataType>;
    fn get_azle_type_aliases_by_type_ref_name(&self, type_ref_name: &str)
        -> Vec<AzleTypeAliasDecl>;
}

impl Actable for AzleTypeAliasDecl<'_> {
    fn to_act_node(&self) -> ActDataType {
        let ts_type_name = self.get_name().to_string();

        let azle_type = AzleType::from_ts_type(self.get_ts_type(), self.source_map);

        azle_type.to_act_data_type(&Some(&ts_type_name))
    }
}

impl GetTsType for AzleTypeAliasDecl<'_> {
    fn get_ts_type(&self) -> TsType {
        *self.ts_type_alias_decl.type_ann.clone()
    }
}

impl GetDependencies for AzleTypeAliasDecl<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        let azle_type = AzleType::from_ts_type(self.get_ts_type(), self.source_map);

        azle_type.get_dependent_types(type_alias_lookup, found_type_names)
    }
}

impl GetName for AzleTypeAliasDecl<'_> {
    fn get_name(&self) -> &str {
        self.ts_type_alias_decl.id.get_name()
    }
}

impl TsTypeAliasHelperMethods for AzleTypeAliasDecl<'_> {
    fn is_type_alias_decl_system_structure_type(
        &self,
        system_structure_type: &SystemStructureType,
    ) -> bool {
        match system_structure_type {
            SystemStructureType::Canister => {
                self.ts_type_alias_decl.type_ann.is_ts_type_ref()
                    && &*self
                        .ts_type_alias_decl
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
    }
}

impl AzleTypeAliasListHelperMethods for Vec<AzleTypeAliasDecl<'_>> {
    fn generate_type_alias_lookup(&self) -> HashMap<String, AzleTypeAliasDecl> {
        self.iter()
            .fold(HashMap::new(), |mut acc, azle_type_alias| {
                let type_alias_name = azle_type_alias.ts_type_alias_decl.id.get_name().to_string();
                acc.insert(type_alias_name, azle_type_alias.clone());
                acc
            })
    }

    fn get_azle_type_aliases_by_type_ref_name(
        &self,
        type_ref_name: &str,
    ) -> Vec<AzleTypeAliasDecl> {
        self.clone()
            .into_iter()
            .filter(|azle_type_alias| {
                azle_type_alias.ts_type_alias_decl.type_ann.is_ts_type_ref()
                    && match azle_type_alias.ts_type_alias_decl.type_ann.as_ts_type_ref() {
                        Some(ts_type_ref) => match ts_type_ref.type_name.as_ident() {
                            Some(ident) => ident.get_name() == type_ref_name,
                            None => false,
                        },
                        None => false,
                    }
            })
            .collect()
    }

    fn build_type_alias_acts(&self, type_names: &HashSet<String>) -> Vec<ActDataType> {
        let type_alias_lookup = self.generate_type_alias_lookup();

        type_names.iter().fold(vec![], |acc, dependant_type_name| {
            let type_alias_decl = type_alias_lookup.get(dependant_type_name);
            let act_data_type = match type_alias_decl {
                Some(azle_type_alias) => azle_type_alias.to_act_node(),
                None => {
                    panic!(
                        "ERROR: Dependant Type [{}] not found in TS program!",
                        dependant_type_name
                    )
                }
            };
            vec![acc, vec![act_data_type]].concat()
        })
    }
}
