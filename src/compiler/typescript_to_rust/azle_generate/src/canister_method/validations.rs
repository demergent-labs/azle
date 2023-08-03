use cdk_framework::act::node::canister_method::CanisterMethodType;
use swc_ecma_ast::Param;

use crate::{
    canister_method::{errors::MismatchedPostDeployParams, AnnotatedFnDecl},
    ts_ast::SourceMapped,
};

pub fn ensure_init_and_post_upgrade_params_match(
    fn_decls: &Vec<SourceMapped<AnnotatedFnDecl>>,
) -> Result<(), MismatchedPostDeployParams> {
    let init_fn_decl_opt = fn_decls
        .iter()
        .find(|fn_decl| fn_decl.is_canister_method_type(CanisterMethodType::Init));

    let post_upgrade_fn_decl_opt = fn_decls
        .iter()
        .find(|fn_decl| fn_decl.is_canister_method_type(CanisterMethodType::PostUpgrade));

    if let (Some(init_fn_decl), Some(post_upgrade_fn_decl)) =
        (init_fn_decl_opt, post_upgrade_fn_decl_opt)
    {
        let init_params = &init_fn_decl.fn_decl.function.params;
        let post_upgrade_params = &post_upgrade_fn_decl.fn_decl.function.params;

        if !are_param_vecs_equivalent(&init_params, &post_upgrade_params) {
            return Err(MismatchedPostDeployParams::from_annotated_fn_decls(
                &init_fn_decl,
                &post_upgrade_fn_decl,
            ));
        }
    }

    Ok(())
}

fn are_param_vecs_equivalent(a: &Vec<Param>, b: &Vec<Param>) -> bool {
    if a.len() != b.len() {
        return false;
    }

    true

    // TODO: Do deep comparison of types.
    // See https://github.com/demergent-labs/azle/issues/1095#issuecomment-1663364443

    // a.iter()
    //     .zip(b.iter())
    //     .all(|(a_param, b_param)| are_params_equivalent(a_param, b_param))
}
