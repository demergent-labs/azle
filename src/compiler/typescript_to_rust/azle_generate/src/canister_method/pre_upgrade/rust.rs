use crate::{
    canister_method::{rust, AnnotatedFnDecl},
    ts_ast::SourceMapped,
    Error,
};

pub fn generate(
    pre_upgrade_fn_decl: &SourceMapped<AnnotatedFnDecl>,
) -> Result<proc_macro2::TokenStream, Vec<Error>> {
    let call_to_pre_upgrade_js_function = rust::generate_call_to_js_function(&pre_upgrade_fn_decl)?;

    let function_name = pre_upgrade_fn_decl.get_function_name();

    Ok(quote::quote! {
        unwrap_or_trap(|| {
            BOA_CONTEXT_REF_CELL.with(|boa_context_ref_cell| {
                let mut boa_context = boa_context_ref_cell.borrow_mut();

                METHOD_NAME_REF_CELL.with(|method_name_ref_cell| {
                    let mut method_name_mut = method_name_ref_cell.borrow_mut();

                    *method_name_mut = #function_name.to_string();
                });

                #call_to_pre_upgrade_js_function

                Ok(())
            })
        })
    })
}
