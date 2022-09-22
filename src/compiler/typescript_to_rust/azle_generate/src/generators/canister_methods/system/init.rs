use proc_macro2::TokenStream;
use quote::quote;
use swc_ecma_ast::{FnDecl, Program};

use crate::{
    cdk_act::{generators::ic_object, CanisterMethodType, ToTokenStreams},
    generators::canister_methods::{functions, method_body},
    ts_ast,
};

pub fn generate_canister_method_system_init(programs: &Vec<Program>) -> TokenStream {
    let ic_object = ic_object::generate_ic_object(programs);

    let init_fn_decls =
        ts_ast::program::get_canister_method_type_fn_decls(programs, &CanisterMethodType::Init);

    if init_fn_decls.len() > 1 {
        panic!("Only one Init function can be defined");
    }

    let init_fn_decl_option = init_fn_decls.get(0);

    let init_params = generate_init_params(&init_fn_decl_option);

    let call_to_init_js_function = generate_call_to_init_js_function(&init_fn_decl_option);

    quote! {
        #[ic_cdk_macros::init]
        #[candid::candid_method(init)]
        fn _azle_init(#(#init_params),*) {
            unsafe {
                BOA_CONTEXT_OPTION = Some(boa_engine::Context::default());
                let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                let _azle_stable_storage = boa_engine::object::ObjectInitializer::new(&mut _azle_boa_context).build();

                #ic_object

                _azle_boa_context.register_global_property(
                    "ic",
                    ic,
                    boa_engine::property::Attribute::all()
                );

                _azle_boa_context.eval(format!(
                    "let exports = {{}}; {compiled_js}",
                    compiled_js = MAIN_JS
                )).unwrap();

                #call_to_init_js_function
            }
        }
    }
}

fn generate_init_params(init_fn_decl_option: &Option<&FnDecl>) -> Vec<TokenStream> {
    if let Some(init_fn_decl) = init_fn_decl_option {
        // TODO that params data structures can have the name, the type, and both strings and idents as necessary
        functions::build_params(&init_fn_decl).to_token_streams()
    } else {
        vec![]
    }
}

fn generate_call_to_init_js_function(init_fn_decl_option: &Option<&FnDecl>) -> TokenStream {
    if let Some(init_fn_decl) = init_fn_decl_option {
        method_body::generate_call_to_js_function(init_fn_decl)
    } else {
        quote!()
    }
}
