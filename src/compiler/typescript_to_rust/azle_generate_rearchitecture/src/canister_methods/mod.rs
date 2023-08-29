use proc_macro2::TokenStream;
use quote::quote;
use swc_ecma_ast::{Module, ModuleItem};

use crate::traits::{
    AsCanisterMethodAnnotation, AsExportedFnDecl, IdentValue, IterWithPeek, ToIdent,
};
use accumulator::Accumulator;

mod accumulator;

pub fn generate(ts_entry_point: &Module) -> Result<Vec<TokenStream>, Vec<String>> {
    let accumulation = ts_entry_point
        .body
        .iter_with_peek()
        .fold(Accumulator::default(), collect_annotated_fn_decls);

    if !accumulation.errors.is_empty() {
        return Err(accumulation.errors);
    }

    Ok(accumulation.token_streams)
}

fn collect_annotated_fn_decls(
    accumulator: Accumulator,
    element: (&ModuleItem, Option<&ModuleItem>),
) -> Accumulator {
    let (current, next) = element;

    let error_message =
        "All $query and $update annotations must be followed by an exported function".to_string();

    if let Some(query_or_update_string) = current.as_canister_method_annotation() {
        match next {
            Some(module_item) => match module_item.as_exported_fn_decl() {
                Some(fn_decl) => {
                    let method_type = query_or_update_string.to_ident();
                    let js_function_name = fn_decl.ident.value();
                    let rust_function_name = js_function_name.to_ident();

                    let wrapper_function = quote! {
                        #[ic_cdk_macros::#method_type(manual_reply = true)]
                        fn #rust_function_name() {
                            execute_js(#js_function_name);
                        }
                    };

                    return accumulator.add_token_stream(wrapper_function);
                }
                None => return accumulator.add_error(error_message),
            },
            None => return accumulator.add_error(error_message),
        }
    }

    accumulator
}
