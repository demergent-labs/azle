use cdk_framework::{
    nodes::ActCanisterMethod, traits::CanisterMethodBuilder, CanisterMethodType, RequestType,
    SystemStructureType,
};
use std::collections::{HashMap, HashSet};
use swc_ecma_ast::ClassDecl;

use crate::ts_ast::{
    ast_traits::GetDependencies,
    azle_type_alias_decls::azle_type_alias_decl::{
        AzleTypeAliasListHelperMethods, TsTypeAliasHelperMethods,
    },
    source_map::SourceMapped,
    AzleFnDecl, AzleProgram, AzleTypeAliasDecl,
};

pub trait HelperMethods {
    fn get_azle_fn_decls(&self) -> Vec<AzleFnDecl>;
    fn get_azle_type_alias_decls(&self) -> Vec<AzleTypeAliasDecl>;
    fn get_azle_type_alias_decls_for_system_structure_type(
        &self,
        system_structure_type: &SystemStructureType,
    ) -> Vec<AzleTypeAliasDecl>;
    fn get_external_canister_class_declarations(&self) -> Vec<SourceMapped<ClassDecl>>;
    fn get_azle_fn_decls_of_type(
        &self,
        canister_method_type: &CanisterMethodType,
    ) -> Vec<AzleFnDecl>;
    fn get_stable_b_tree_map_node_dependencies(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String>;
    fn get_dependent_types(&self) -> HashSet<String>;
    fn build_canister_method_nodes(&self, request_type: RequestType) -> Vec<ActCanisterMethod>;
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
            let azle_fn_decls = azle_program.get_azle_fn_decls();

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

    fn get_external_canister_class_declarations(&self) -> Vec<SourceMapped<ClassDecl>> {
        self.into_iter()
            .flat_map(|azle_program| azle_program.get_external_canister_class_declarations())
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
        let external_canister_class_declarations = self.get_external_canister_class_declarations();

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
        let canister_dependencies = external_canister_class_declarations
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
        let dependencies: HashSet<String> = dependencies
            .union(&canister_dependencies)
            .cloned()
            .collect();
        let dependencies: HashSet<String> = dependencies
            .union(&stable_b_tree_map_dependencies)
            .cloned()
            .collect();
        dependencies
    }

    fn build_canister_method_nodes(&self, request_type: RequestType) -> Vec<ActCanisterMethod> {
        let canister_method_type = match request_type {
            RequestType::Query => CanisterMethodType::Query,
            RequestType::Update => CanisterMethodType::Update,
        };

        let azle_fnc_decls = self.get_azle_fn_decls_of_type(&canister_method_type);

        azle_fnc_decls.iter().fold(vec![], |acc, fn_decl| {
            let canister_method_node = fn_decl.build_canister_method_node(&request_type);
            vec![acc, vec![canister_method_node]].concat()
        })
    }
}
