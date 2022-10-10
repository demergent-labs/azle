use super::{ts_canister_decl::TsCanisterDecl, GetDependencies, GetName, GetTsType};
use crate::cdk_act::{nodes::ActNode, Actable, SystemStructureType, ToActDataType};
use std::collections::{HashMap, HashSet};
use swc_common::SourceMap;
use swc_ecma_ast::{TsType, TsTypeAliasDecl};

// TODO I am not super happy with this function... but that might be because I don't understand the system structure stuff
pub trait TsTypeAliasHelperMethods {
    fn is_type_alias_decl_system_structure_type(
        &self,
        system_structure_type: &SystemStructureType,
    ) -> bool;
}

pub trait TsTypeAliasListHelperMethods {
    fn generate_type_alias_lookup(&self) -> HashMap<String, TsTypeAliasDecl>;
    fn get_ast_ts_canister_decls(&self) -> Vec<TsCanisterDecl>;
    // TODO I think the only one we use this for nowadays is Canister... Should we condense these?
    fn get_ast_type_alias_decls_by_type_ref_name(
        &self,
        type_ref_name: &str,
    ) -> Vec<TsTypeAliasDecl>;
}

impl Actable for TsTypeAliasDecl {
    fn to_act_node(&self, source_map: &SourceMap) -> ActNode {
        let ts_type_name = self.get_name().to_string();

        ActNode::DataType(
            self.type_ann
                .to_act_data_type(&Some(&ts_type_name), source_map),
        )
    }
}

impl GetTsType for TsTypeAliasDecl {
    fn get_ts_type(&self) -> TsType {
        *self.type_ann.clone()
    }
}

impl GetDependencies for TsTypeAliasDecl {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> HashSet<String> {
        self.get_ts_type()
            .get_dependent_types(type_alias_lookup, found_types)
    }
}

impl GetName for TsTypeAliasDecl {
    fn get_name(&self) -> &str {
        self.id.sym.chars().as_str()
    }
}

impl TsTypeAliasHelperMethods for TsTypeAliasDecl {
    fn is_type_alias_decl_system_structure_type(
        &self,
        system_structure_type: &SystemStructureType,
    ) -> bool {
        match system_structure_type {
            SystemStructureType::Canister => {
                self.type_ann.is_ts_type_ref()
                    && &*self.type_ann.as_ts_type_ref().unwrap().get_name() == "Canister"
            }
        }
    }
}

impl TsTypeAliasListHelperMethods for Vec<TsTypeAliasDecl> {
    fn generate_type_alias_lookup(&self) -> HashMap<String, TsTypeAliasDecl> {
        self.iter()
            .fold(HashMap::new(), |mut acc, ast_type_alias_decl| {
                let type_alias_names = ast_type_alias_decl.id.get_name().to_string();
                acc.insert(type_alias_names, ast_type_alias_decl.clone());
                acc
            })
    }

    fn get_ast_ts_canister_decls(&self) -> Vec<TsCanisterDecl> {
        self.get_ast_type_alias_decls_by_type_ref_name("Canister")
            .iter()
            .map(|decl| TsCanisterDecl { decl: decl.clone() })
            .collect()
    }

    fn get_ast_type_alias_decls_by_type_ref_name(
        &self,
        type_ref_name: &str,
    ) -> Vec<TsTypeAliasDecl> {
        self.clone()
            .into_iter()
            .filter(|ts_type_alias_decl| {
                ts_type_alias_decl.type_ann.is_ts_type_ref()
                    && match ts_type_alias_decl.type_ann.as_ts_type_ref() {
                        Some(ts_type_ref) => match ts_type_ref.type_name.as_ident() {
                            Some(ident) => ident.sym.chars().as_str() == type_ref_name,
                            None => false,
                        },
                        None => false,
                    }
            })
            .collect()
    }
}
