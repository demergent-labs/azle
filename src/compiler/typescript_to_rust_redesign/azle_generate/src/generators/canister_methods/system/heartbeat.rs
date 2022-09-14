use crate::{
    azle_act::CanisterMethodType,
    generators::canister_methods::method_body::generate_call_to_js_function, ts_ast,
};
use quote::{format_ident, quote};
use swc_ecma_ast::Program;

pub fn generate_canister_method_system_heartbeat(
    programs: &Vec<Program>,
) -> proc_macro2::TokenStream {
    let heartbeat_fn_decls = ts_ast::program::get_canister_method_type_fn_decls(
        programs,
        &CanisterMethodType::Heartbeat,
    );

    if heartbeat_fn_decls.len() > 1 {
        panic!("Only one Heartbeat function can be defined");
    }

    let heartbeat_fn_decl_option = heartbeat_fn_decls.get(0);

    if let Some(heartbeat_fn_decl) = heartbeat_fn_decl_option {
        let function_name = ts_ast::fn_decl::get_fn_decl_function_name(heartbeat_fn_decl);
        let rust_function_name_ident = format_ident!("_azle_heartbeat_{}", function_name);

        let call_to_heartbeat_js_function = generate_call_to_js_function(heartbeat_fn_decl);

        quote! {
            #[ic_cdk_macros::heartbeat]
            fn #rust_function_name_ident() {
                unsafe {
                    ic_cdk::spawn(async {
                        let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                        #call_to_heartbeat_js_function

                        _azle_async_result_handler(
                            &mut _azle_boa_context,
                            &_azle_boa_return_value
                        ).await;
                    });
                }
            }
        }
    } else {
        quote!()
    }
}
