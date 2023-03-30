use cdk_framework::act::node::CandidType;
use swc_ecma_ast::{Decl, Expr, Program};

use crate::ts_ast::{source_map::SourceMapped, AzleProgram, GetName, TsAst};
use module_item::AsDecl;

mod module_item;
mod new_expr;
pub mod rust;

#[derive(Clone, Debug)]
pub struct StableBTreeMapNode {
    pub memory_id: u8,
    pub key_type: CandidType,
    pub value_type: CandidType,
    pub max_key_size: u32,
    pub max_value_size: u32,
}

impl TsAst {
    pub fn build_stable_b_tree_map_nodes(&self) -> Vec<StableBTreeMapNode> {
        self.azle_programs
            .iter()
            .flat_map(|azle_program| azle_program.build_stable_b_tree_map_nodes())
            .collect()
    }
}

impl AzleProgram {
    pub fn build_stable_b_tree_map_nodes(&self) -> Vec<StableBTreeMapNode> {
        match &self.program {
            Program::Module(module) => module
                .body
                .iter()
                .filter_map(|module_item| module_item.as_decl())
                .flat_map(|decl| self.process_decl(decl).into_iter())
                .collect(),
            Program::Script(_) => vec![],
        }
    }

    fn process_decl(&self, decl: &Decl) -> Vec<StableBTreeMapNode> {
        match decl {
            Decl::Var(var_decl) => self.process_var_decl(var_decl),
            _ => vec![],
        }
    }

    fn process_var_decl(&self, var_decl: &swc_ecma_ast::VarDecl) -> Vec<StableBTreeMapNode> {
        var_decl
            .decls
            .iter()
            .filter_map(|var_declarator| match &var_declarator.init {
                Some(init) => match &**init {
                    Expr::New(new_expr)
                        if matches!(
                            &*new_expr.callee,
                            Expr::Ident(ident) if ident.get_name() == "StableBTreeMap"
                        ) =>
                    {
                        let new_expr = SourceMapped::new(new_expr, &self.source_map);
                        match new_expr.to_stable_b_tree_map_node() {
                            Ok(stable_b_tree_map_node) => Some(stable_b_tree_map_node),
                            Err(err) => panic!("{}", err),
                        }
                    }
                    _ => None,
                },
                _ => None,
            })
            .collect()
    }
}
