use super::TsAst;
use crate::ts_ast::azle_program::HelperMethods;
use cdk_framework::nodes::ActExternalCanister;

impl TsAst {
    pub fn build_external_canisters(&self) -> Vec<ActExternalCanister> {
        let external_canister_class_declarations = self
            .azle_programs
            .get_external_canister_class_declarations();

        external_canister_class_declarations
            .iter()
            .map(|external_canister_class_decl| {
                external_canister_class_decl.to_act_external_canister()
            })
            .collect()
    }
}
