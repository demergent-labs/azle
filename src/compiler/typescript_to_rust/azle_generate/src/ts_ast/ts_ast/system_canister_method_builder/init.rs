use crate::{
    generators::canister_methods::method_body,
    ts_ast::{program::azle_program::AzleProgramVecHelperMethods, ts_ast::errors, TsAst},
};
use cdk_framework::{nodes::ActInitMethod, traits::CanisterMethodBuilder, CanisterMethodType};

pub fn build_canister_method_system_init(ts_ast: &TsAst) -> ActInitMethod {
    let ic_object = ts_ast.generate_ic_object();

    let init_fn_decls = ts_ast
        .azle_programs
        .get_azle_fn_decls_of_type(&CanisterMethodType::Init);

    if init_fn_decls.len() > 1 {
        let error_message = errors::create_duplicate_method_types_error_message(
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

    let call_to_init_js_function =
        method_body::maybe_generate_call_to_js_function(&init_fn_decl_option);

    let body = quote::quote! {
        BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
            let mut _azle_boa_context = box_context_ref_cell.borrow_mut();

            let _azle_stable_storage = boa_engine::object::ObjectInitializer::new(&mut _azle_boa_context).build();

            #ic_object

            _azle_boa_context.register_global_property(
                "ic",
                ic,
                boa_engine::property::Attribute::all()
            );

            _azle_handle_boa_result(_azle_boa_context.eval(format!(
                "let exports = {{}}; {compiled_js}",
                compiled_js = MAIN_JS
            )), &mut _azle_boa_context);

            #call_to_init_js_function
        });
    };

    ActInitMethod { params, body }
}
