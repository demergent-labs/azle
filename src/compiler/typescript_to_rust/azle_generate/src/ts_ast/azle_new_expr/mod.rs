use swc_common::SourceMap;
use swc_ecma_ast::NewExpr;

mod errors;
mod to_stable_b_tree_map;

#[derive(Clone)]
pub struct AzleNewExpr<'a> {
    pub new_expr: NewExpr,
    pub source_map: &'a SourceMap,
}
