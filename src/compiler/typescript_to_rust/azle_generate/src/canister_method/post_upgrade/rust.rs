use cdk_framework::traits::ToIdent;
use proc_macro2::TokenStream;
use quote::quote;

use crate::{
    canister_method::{rust, AnnotatedFnDecl},
    plugin::Plugin,
    ts_ast::SourceMapped,
    Error,
};

pub fn generate(
    post_upgrade_fn_decl_option: Option<&SourceMapped<AnnotatedFnDecl>>,
    plugins: &Vec<Plugin>,
    environment_variables: &Vec<(String, String)>,
) -> Result<TokenStream, Vec<Error>> {
    let call_to_post_upgrade_js_function =
        rust::maybe_generate_call_to_js_function(&post_upgrade_fn_decl_option)?;

    let function_name = match &post_upgrade_fn_decl_option {
        Some(post_upgrade_fn_decl) => post_upgrade_fn_decl.get_function_name(),
        None => "DOES_NOT_EXIST".to_string(),
    };

    let register_plugins = plugins.iter().map(|plugin| {
        let register_function_ident = plugin.register_function.to_ident();

        quote!(#register_function_ident(&mut boa_context);)
    });

    let register_process_object = rust::generate_register_process_object(environment_variables);

    Ok(quote! {
        unwrap_or_trap(|| {
            BOA_CONTEXT_REF_CELL.with(|boa_context_ref_cell| {
                let mut boa_context = boa_context_ref_cell.borrow_mut();

                METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                    let mut method_name_mut = method_name_ref_cell.borrow_mut();

                    *method_name_mut = #function_name.to_string()
                });

                register_ic_object(&mut boa_context);

                #register_process_object

                #(#register_plugins)*

                boa_context.eval(
                    boa_engine::Source::from_bytes(
                        &format!(
                            "let exports = {{}}; {compiled_js}",
                            compiled_js = MAIN_JS
                        )
                    )
                )?;

                #call_to_post_upgrade_js_function

                ic_cdk_timers::set_timer(core::time::Duration::new(0, 0), rng_seed);

                Ok(())
            })
        })
    })
}
