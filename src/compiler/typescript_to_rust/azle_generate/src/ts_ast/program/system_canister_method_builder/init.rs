use crate::{
    cdk_act::{
        generators::ic_object::IcObjectHelperMethods, nodes::ActInitMethod,
        traits::CanisterMethodBuilder, CanisterMethodType,
    },
    generators::canister_methods::method_body,
    ts_ast::program::{azle_program::AzleProgramVecHelperMethods, AzleProgram},
};
use swc_common::SourceMap;

pub fn build_canister_method_system_init(
    programs: &Vec<AzleProgram>,
    source_map: &SourceMap,
) -> ActInitMethod {
    let ic_object = programs.generate_ic_object();

    let init_fn_decls = programs.get_fn_decls_of_type(&CanisterMethodType::Init);

    if init_fn_decls.len() > 1 {
        panic!("Only one Init function can be defined");
    }

    let init_fn_decl_option = init_fn_decls.get(0);

    let params = if let Some(fn_decl) = init_fn_decl_option {
        fn_decl.build_params(source_map)
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

            handle_boa_result(_azle_boa_context.eval(format!(
                "let exports = {{}}; {compiled_js}",
                compiled_js = MAIN_JS
            )), &mut _azle_boa_context);

            #call_to_init_js_function
        }
    };

    ActInitMethod { params, body }
}
