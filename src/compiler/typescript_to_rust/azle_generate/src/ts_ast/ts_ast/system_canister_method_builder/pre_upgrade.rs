use cdk_framework::act::node::canister_method::{CanisterMethodType, PreUpgradeMethod};

use crate::{
    canister_method::errors,
    generators::canister_methods::pre_upgrade,
    ts_ast::{azle_program::HelperMethods, TsAst},
};

pub fn build_canister_method_system_pre_upgrade(ts_ast: &TsAst) -> PreUpgradeMethod {
    let pre_upgrade_fn_decls = ts_ast
        .azle_programs
        .get_azle_fn_decls_of_type(CanisterMethodType::PreUpgrade);

    if pre_upgrade_fn_decls.len() > 1 {
        let error_message = errors::build_duplicate_method_types_error_message_from_azle_fn_decl(
            pre_upgrade_fn_decls,
            CanisterMethodType::PreUpgrade,
        );

        panic!("{}", error_message);
    }

    let pre_upgrade_fn_decl_option = pre_upgrade_fn_decls.get(0);

    let body = pre_upgrade::generate_pre_upgrade_method_body(pre_upgrade_fn_decl_option);

    PreUpgradeMethod { body }
}
