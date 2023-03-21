use swc_common::SourceMap;
use swc_ecma_ast::{ClassDecl, FnDecl, Program};

use crate::{
    canister_method::module::ModuleHelperMethods,
    ts_ast::{source_map::SourceMapped, AzleFnDecl, AzleTypeAliasDecl},
};

pub use helper_methods::HelperMethods;

mod helper_methods;

pub struct AzleProgram {
    pub program: swc_ecma_ast::Program,
    pub source_map: SourceMap,
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

    fn get_external_canister_class_declarations(&self) -> Vec<SourceMapped<ClassDecl>> {
        match &self.program {
            Program::Module(module) => {
                module.get_external_canister_class_declarations(&self.source_map)
            }
            Program::Script(_) => vec![],
        }
    }

    fn get_fn_decls(&self) -> Vec<SourceMapped<FnDecl>> {
        match &self.program {
            Program::Module(module) => module.get_fn_decls(&self.source_map),
            Program::Script(_) => vec![],
        }
    }
}
