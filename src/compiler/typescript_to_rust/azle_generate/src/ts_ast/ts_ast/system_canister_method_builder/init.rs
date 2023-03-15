use cdk_framework::act::node::canister_method::{CanisterMethodType, InitMethod};

use crate::{
    canister_method::errors,
    generators::canister_methods::init,
    ts_ast::{azle_program::HelperMethods, TsAst},
};

pub fn build_canister_method_system_init(ts_ast: &TsAst) -> InitMethod {
    let init_fn_decls = ts_ast
        .azle_programs
        .get_azle_fn_decls_of_type(CanisterMethodType::Init);

    if init_fn_decls.len() > 1 {
        let error_message = errors::build_duplicate_method_types_error_message_from_azle_fn_decl(
            init_fn_decls,
            CanisterMethodType::Init,
        );

        panic!("{}", error_message);
    }

    let init_fn_decl_option = init_fn_decls.get(0);

    let params = if let Some(fn_decl) = init_fn_decl_option {
        fn_decl.build_params()
    } else {
        vec![]
    };

    let body = init::generate_init_method_body(init_fn_decl_option);

    InitMethod { params, body }
}
