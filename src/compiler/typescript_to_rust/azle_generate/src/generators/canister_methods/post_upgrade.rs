use proc_macro2::TokenStream;

use crate::{generators::canister_methods, ts_ast::AzleFnDecl};

pub fn generate_post_upgrade_method_body(
    post_upgrade_fn_decl_option: Option<&AzleFnDecl>,
) -> TokenStream {
    let call_to_post_upgrade_js_function =
        canister_methods::maybe_generate_call_to_js_function(&post_upgrade_fn_decl_option);

    let function_name = match post_upgrade_fn_decl_option {
        Some(post_upgrade_fn_decl) => post_upgrade_fn_decl.get_function_name(),
        None => "DOES_NOT_EXIST".to_string(),
    };

    quote::quote! {
        BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
            let mut _azle_boa_context = box_context_ref_cell.borrow_mut();

            METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                let mut method_name_mut = method_name_ref_cell.borrow_mut();

                *method_name_mut = #function_name.to_string()
            });

            _azle_register_ic_object(&mut _azle_boa_context);

            _azle_unwrap_boa_result(_azle_boa_context.eval(format!(
                "let exports = {{}}; {compiled_js}",
                compiled_js = MAIN_JS
            )), &mut _azle_boa_context);

            #call_to_post_upgrade_js_function

            ic_cdk::timer::set_timer(core::time::Duration::new(0, 0), _azle_rng_seed);
        });
    }
}
