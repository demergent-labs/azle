use cdk_framework::act::node::canister_method::CanisterMethodType;
use swc_ecma_ast::{Program, TsTypeAliasDecl};

use crate::{
    canister_method::{module::ModuleHelperMethods, AnnotatedFnDecl},
    ts_ast::{source_map::SourceMapped, AzleProgram},
};

pub trait GetAnnotatedFnDecls {
    fn get_annotated_fn_decls(&self) -> Vec<AnnotatedFnDecl>;
    fn get_type_alias_decls(&self) -> Vec<SourceMapped<TsTypeAliasDecl>>;
    fn get_canister_type_alias_decls(&self) -> Vec<SourceMapped<TsTypeAliasDecl>>;
    fn get_annotated_fn_decls_of_type(
        &self,
        canister_method_type: CanisterMethodType,
    ) -> Vec<AnnotatedFnDecl>;
}

impl GetAnnotatedFnDecls for Vec<AzleProgram> {
    fn get_annotated_fn_decls_of_type(
        &self,
        canister_method_type: CanisterMethodType,
    ) -> Vec<AnnotatedFnDecl> {
        self.get_annotated_fn_decls()
            .into_iter()
            .filter(|annotated_fn_decl| {
                annotated_fn_decl.is_canister_method_type(canister_method_type.clone())
            })
            .collect()
    }

    fn get_annotated_fn_decls(&self) -> Vec<AnnotatedFnDecl> {
        self.iter()
            .flat_map(|azle_program| azle_program.get_annotated_fn_decls())
            .collect()
    }

    fn get_type_alias_decls(&self) -> Vec<SourceMapped<TsTypeAliasDecl>> {
        self.iter()
            .flat_map(|azle_program| azle_program.get_type_alias_decls())
            .collect()
    }

    fn get_canister_type_alias_decls(&self) -> Vec<SourceMapped<TsTypeAliasDecl>> {
        self.get_type_alias_decls()
            .into_iter()
            .filter(|type_alias_decl| type_alias_decl.is_canister_type_alias_decl())
            .collect()
    }
}

impl AzleProgram {
    fn get_annotated_fn_decls(&self) -> Vec<AnnotatedFnDecl> {
        match &self.program {
            Program::Module(module) => module.get_annotated_fn_decls(&self.source_map),
            Program::Script(_) => vec![],
        }
    }

    fn get_type_alias_decls(&self) -> Vec<SourceMapped<TsTypeAliasDecl>> {
        match &self.program {
            Program::Module(module) => module.get_type_alias_decls(&self.source_map),
            Program::Script(_) => vec![],
        }
    }
}
