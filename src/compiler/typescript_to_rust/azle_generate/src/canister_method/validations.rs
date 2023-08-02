use crate::{
    canister_method::{errors::MismatchedPostDeployParams, AnnotatedFnDecl},
    ts_ast::SourceMapped,
};
use swc_ecma_ast::Param;

pub fn ensure_init_and_post_upgrade_params_match(
    annotated_fn_decls: &Vec<SourceMapped<AnnotatedFnDecl>>,
) -> Result<(), MismatchedPostDeployParams> {
    let init_params = get_init_params(&annotated_fn_decls);
    let post_upgrade_params = get_post_upgrade_params(&annotated_fn_decls);

    if are_param_vecs_equivalent(&init_params, &post_upgrade_params) {
        return Ok(());
    } else {
        Err(create_err(&annotated_fn_decls))
    }
}

fn get_init_params(_annotated_fn_decls: &Vec<SourceMapped<AnnotatedFnDecl>>) -> Vec<Param> {
    vec![]
}

fn get_post_upgrade_params(_annotated_fn_decls: &Vec<SourceMapped<AnnotatedFnDecl>>) -> Vec<Param> {
    vec![]
}

fn create_err(
    annotated_fn_decls: &Vec<SourceMapped<AnnotatedFnDecl>>,
) -> MismatchedPostDeployParams {
    MismatchedPostDeployParams::from_annotated_fn_decls(
        &annotated_fn_decls[0],
        &annotated_fn_decls[1],
    )
}

fn are_param_vecs_equivalent(_a: &Vec<Param>, _b: &Vec<Param>) -> bool {
    return false;

    // if a.len() != b.len() {
    //     return false;
    // }

    // a.iter()
    //     .zip(b.iter())
    //     .all(|(a_param, b_param)| are_params_equivalent(a_param, b_param))
}

// fn are_params_equivalent(a: &Param, b: &Param) -> bool {
//     false
// }
