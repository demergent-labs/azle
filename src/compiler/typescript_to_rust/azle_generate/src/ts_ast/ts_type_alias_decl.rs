use super::{ts_canister_decl::TsCanisterDecl, ts_type, GetDependencies, GetName, GetTsType};
use crate::cdk_act::{nodes::ActNode, Actable, SystemStructureType, ToActDataType};
use std::{
    collections::{HashMap, HashSet},
    iter::FromIterator,
};
use swc_ecma_ast::{TsType, TsTypeAliasDecl};

pub fn is_type_alias_decl_system_structure_type(
    type_alias_decl: &TsTypeAliasDecl,
    system_structure_type: &SystemStructureType,
) -> bool {
    // let type_alias_decl
    match system_structure_type {
        SystemStructureType::Canister => {
            let type_reference_name_option =
                ts_type::get_identifier_name_for_ts_type(&*type_alias_decl.type_ann);

            match type_reference_name_option {
                Some(type_reference_name) => type_reference_name == "Canister",
                None => false,
            }
        }
    }
}

pub trait TsTypeAliasHelperMethods {
    fn generate_type_alias_lookup(&self) -> HashMap<String, TsTypeAliasDecl>;
    fn get_ast_ts_canister_decls(&self) -> Vec<TsCanisterDecl>;
    fn get_ast_type_alias_decls_by_type_ref_name(
        &self,
        type_ref_name: &str,
    ) -> Vec<TsTypeAliasDecl>;
}

impl TsTypeAliasHelperMethods for Vec<TsTypeAliasDecl> {
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

impl GetTsType for TsTypeAliasDecl {
    fn get_ts_type(&self) -> TsType {
        *self.type_ann.clone()
    }
}

impl Actable for TsTypeAliasDecl {
    fn to_act_node(&self) -> ActNode {
        let ts_type_name = self.get_name().to_string();

        ActNode::DataType(self.type_ann.to_act_data_type(&Some(&ts_type_name)))
    }
}

impl GetDependencies for Vec<TsCanisterDecl> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> Vec<String> {
        self.iter()
            .fold(HashSet::new(), |acc, canister_decl| {
                let hash_set: HashSet<String> = HashSet::from_iter(
                    canister_decl
                        .get_dependent_types(type_alias_lookup, &acc)
                        .iter()
                        .cloned(),
                );
                acc.union(&hash_set).cloned().collect()
            })
            .into_iter()
            .collect()
    }
}

impl GetDependencies for TsTypeAliasDecl {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> Vec<String> {
        self.type_ann
            .get_dependent_types(type_alias_lookup, found_types)
    }
}

impl GetName for TsTypeAliasDecl {
    fn get_name(&self) -> &str {
        self.id.sym.chars().as_str()
    }
}
