use crate::{
    cdk_act::{nodes::ActCanisterMethod, traits::CanisterMethodBuilder, RequestType},
    ts_ast::azle_types::AzleFnDecl,
};

pub mod method_body;

pub fn build_canister_method_nodes(
    fn_decls: &Vec<AzleFnDecl>,
    request_type: RequestType,
) -> Vec<ActCanisterMethod> {
    fn_decls.iter().fold(vec![], |acc, fn_decl| {
        let canister_method_node = fn_decl.build_canister_method_node(&request_type);
        vec![acc, vec![canister_method_node]].concat()
    })
}
