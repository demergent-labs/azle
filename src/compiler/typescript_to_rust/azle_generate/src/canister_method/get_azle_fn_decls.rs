use cdk_framework::act::node::canister_method::{CanisterMethod, CanisterMethodType};
use swc_ecma_ast::Program;

use crate::{
    canister_method::module::ModuleHelperMethods,
    ts_ast::{AzleFnDecl, AzleProgram, AzleTypeAliasDecl},
};

use crate::ts_ast::azle_type_alias_decl::TsTypeAliasHelperMethods;

pub trait GetProgramAzleFnDecls {
    fn get_azle_fn_decls(&self) -> Vec<AzleFnDecl>;
    fn get_azle_type_alias_decls(&self) -> Vec<AzleTypeAliasDecl>;
    fn get_canister_azle_type_alias_decls(&self) -> Vec<AzleTypeAliasDecl>;
    fn get_azle_fn_decls_of_type(
        &self,
        canister_method_type: CanisterMethodType,
    ) -> Vec<AzleFnDecl>;
    fn build_canister_method_nodes(&self, request_type: CanisterMethodType) -> Vec<CanisterMethod>;
}

impl GetProgramAzleFnDecls for Vec<AzleProgram> {
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

impl AzleProgram {
    fn get_azle_fn_decls(&self) -> Vec<AzleFnDecl> {
        match &self.program {
            Program::Module(module) => module.get_azle_fn_decls(&self.source_map),
            Program::Script(_) => vec![],
        }
    }

    fn get_azle_type_alias_decls(&self) -> Vec<AzleTypeAliasDecl> {
        match &self.program {
            Program::Module(module) => module.get_azle_type_alias_decls(&self.source_map),
            Program::Script(_) => vec![],
        }
    }
}
