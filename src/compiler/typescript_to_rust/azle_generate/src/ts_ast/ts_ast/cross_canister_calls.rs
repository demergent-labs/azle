use super::TsAst;
use crate::ts_ast::program::azle_program::AzleProgramVecHelperMethods;
use cdk_framework::{nodes::ActExternalCanister, SystemStructureType};

impl TsAst {
    pub fn build_external_canisters(&self) -> Vec<ActExternalCanister> {
        let canister_type_alias_decls = self
            .azle_programs
            .get_azle_type_alias_decls_for_system_structure_type(&SystemStructureType::Canister);

        canister_type_alias_decls
            .iter()
            .map(|canister_type_alias_decl| canister_type_alias_decl.to_act_external_canister())
            .collect()
    }
}
