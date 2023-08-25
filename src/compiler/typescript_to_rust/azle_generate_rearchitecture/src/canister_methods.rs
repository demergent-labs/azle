use proc_macro2::{Ident, TokenStream};
use quote::quote;
use swc_ecma_ast::{Class, ClassMember, ClassMethod, Decorator, Module};

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

    Ok(canister_class
        .body
        .iter()
        .fold(vec![], try_to_wrapper_functions)
        .into_iter()
        .collect::<Result<Vec<Option<TokenStream>>, String>>()?
        .into_iter()
        .flatten()
        .collect::<Vec<TokenStream>>())
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

fn try_to_wrapper_functions(
    mut acc: Vec<Result<Option<TokenStream>, String>>,
    class_member: &ClassMember,
) -> Vec<Result<Option<TokenStream>, String>> {
    acc.push(try_to_wrapper_function(class_member));
    acc
}

fn try_to_wrapper_function(class_member: &ClassMember) -> Result<Option<TokenStream>, String> {
    let class_method = match class_member.as_method() {
        Some(class_method) => class_method,
        None => return Ok(None),
    };

    let method_type = match get_method_type(class_method)? {
        Some(method_type) => method_type,
        None => return Ok(None),
    };

    let js_function_name = get_name(class_method)?;
    let rust_function_name = js_function_name.to_ident();

    Ok(Some(quote! {
        #[ic_cdk_macros::#method_type(manual_reply = true)]
        fn #rust_function_name() {
            execute_js(#js_function_name);
        }
    }))
}

fn get_method_type(class_method: &ClassMethod) -> Result<Option<Ident>, String> {
    let azle_decorators = class_method
        .function
        .decorators
        .iter()
        .map(decorator_to_azle_type)
        .collect::<Vec<_>>();

    if azle_decorators.len() == 0 {
        return Ok(None);
    }

    if azle_decorators.len() > 1 {
        return Err("Canister methods must only contain a single Azle decorator.".to_string());
    }

    Ok(azle_decorators[0].clone())
}

fn decorator_to_azle_type(decorator: &Decorator) -> Option<Ident> {
    let decorator_name = match &*decorator.expr {
        swc_ecma_ast::Expr::Call(call_expr) => match &call_expr.callee {
            swc_ecma_ast::Callee::Expr(expr) => match &**expr {
                swc_ecma_ast::Expr::Ident(ident) => ident.value(),
                _ => return None,
            },
            _ => return None,
        },
        _ => return None,
    };

    return if decorator_name == "query" || decorator_name == "update" {
        Some(decorator_name.to_ident())
    } else {
        None
    };
}

fn get_name(class_method: &ClassMethod) -> Result<String, String> {
    let method_name = match &class_method.key {
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

    Ok(method_name)
}
