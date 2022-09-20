use swc_ecma_ast::FnDecl;

use super::functions;
use crate::cdk_act::CanisterMethodActNode;

pub fn build_query_methods(ast_fnc_decls_query: &Vec<FnDecl>) -> Vec<CanisterMethodActNode> {
    ast_fnc_decls_query
        .iter()
        .fold(vec![], |acc, ast_fnc_decl_query| {
            let query_method = build_query_method(ast_fnc_decl_query);
            vec![acc, vec![query_method]].concat()
        })
}

fn build_query_method(ast_fnc_decl_query: &FnDecl) -> CanisterMethodActNode {
    let canister_method = functions::build_canister_method(ast_fnc_decl_query);

    CanisterMethodActNode::QueryMethod(canister_method)
}
