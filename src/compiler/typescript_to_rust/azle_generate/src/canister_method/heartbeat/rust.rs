use crate::canister_method::{rust, AnnotatedFnDecl};

pub fn generate(heartbeat_fn_decl: &AnnotatedFnDecl) -> proc_macro2::TokenStream {
    let call_to_heartbeat_js_function = rust::generate_call_to_js_function(heartbeat_fn_decl);

    let function_name = heartbeat_fn_decl.get_function_name();

    quote::quote! {
        crate::ref_cells::BOA_CONTEXT.with(|boa_context_ref_cell| {
            let mut _azle_boa_context = boa_context_ref_cell.borrow_mut();

            let uuid = uuid::Uuid::new_v4().to_string();

            crate::ref_cells::set_uuid(&uuid);
            crate::ref_cells::set_method_name(&#function_name.to_string());
            crate::ref_cells::set_is_manual(true);

            #call_to_heartbeat_js_function

            crate::_azle_async_await_result_handler(
                &mut _azle_boa_context,
                &_azle_boa_return_value,
                &uuid,
                #function_name,
                true
            );
        });
    }
}
