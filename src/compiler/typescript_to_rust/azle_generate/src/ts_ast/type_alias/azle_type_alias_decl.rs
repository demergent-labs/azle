use std::collections::{HashMap, HashSet};

use swc_common::SourceMap;
use swc_ecma_ast::{TsType, TsTypeAliasDecl};

use crate::{
    cdk_act::{nodes::ActNode, Actable, SystemStructureType, ToActDataType},
    ts_ast::{ts_canister_decl::TsCanisterDecl, GetDependencies, GetName, GetTsType},
};

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
    fn get_ast_ts_canister_decls(&self) -> Vec<TsCanisterDecl>;
    fn get_azle_type_aliases_by_type_ref_name(&self, type_ref_name: &str)
        -> Vec<AzleTypeAliasDecl>;
}

impl Actable for AzleTypeAliasDecl<'_> {
    fn to_act_node(&self) -> ActNode {
        let ts_type_name = self.get_name().to_string();

        ActNode::DataType(
            self.ts_type_alias_decl
                .type_ann
                .to_act_data_type(&Some(&ts_type_name)),
        )
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
        self.get_ts_type()
            .get_dependent_types(type_alias_lookup, found_type_names)
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
                let type_alias_names = azle_type_alias.ts_type_alias_decl.id.get_name().to_string();
                acc.insert(type_alias_names, azle_type_alias.clone());
                acc
            })
    }

    fn get_ast_ts_canister_decls(&self) -> Vec<TsCanisterDecl> {
        self.get_azle_type_aliases_by_type_ref_name("Canister")
            .iter()
            .map(|decl| TsCanisterDecl {
                azle_type_alias: decl.clone(),
            })
            .collect()
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
}
