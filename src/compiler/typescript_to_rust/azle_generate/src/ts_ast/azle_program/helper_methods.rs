use cdk_framework::act::node::canister_method::{CanisterMethod, CanisterMethodType};
use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{ClassDecl, FnDecl};

use crate::ts_ast::{
    azle_type_alias_decls::azle_type_alias_decl::{
        AzleTypeAliasListHelperMethods, TsTypeAliasHelperMethods,
    },
    source_map::SourceMapped,
    traits::GetDependencies,
    AzleFnDecl, AzleProgram, AzleTypeAliasDecl,
};

pub trait HelperMethods {
    fn get_azle_fn_decls(&self) -> Vec<AzleFnDecl>;
    fn get_fn_decls(&self) -> Vec<SourceMapped<FnDecl>>;
    fn get_azle_type_alias_decls(&self) -> Vec<AzleTypeAliasDecl>;
    fn get_canister_azle_type_alias_decls(&self) -> Vec<AzleTypeAliasDecl>;
    fn get_service_class_declarations(&self) -> Vec<SourceMapped<ClassDecl>>;
    fn get_azle_fn_decls_of_type(
        &self,
        canister_method_type: CanisterMethodType,
    ) -> Vec<AzleFnDecl>;
    fn get_stable_b_tree_map_node_dependencies(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String>;
    fn get_dependent_types(&self) -> HashSet<String>;
    fn build_canister_method_nodes(&self, request_type: CanisterMethodType) -> Vec<CanisterMethod>;
}

impl HelperMethods for Vec<AzleProgram> {
    fn get_azle_fn_decls_of_type(
        &self,
        canister_method_type: CanisterMethodType,
    ) -> Vec<AzleFnDecl> {
        let azle_fn_decls = self.get_azle_fn_decls();

        azle_fn_decls
            .into_iter()
            .filter(|azle_fn_decl| {
                azle_fn_decl.is_canister_method_type(canister_method_type.clone())
            })
            .collect()
    }

    fn get_azle_fn_decls(&self) -> Vec<AzleFnDecl> {
        self.iter().fold(vec![], |acc, azle_program| {
            let azle_fn_decls = azle_program.get_azle_fn_decls();

            vec![acc, azle_fn_decls].concat()
        })
    }

    fn get_fn_decls(&self) -> Vec<SourceMapped<FnDecl>> {
        self.iter().fold(vec![], |mut acc, azle_program| {
            // acc is mut because SourceMapped<FnDecl> can't be cloned, which is
            // necessary to do something like:
            // vec![acc, vec![azle_program.get_fn_decls()]].concat()

            acc.extend(azle_program.get_fn_decls());
            acc
        })
    }

    fn get_azle_type_alias_decls(&self) -> Vec<AzleTypeAliasDecl> {
        self.iter().fold(vec![], |acc, azle_program| {
            let ast_type_alias_decls = azle_program.get_azle_type_alias_decls();

            vec![acc, ast_type_alias_decls].concat()
        })
    }

    fn get_canister_azle_type_alias_decls(&self) -> Vec<AzleTypeAliasDecl> {
        let type_alias_decls = self.get_azle_type_alias_decls();

        type_alias_decls
            .into_iter()
            .filter(|type_alias_decl| type_alias_decl.is_canister_type_alias_decl())
            .collect()
    }

    fn get_service_class_declarations(&self) -> Vec<SourceMapped<ClassDecl>> {
        self.into_iter()
            .flat_map(|azle_program| azle_program.get_service_class_declarations())
            .collect()
    }

    fn get_stable_b_tree_map_node_dependencies(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        self.iter()
            .fold(found_type_names.clone(), |acc, azle_program| {
                let azle_stable_b_tree_map_nodes = azle_program.azle_stable_b_tree_map_nodes();
                let stable_b_tree_map_dependencies = azle_stable_b_tree_map_nodes.iter().fold(
                    acc.clone(),
                    |acc, azle_stable_b_tree_map_node| {
                        acc.union(&azle_stable_b_tree_map_node.get_dependent_types(
                            type_alias_lookup,
                            &acc,
                            &azle_program.source_map,
                        ))
                        .cloned()
                        .collect()
                    },
                );

                acc.union(&stable_b_tree_map_dependencies)
                    .cloned()
                    .collect()
            })
    }

    fn get_dependent_types(&self) -> HashSet<String> {
        let ast_type_alias_decls = &self.get_azle_type_alias_decls();

        // Pull out canister decls
        let service_class_declarations = self.get_service_class_declarations();

        // Separate function decls into queries and updates
        let azle_fnc_decls_query = self.get_azle_fn_decls_of_type(CanisterMethodType::Query);
        let azle_fnc_decls_update = self.get_azle_fn_decls_of_type(CanisterMethodType::Update);

        // Determine which type aliases must be present for the functions to work and save them for later parsing
        let found_type_names = HashSet::new();
        let ast_type_alias_lookup = ast_type_alias_decls.generate_type_alias_lookup();
        let query_dependencies =
            azle_fnc_decls_query.get_dependent_types(&ast_type_alias_lookup, &found_type_names);
        let update_dependencies =
            azle_fnc_decls_update.get_dependent_types(&ast_type_alias_lookup, &found_type_names);
        let service_dependencies = service_class_declarations
            .get_dependent_types(&ast_type_alias_lookup, &found_type_names);

        let stable_b_tree_map_dependencies =
            self.get_stable_b_tree_map_node_dependencies(&ast_type_alias_lookup, &found_type_names);

        // // TODO: Get them from StableBTreeMaps
        // let stable_b_tree_map_node_deps = self.stable_b_tree_map_nodes().iter()
        //     .get_dependent_types;

        let dependencies: HashSet<String> = query_dependencies
            .union(&update_dependencies)
            .cloned()
            .collect();
        let dependencies: HashSet<String> =
            dependencies.union(&service_dependencies).cloned().collect();
        let dependencies: HashSet<String> = dependencies
            .union(&stable_b_tree_map_dependencies)
            .cloned()
            .collect();
        dependencies
    }

    fn build_canister_method_nodes(
        &self,
        canister_method_type: CanisterMethodType,
    ) -> Vec<CanisterMethod> {
        let azle_fnc_decls = self.get_azle_fn_decls_of_type(canister_method_type.clone());

        azle_fnc_decls.iter().fold(vec![], |acc, fn_decl| {
            let canister_method_node = fn_decl.build_canister_method_node(&canister_method_type);
            vec![acc, vec![canister_method_node]].concat()
        })
    }
}
