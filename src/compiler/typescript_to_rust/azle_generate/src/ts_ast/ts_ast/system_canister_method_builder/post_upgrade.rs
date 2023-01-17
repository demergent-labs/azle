use cdk_framework::{
    nodes::ActPostUpgradeMethod, traits::CanisterMethodBuilder, CanisterMethodType,
};

use crate::{
    generators::canister_methods::post_upgrade,
    ts_ast::{azle_program::HelperMethods, ts_ast::errors, TsAst},
};

pub fn build_canister_method_system_post_upgrade(ts_ast: &TsAst) -> ActPostUpgradeMethod {
    let post_upgrade_fn_decls = ts_ast
        .azle_programs
        .get_azle_fn_decls_of_type(&CanisterMethodType::PostUpgrade);

    if post_upgrade_fn_decls.len() > 1 {
        let error_message = errors::create_duplicate_method_types_error_message(
            post_upgrade_fn_decls,
            CanisterMethodType::PostUpgrade,
        );

        panic!("{}", error_message);
    }

    let post_upgrade_fn_decl_option = post_upgrade_fn_decls.get(0);

    let params = if let Some(fn_decl) = post_upgrade_fn_decl_option {
        fn_decl.build_params()
    } else {
        vec![]
    };

    let body = post_upgrade::generate_post_upgrade_method_body(post_upgrade_fn_decl_option);

    ActPostUpgradeMethod { body, params }
}
