use cdk_framework::act::node::canister_method::CanisterMethodType;
use swc_ecma_ast::Program;

use crate::{
    canister_method::{module::ModuleHelperMethods, SourceMappedFnDecl},
    ts_ast::{AzleProgram, AzleTypeAliasDecl},
};

use crate::ts_ast::azle_type_alias_decl::TsTypeAliasHelperMethods;

pub trait GetProgramSourceMappedFnDecls {
    fn get_source_mapped_fn_decls(&self) -> Vec<SourceMappedFnDecl>;
    fn get_azle_type_alias_decls(&self) -> Vec<AzleTypeAliasDecl>;
    fn get_canister_azle_type_alias_decls(&self) -> Vec<AzleTypeAliasDecl>;
    fn get_source_mapped_fn_decls_of_type(
        &self,
        canister_method_type: CanisterMethodType,
    ) -> Vec<SourceMappedFnDecl>;
}

impl GetProgramSourceMappedFnDecls for Vec<AzleProgram> {
    fn get_source_mapped_fn_decls_of_type(
        &self,
        canister_method_type: CanisterMethodType,
    ) -> Vec<SourceMappedFnDecl> {
        let source_mapped_fn_decls = self.get_source_mapped_fn_decls();

        source_mapped_fn_decls
            .into_iter()
            .filter(|source_mapped_fn_decl| {
                source_mapped_fn_decl.is_canister_method_type(canister_method_type.clone())
            })
            .collect()
    }

    fn get_source_mapped_fn_decls(&self) -> Vec<SourceMappedFnDecl> {
        self.iter().fold(vec![], |acc, azle_program| {
            let source_mapped_fn_decls = azle_program.get_source_mapped_fn_decls();

            vec![acc, source_mapped_fn_decls].concat()
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
}

impl AzleProgram {
    fn get_source_mapped_fn_decls(&self) -> Vec<SourceMappedFnDecl> {
        match &self.program {
            Program::Module(module) => module.get_source_mapped_fn_decls(&self.source_map),
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
