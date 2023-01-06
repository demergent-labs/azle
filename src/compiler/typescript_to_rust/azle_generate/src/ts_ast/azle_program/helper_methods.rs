use std::collections::HashSet;

use crate::ts_ast::{
    ast_traits::GetDependencies,
    azle_type_alias_decls::azle_type_alias_decl::{
        AzleTypeAliasListHelperMethods, TsTypeAliasHelperMethods,
    },
    AzleFnDecl, AzleProgram, AzleTypeAliasDecl,
};
use cdk_framework::{CanisterMethodType, SystemStructureType};

pub trait HelperMethods {
    fn get_azle_fn_decls(&self) -> Vec<AzleFnDecl>;
    fn get_azle_type_alias_decls(&self) -> Vec<AzleTypeAliasDecl>;
    fn get_azle_type_alias_decls_for_system_structure_type(
        &self,
        system_structure_type: &SystemStructureType,
    ) -> Vec<AzleTypeAliasDecl>;
    fn get_azle_fn_decls_of_type(
        &self,
        canister_method_type: &CanisterMethodType,
    ) -> Vec<AzleFnDecl>;
    fn get_dependent_types(&self) -> HashSet<String>;
}

impl HelperMethods for Vec<AzleProgram> {
    fn get_azle_fn_decls_of_type(
        &self,
        canister_method_type: &CanisterMethodType,
    ) -> Vec<AzleFnDecl> {
        let azle_fn_decls = self.get_azle_fn_decls();

        azle_fn_decls
            .into_iter()
            .filter(|azle_fn_decl| azle_fn_decl.is_canister_method_type(canister_method_type))
            .collect()
    }

    fn get_azle_fn_decls(&self) -> Vec<AzleFnDecl> {
        self.iter().fold(vec![], |acc, azle_program| {
            let azle_fn_decls = azle_program.get_ast_fn_decls();

            vec![acc, azle_fn_decls].concat()
        })
    }

    fn get_azle_type_alias_decls(&self) -> Vec<AzleTypeAliasDecl> {
        self.iter().fold(vec![], |acc, azle_program| {
            let ast_type_alias_decls = azle_program.get_azle_type_alias_decls();

            vec![acc, ast_type_alias_decls].concat()
        })
    }

    fn get_azle_type_alias_decls_for_system_structure_type(
        &self,
        system_structure_type: &SystemStructureType,
    ) -> Vec<AzleTypeAliasDecl> {
        let type_alias_decls = self.get_azle_type_alias_decls();

        type_alias_decls
            .into_iter()
            .filter(|type_alias_decl| {
                type_alias_decl.is_type_alias_decl_system_structure_type(system_structure_type)
            })
            .collect()
    }

    fn get_dependent_types(&self) -> HashSet<String> {
        let ast_type_alias_decls = &self.get_azle_type_alias_decls();

        // Pull out canister type alias decls
        let ast_canister_type_alias_decls = ast_type_alias_decls.get_ast_ts_canister_decls();

        // Separate function decls into queries and updates
        let azle_fnc_decls_query = self.get_azle_fn_decls_of_type(&CanisterMethodType::Query);
        let azle_fnc_decls_update = self.get_azle_fn_decls_of_type(&CanisterMethodType::Update);

        // Determine which type aliases must be present for the functions to work and save them for later parsing
        let found_type_names = HashSet::new();
        let ast_type_alias_lookup = ast_type_alias_decls.generate_type_alias_lookup();
        let query_dependencies =
            azle_fnc_decls_query.get_dependent_types(&ast_type_alias_lookup, &found_type_names);
        let update_dependencies =
            azle_fnc_decls_update.get_dependent_types(&ast_type_alias_lookup, &found_type_names);
        let canister_dependencies = ast_canister_type_alias_decls
            .get_dependent_types(&ast_type_alias_lookup, &found_type_names);

        let dependencies: HashSet<String> = query_dependencies
            .union(&update_dependencies)
            .cloned()
            .collect();
        let dependencies: HashSet<String> = dependencies
            .union(&canister_dependencies)
            .cloned()
            .collect();
        dependencies
    }
}
