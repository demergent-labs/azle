use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote};

use crate::canister_method::AnnotatedFnDecl;

pub fn maybe_generate_call_to_js_function(
    annotated_fn_decl_option: &Option<&AnnotatedFnDecl>,
) -> TokenStream {
    if let Some(annotated_fn_decl) = annotated_fn_decl_option {
        generate_call_to_js_function(annotated_fn_decl)
    } else {
        quote!()
    }
}

pub fn generate_call_to_js_function(annotated_fn_decl: &AnnotatedFnDecl) -> TokenStream {
    let function_name = annotated_fn_decl.get_function_name();
    let param_name_idents: Vec<Ident> = annotated_fn_decl
        .build_params()
        .iter()
        .map(|param| format_ident!("{}", param.get_prefixed_name()))
        .collect();

    quote! {
        let exports_js_value = unwrap_boa_result(boa_context.eval_script(boa_engine::Source::from_bytes("exports")), &mut boa_context);
        let exports_js_object = exports_js_value.as_object().unwrap();

        let function_js_value = exports_js_object.get(#function_name, &mut boa_context).unwrap();
        let function_js_object = function_js_value.as_object().unwrap();

        let boa_return_value = unwrap_boa_result(
            function_js_object.call(
                &boa_engine::JsValue::Null,
                &[
                    #(#param_name_idents.try_into_vm_value(&mut boa_context).unwrap()),*
                ],
                &mut boa_context
            ),
            &mut boa_context
        );
    }
}

pub fn generate_register_process_object(
    environment_variables: &Vec<(String, String)>,
) -> TokenStream {
    let env_properties = environment_variables.iter().map(|environment_variable| {
        let name = &environment_variable.0;
        let value = &environment_variable.1;

        quote! {
            .property(
                #name,
                #value,
                boa_engine::property::Attribute::all()
            )
        }
    });

    quote! {
        let env = boa_engine::object::ObjectInitializer::new(&mut boa_context)
            #(#env_properties)*
            .build();


        let process = boa_engine::object::ObjectInitializer::new(&mut boa_context)
            .property(
                "env",
                env,
                boa_engine::property::Attribute::all()
            )
            .build();

        boa_context.register_global_property(
            "process",
            process,
            boa_engine::property::Attribute::all(),
        );
    }
}
