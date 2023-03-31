use cdk_framework::act::node::canister_method::{CanisterMethod, CanisterMethodType};

use crate::{canister_method::get_azle_fn_decls::GetProgramAzleFnDecls, ts_ast::AzleProgram};

pub trait BuildCanisterMethods {
    fn build_canister_method_nodes(&self, request_type: CanisterMethodType) -> Vec<CanisterMethod>;
}

impl BuildCanisterMethods for Vec<AzleProgram> {
    fn build_canister_method_nodes(
        &self,
        canister_method_type: CanisterMethodType,
    ) -> Vec<CanisterMethod> {
        let azle_fnc_decls = self.get_azle_fn_decls_of_type(canister_method_type.clone());

        azle_fnc_decls.iter().fold(vec![], |acc, fn_decl| {
            let canister_method_node = fn_decl.build_canister_method_node(&canister_method_type);
            vec![acc, vec![canister_method_node]].concat()
        })
    }
}
