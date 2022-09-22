use swc_ecma_ast::FnDecl;

use super::functions;
use crate::cdk_act::CanisterMethodActNode;

pub fn build_update_methods(ast_fnc_decls_update: &Vec<FnDecl>) -> Vec<CanisterMethodActNode> {
    ast_fnc_decls_update
        .iter()
        .fold(vec![], |acc, ast_fnc_decl_update| {
            let update_method = build_update_method(ast_fnc_decl_update);
            vec![acc, vec![update_method]].concat()
        })
}

fn build_update_method(ast_fnc_decl_update: &FnDecl) -> CanisterMethodActNode {
    let canister_method = functions::build_canister_method(ast_fnc_decl_update);

    CanisterMethodActNode::UpdateMethod(canister_method)
}
