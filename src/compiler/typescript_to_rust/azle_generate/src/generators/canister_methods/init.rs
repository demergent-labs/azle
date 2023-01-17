use proc_macro2::TokenStream;

use crate::{generators::canister_methods::method_body, ts_ast::AzleFnDecl};

pub fn generate_init_method_body(init_fn_decl_option: Option<&AzleFnDecl>) -> TokenStream {
    let function_name = match init_fn_decl_option {
        Some(init_fn_decl) => init_fn_decl.get_function_name(),
        None => "DOES_NOT_EXIST".to_string(),
    };

    let call_to_init_js_function =
        method_body::maybe_generate_call_to_js_function(&init_fn_decl_option);

    quote::quote! {
        BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
            let mut _azle_boa_context = box_context_ref_cell.borrow_mut();

            METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                let mut method_name_mut = method_name_ref_cell.borrow_mut();

                *method_name_mut = #function_name.to_string()
            });

            _azle_register_ic_object(&mut _azle_boa_context);

            _azle_handle_boa_result(_azle_boa_context.eval(format!(
                "let exports = {{}}; {compiled_js}",
                compiled_js = MAIN_JS
            )), &mut _azle_boa_context);

            #call_to_init_js_function
        });
    }
}
