use super::TsAst;
use crate::{
    generators::cross_canister_call_functions::{
        CrossCanisterCallFunctionsInfo, GenerateCrossCanisterCallFunctionsInfos,
    },
    ts_ast::program::azle_program::AzleProgramVecHelperMethods,
};
use cdk_framework::{nodes::ActExternalCanister, SystemStructureType};

impl TsAst {
    pub fn generate_cross_canister_call_functions_infos(
        &self,
    ) -> Vec<CrossCanisterCallFunctionsInfo> {
        let canister_type_alias_decls = self
            .azle_programs
            .get_azle_type_alias_decls_for_system_structure_type(&SystemStructureType::Canister);

        canister_type_alias_decls.generate_cross_canister_call_functions_infos()
    }

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
