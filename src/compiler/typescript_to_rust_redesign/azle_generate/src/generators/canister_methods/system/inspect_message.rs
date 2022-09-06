use crate::utils::fn_decls::{
    get_canister_method_type_fn_decls, get_fn_decl_function_name, CanisterMethodType,
};
use quote::{format_ident, quote};
use swc_ecma_ast::Program;

pub fn generate_canister_method_system_inspect_message(
    programs: &Vec<Program>,
) -> proc_macro2::TokenStream {
    let inspect_message_fn_decls =
        get_canister_method_type_fn_decls(programs, &CanisterMethodType::InspectMessage);

    if inspect_message_fn_decls.len() > 1 {
        panic!("Only one inspect message function can be defined");
    }

    let inspect_message_fn_decl_option = inspect_message_fn_decls.get(0);

    if let Some(inspect_message_fn_decl) = inspect_message_fn_decl_option {
        let function_name = get_fn_decl_function_name(inspect_message_fn_decl);
        let js_function_name_ident = format_ident!("{}", function_name);
        let rust_function_name_ident = format_ident!("_azle_inspect_message_{}", function_name);

        quote! {
            #[ic_cdk_macros::inspect_message]
            fn #rust_function_name_ident() {
                unsafe {
                    let mut boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                    let exports_js_value = boa_context.eval("exports").unwrap();
                    let exports_js_object = exports_js_value.as_object().unwrap();

                    let function_js_value = exports_js_object.get(stringify!(#js_function_name_ident), &mut boa_context).unwrap();
                    let function_js_object = function_js_value.as_object().unwrap();

                    let _azle_return_value = function_js_object.call(
                        &boa_engine::JsValue::Null,
                        &[],
                        &mut boa_context
                    ).unwrap();
                }
            }
        }
    } else {
        quote!()
    }
}
