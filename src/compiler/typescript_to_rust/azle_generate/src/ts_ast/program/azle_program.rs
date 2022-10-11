use swc_common::SourceMap;
use swc_ecma_ast::{FnDecl, Program};

use crate::{
    cdk_act::{CanisterMethodType, SystemStructureType},
    ts_ast::{
        fn_decl::FnDeclHelperMethods, module::ModuleHelperMethods,
        type_alias::azle_type_alias::TsTypeAliasHelperMethods, AzleTypeAlias,
    },
};

pub struct AzleProgram {
    pub program: swc_ecma_ast::Program,
    pub source_map: SourceMap,
}

impl AzleProgram {
    fn get_ast_fn_decls(&self) -> Vec<FnDecl> {
        match &self.program {
            Program::Module(module) => {
                let export_decls = module.get_export_decls();

                let fn_decls: Vec<FnDecl> = export_decls
                    .iter()
                    .filter(|export_decl| export_decl.decl.is_fn_decl())
                    .map(|export_decl| export_decl.decl.as_fn_decl().unwrap().clone())
                    .collect();

                fn_decls
            }
            Program::Script(_) => {
                vec![]
            }
        }
    }

    fn get_ast_type_alias_decls(&self) -> Vec<AzleTypeAlias> {
        match &self.program {
            Program::Module(module) => module.get_type_alias_decls(&self.source_map),
            Program::Script(_) => vec![],
        }
    }
}

pub trait TsProgramVecHelperMethods {
    fn get_fn_decls(&self) -> Vec<FnDecl>;
    fn get_ast_type_alias_decls(&self) -> Vec<AzleTypeAlias>;
    fn get_type_alias_decls_for_system_structure_type(
        &self,
        system_structure_type: &SystemStructureType,
    ) -> Vec<AzleTypeAlias>;
    fn get_fn_decls_of_type(&self, canister_method_type: &CanisterMethodType) -> Vec<FnDecl>;
}

impl TsProgramVecHelperMethods for Vec<AzleProgram> {
    fn get_fn_decls_of_type(&self, canister_method_type: &CanisterMethodType) -> Vec<FnDecl> {
        let fn_decls = self.get_fn_decls();

        fn_decls
            .into_iter()
            .filter(|fn_decl| fn_decl.is_canister_method_type_fn_decl(canister_method_type))
            .collect()
    }

    fn get_fn_decls(&self) -> Vec<FnDecl> {
        self.iter().fold(vec![], |acc, program| {
            let ast_fn_decls = program.get_ast_fn_decls();

            vec![acc, ast_fn_decls].concat()
        })
    }

    fn get_ast_type_alias_decls(&self) -> Vec<AzleTypeAlias> {
        self.iter().fold(vec![], |acc, program| {
            let ast_type_alias_decls = program.get_ast_type_alias_decls();

            vec![acc, ast_type_alias_decls].concat()
        })
    }

    fn get_type_alias_decls_for_system_structure_type(
        &self,
        system_structure_type: &SystemStructureType,
    ) -> Vec<AzleTypeAlias> {
        let type_alias_decls = self.get_ast_type_alias_decls();

        type_alias_decls
            .into_iter()
            .filter(|type_alias_decl| {
                type_alias_decl.is_type_alias_decl_system_structure_type(system_structure_type)
            })
            .collect()
    }
}
