use cdk_framework::act::node::CandidType;
use std::ops::Deref;
use swc_ecma_ast::{Decl, Expr};

use crate::{
    errors::CollectResults,
    traits::GetName,
    ts_ast::{Program, SourceMapped, TsAst},
    Error,
};
use module_item::AsDecl;

mod expr;
mod module_item;
pub mod new_expr;

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
    pub fn build_stable_b_tree_map_nodes(&self) -> Result<Vec<StableBTreeMapNode>, Vec<Error>> {
        self.programs
            .iter()
            .map(|program| program.build_stable_b_tree_map_nodes())
            .collect_results()
            .map(|vec_of_vec| vec_of_vec.into_iter().flatten().collect::<Vec<_>>())
    }
}

impl Program {
    pub fn build_stable_b_tree_map_nodes(&self) -> Result<Vec<StableBTreeMapNode>, Vec<Error>> {
        match self.deref() {
            swc_ecma_ast::Program::Module(module) => module
                .body
                .iter()
                .filter_map(|module_item| module_item.as_decl())
                .map(|decl| self.process_decl(decl))
                .collect_results()
                .map(|vec_of_vec| vec_of_vec.into_iter().flatten().collect::<Vec<_>>()),
            swc_ecma_ast::Program::Script(_) => Ok(vec![]),
        }
    }

    fn process_decl(&self, decl: &Decl) -> Result<Vec<StableBTreeMapNode>, Vec<Error>> {
        match decl {
            Decl::Var(var_decl) => self.process_var_decl(var_decl),
            _ => Ok(vec![]),
        }
    }

    fn process_var_decl(
        &self,
        var_decl: &swc_ecma_ast::VarDecl,
    ) -> Result<Vec<StableBTreeMapNode>, Vec<Error>> {
        var_decl
            .decls
            .iter()
            .filter_map(|var_declarator| match &var_declarator.init {
                Some(init) => match &**init {
                    Expr::New(new_expr)
                        if matches!(
                            &*new_expr.callee,
                            Expr::Ident(ident) if self.symbol_table.stable_b_tree_map.contains(&ident.get_name().to_string())
                        ) =>
                    {
                        Some(
                            SourceMapped::new(new_expr, &self.source_map, &self.symbol_table)
                                .to_stable_b_tree_map_node(),
                        )
                    }
                    _ => None,
                },
                _ => None,
            })
            .collect()
    }
}
