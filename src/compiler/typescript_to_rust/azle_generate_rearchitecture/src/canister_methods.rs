use proc_macro2::TokenStream;
use quote::quote;
use swc_ecma_ast::{Class, ClassMember, ClassMethod, Module};

use crate::traits::{IdentValue, ToIdent};

/// Returns a list of canister method signatures to be interpolated into the
/// generated lib file.
///
/// # Arguments
///
/// * ts_entry_point - The file specified in the `ts` property of their canister
///                    definition in the dfx.json.
/// # Returns
///
/// Returns a list of rust code snippets representing the canister methods
/// declared in the entry point file. These are all of the following format:
///
/// ```rust
/// #[ic_cdk_macros::QUERY_OR_UPDATE(manual_reply = true)]
/// fn FUNCTION_NAME() {
///     execute_js("FUNCTION_NAME");
/// }
/// ```
/// where `QUERY_OR_UPDATE` is either `query` or `update` and `FUNCTION_NAME` is
/// the name of the canister method.
pub fn generate(ts_entry_point: &Module) -> Result<Vec<TokenStream>, String> {
    let canister_class = get_default_export_class_expr(ts_entry_point)?;

    let decorated_class_methods = canister_class
        .body
        .iter()
        .filter_map(as_class_method)
        .filter(is_decorated)
        .collect::<Vec<_>>();

    // TODO: Grab only the ones that have a single azle decorator
    // let canister_methods = decorated_class_methods.iter.filter()

    if decorated_class_methods
        .iter()
        .any(contains_multiple_azle_decorators)
    {
        return Err("Canister methods must only contain a single Azle decorator.".to_string());
    };

    let wrapper_functions = decorated_class_methods
        .iter()
        .map(to_wrapper_function)
        .collect::<Result<Vec<_>, String>>()?;

    Ok(wrapper_functions)
}

fn get_default_export_class_expr(module: &Module) -> Result<&Class, String> {
    let default_export_decls = module
        .body
        .iter()
        .filter_map(|module_item| match module_item {
            swc_ecma_ast::ModuleItem::ModuleDecl(module_decl) => match module_decl {
                swc_ecma_ast::ModuleDecl::ExportDefaultDecl(export_default_decl) => {
                    Some(export_default_decl)
                }
                _ => None,
            },
            swc_ecma_ast::ModuleItem::Stmt(_) => None,
        })
        .collect::<Vec<_>>();

    if default_export_decls.len() > 1 {
        return Err(
            "Your entrypoint contains multiple default export declarations. Remove one."
                .to_string(),
        );
    }

    if default_export_decls.len() == 0 {
        return Err("Your entrypoint does not have a default export. Add one".to_string());
    }

    let default_export = default_export_decls[0];

    let class_expr = match &default_export.decl {
        swc_ecma_ast::DefaultDecl::Class(class_expr) => class_expr,
        _ => return Err("Default export must be a class".to_string()),
    };

    let class = &*class_expr.class;

    Ok(class)
}

fn as_class_method(class_member: &ClassMember) -> Option<&ClassMethod> {
    match class_member {
        swc_ecma_ast::ClassMember::Method(class_method) => Some(class_method),
        _ => None,
    }
}

fn is_decorated(class_method: &&ClassMethod) -> bool {
    class_method.function.decorators.len() != 0
}

fn contains_multiple_azle_decorators(_class_method: &&ClassMethod) -> bool {
    // TODO: Actually check for multiple azle decorators
    false
}

fn to_wrapper_function(class_method: &&ClassMethod) -> Result<TokenStream, String> {
    let js_function_name = match &class_method.key {
        swc_ecma_ast::PropName::Ident(ident) => ident.value(),
        swc_ecma_ast::PropName::Str(str) => str.value.to_string(),
        swc_ecma_ast::PropName::Num(num) => num.value.to_string(),
        swc_ecma_ast::PropName::Computed(_) => {
            return Err(
                "Canister method names cannot be computed. Give your method a concrete name"
                    .to_string(),
            )
        }
        swc_ecma_ast::PropName::BigInt(big_int) => big_int.value.to_string(),
    };

    let rust_function_name = js_function_name.to_ident();

    Ok(quote! {
        #[ic_cdk_macros::query(manual_reply = true)]
        fn #rust_function_name() {
            execute_js(#js_function_name);
        }
    })
}
