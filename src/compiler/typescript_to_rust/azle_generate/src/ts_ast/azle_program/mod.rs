use swc_common::SourceMap;
use swc_ecma_ast::Program;

use crate::ts_ast::{module::ModuleHelperMethods, AzleFnDecl, AzleTypeAliasDecl};

pub use helper_methods::HelperMethods;

mod helper_methods;
mod stable_b_tree_maps;

pub struct AzleProgram {
    pub program: swc_ecma_ast::Program,
    pub source_map: SourceMap,
}

impl AzleProgram {
    fn get_ast_fn_decls(&self) -> Vec<AzleFnDecl> {
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
