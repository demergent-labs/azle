use cdk_framework::act::node::canister_method::{CanisterMethod, CanisterMethodType};
use swc_ecma_ast::FnDecl;

use crate::ts_ast::{
    azle_type_alias_decl::TsTypeAliasHelperMethods, source_map::SourceMapped, AzleFnDecl,
    AzleProgram, AzleTypeAliasDecl,
};

pub trait HelperMethods {
    fn get_azle_fn_decls(&self) -> Vec<AzleFnDecl>;
    fn get_fn_decls(&self) -> Vec<SourceMapped<FnDecl>>;
    fn get_azle_type_alias_decls(&self) -> Vec<AzleTypeAliasDecl>;
    fn get_canister_azle_type_alias_decls(&self) -> Vec<AzleTypeAliasDecl>;
    fn get_azle_fn_decls_of_type(
        &self,
        canister_method_type: CanisterMethodType,
    ) -> Vec<AzleFnDecl>;
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
