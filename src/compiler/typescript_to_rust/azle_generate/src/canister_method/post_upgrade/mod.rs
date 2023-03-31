use cdk_framework::act::node::canister_method::{CanisterMethodType, PostUpgradeMethod};

use crate::{
    canister_method::{errors, get_azle_fn_decls::GetProgramAzleFnDecls},
    TsAst,
};

mod rust;

impl TsAst {
    pub fn build_post_upgrade_method(&self) -> PostUpgradeMethod {
        let post_upgrade_fn_decls = self
            .azle_programs
            .get_azle_fn_decls_of_type(CanisterMethodType::PostUpgrade);

        if post_upgrade_fn_decls.len() > 1 {
            let error_message =
                errors::build_duplicate_method_types_error_message_from_azle_fn_decl(
                    post_upgrade_fn_decls,
                    CanisterMethodType::PostUpgrade,
                );

            panic!("{}", error_message);
        }

        let post_upgrade_fn_decl_option = post_upgrade_fn_decls.get(0);

        if let Some(fn_decl) = post_upgrade_fn_decl_option {
            fn_decl.assert_return_type_is_void();
            fn_decl.assert_not_async();
        }

        let params = if let Some(fn_decl) = post_upgrade_fn_decl_option {
            fn_decl.build_params()
        } else {
            vec![]
        };

        let body = rust::generate(post_upgrade_fn_decl_option);
        let guard_function_name = None; // Unsupported. See https://github.com/demergent-labs/azle/issues/954

        PostUpgradeMethod {
            body,
            params,
            guard_function_name,
        }
    }
}
