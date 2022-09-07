use crate::{utils::fn_decls::{
    CanisterMethodType,
    get_canister_method_type_fn_decls, get_fn_decl_function_name
}, generators::canister_methods::method_body::generate_call_to_js_function};
use quote::{
    quote,
    format_ident
};
use swc_ecma_ast::Program;

pub fn generate_canister_method_system_heartbeat(programs: &Vec<Program>) -> proc_macro2::TokenStream {
    let heartbeat_fn_decls = get_canister_method_type_fn_decls(programs, &CanisterMethodType::Heartbeat);

    if heartbeat_fn_decls.len() > 1 {
        panic!("Only one heartbeat function can be defined");
    }

    let heartbeat_fn_decl_option = heartbeat_fn_decls.get(0);

    if let Some(heartbeat_fn_decl) = heartbeat_fn_decl_option {
        let function_name = get_fn_decl_function_name(heartbeat_fn_decl);
        let rust_function_name_ident = format_ident!("_azle_heartbeat_{}", function_name);

        let call_to_heartbeat_js_function = generate_call_to_js_function(heartbeat_fn_decl);

        quote! {
            #[ic_cdk_macros::heartbeat]
            fn #rust_function_name_ident() {
                unsafe {
                    ic_cdk::spawn(async {
                        let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                        #call_to_heartbeat_js_function

                        // TODO add in generator handler
                    });
                }
            }
        }
    }
    else {
        quote!()
    }
}
