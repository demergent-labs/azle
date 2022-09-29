use swc_ecma_ast::Program;

use crate::{
    cdk_act::{
        generators::ic_object, nodes::ActInitMethod, traits::CanisterMethodBuilder,
        CanisterMethodType,
    },
    generators::canister_methods::method_body,
    ts_ast::program::TsProgramVecHelperMethods,
};

pub fn build_canister_method_system_init(programs: &Vec<Program>) -> ActInitMethod {
    let ic_object = ic_object::generate_ic_object(programs);

    let init_fn_decls = programs.get_fn_decls_of_type(&CanisterMethodType::Init);

    if init_fn_decls.len() > 1 {
        panic!("Only one Init function can be defined");
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
    };

    ActInitMethod { params, body }
}
