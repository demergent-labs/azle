use proc_macro2::TokenStream;
use quote::quote;
use swc_ecma_ast::{FnDecl, Module, ModuleItem};

use crate::traits::{IdentValue, IterWithPeek, ToIdent};

trait AsCanisterMethodAnnotation {
    fn as_canister_method_annotation(&self) -> Option<String>;
}

impl AsCanisterMethodAnnotation for ModuleItem {
    fn as_canister_method_annotation(&self) -> Option<String> {
        todo!()

        // self.as_stmt()
        //     .and_then(|stmt| stmt.as_expr())
        //     .and_then(|expr_stmt| {
        //         expr_stmt
        //             .expr
        //             .as_call()
        //             .and_then(|call_expr| call_expr.callee.as_expr())
        //             .and_then(|box_expr| box_expr.get_name())
        //             .or(expr_stmt.expr.get_name())
        //             .and_then(|name| {
        //                 if is_canister_method_annotation(&name, self.alias_table) {
        //                     Some(Annotation::from_module_item(self))
        //                 } else {
        //                     None
        //                 }
        //             })
        //     })
    }
}

trait AsExportedFnDecl {
    fn as_exported_fn_decl(&self) -> Option<FnDecl>;
}

impl AsExportedFnDecl for ModuleItem {
    fn as_exported_fn_decl(&self) -> Option<FnDecl> {
        Some(
            self.as_module_decl()?
                .as_export_decl()?
                .decl
                .as_fn_decl()?
                .clone(),
        )
    }
}

struct Accumulator {
    pub token_streams: Vec<TokenStream>,
    pub errors: Vec<String>,
}

impl Accumulator {
    pub fn new() -> Self {
        Self {
            token_streams: Default::default(),
            errors: Default::default(),
        }
    }

    pub fn add_error(self, error: String) -> Self {
        Self {
            token_streams: self.token_streams,
            errors: vec![self.errors, vec![error]].concat(),
        }
    }

    pub fn add_token_stream(self, token_stream: TokenStream) -> Self {
        Self {
            token_streams: vec![self.token_streams, vec![token_stream]].concat(),
            errors: self.errors,
        }
    }
}

pub fn generate(ts_entry_point: &Module) -> Result<Vec<TokenStream>, Vec<String>> {
    let accumulation = ts_entry_point
        .iter_with_peek()
        .fold(Accumulator::new(), collect_annotated_fn_decls);

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
                            execute_js(js_function_name);
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
