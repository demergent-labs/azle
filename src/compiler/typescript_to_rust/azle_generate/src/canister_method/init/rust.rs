use crate::canister_method::{rust, AnnotatedFnDecl};

pub fn generate(init_fn_decl_option: Option<&AnnotatedFnDecl>) -> proc_macro2::TokenStream {
    let function_name = match init_fn_decl_option {
        Some(init_fn_decl) => init_fn_decl.get_function_name(),
        None => "DOES_NOT_EXIST".to_string(),
    };

    let call_to_init_js_function = rust::maybe_generate_call_to_js_function(&init_fn_decl_option);

    quote::quote! {
        BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
            let mut boa_context = box_context_ref_cell.borrow_mut();

            METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                let mut method_name_mut = method_name_ref_cell.borrow_mut();

                *method_name_mut = #function_name.to_string()
            });

            _azle_register_ic_object(&mut boa_context);

            _azle_unwrap_boa_result(boa_context.eval_script(boa_engine::Source::from_bytes(
                    &format!(
                        "let exports = {{}}; {compiled_js}",
                        compiled_js = MAIN_JS
                    )
                )
            ), &mut boa_context);

            #call_to_init_js_function

            ic_cdk_timers::set_timer(core::time::Duration::new(0, 0), rng_seed);
        });
    }
}
