use swc_ecma_ast::FnDecl;

use crate::cdk_act::{nodes::ActCanisterMethodNode, traits::CanisterMethodBuilder, RequestType};

pub mod method_body;

pub fn build_canister_method_nodes(
    fn_decls: &Vec<FnDecl>,
    request_type: RequestType,
) -> Vec<ActCanisterMethodNode> {
    fn_decls.iter().fold(vec![], |acc, fn_decl| {
        let canister_method_node = fn_decl.build_canister_method_node(&request_type);
        vec![acc, vec![canister_method_node]].concat()
    })
}
