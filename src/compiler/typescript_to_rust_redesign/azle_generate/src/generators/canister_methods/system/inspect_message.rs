use crate::{
    azle_ast::CanisterMethodType,
    generators::canister_methods::method_body::generate_call_to_js_function, ts_ast,
};
use quote::{format_ident, quote};
use swc_ecma_ast::Program;

pub fn generate_canister_method_system_inspect_message(
    programs: &Vec<Program>,
) -> proc_macro2::TokenStream {
    let inspect_message_fn_decls = ts_ast::program::get_canister_method_type_fn_decls(
        programs,
        &CanisterMethodType::InspectMessage,
    );

    if inspect_message_fn_decls.len() > 1 {
        panic!("Only one InspectMessage function can be defined");
    }

    let inspect_message_fn_decl_option = inspect_message_fn_decls.get(0);

    if let Some(inspect_message_fn_decl) = inspect_message_fn_decl_option {
        let function_name = ts_ast::fn_decl::get_fn_decl_function_name(inspect_message_fn_decl);
        let rust_function_name_ident = format_ident!("_azle_inspect_message_{}", function_name);

        let call_to_inspect_message_js_function =
            generate_call_to_js_function(inspect_message_fn_decl);

        quote! {
            #[ic_cdk_macros::inspect_message]
            fn #rust_function_name_ident() {
                unsafe {
                    let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                    #call_to_inspect_message_js_function
                }
            }
        }
    } else {
        quote!()
    }
}
