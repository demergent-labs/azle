use proc_macro2::TokenStream;
use quote::quote;

pub fn generate(function_name: &String) -> TokenStream {
    quote! {
        BOA_CONTEXT_REF_CELL.with(|box_context_ref_cell| {
            let mut boa_context = box_context_ref_cell.borrow_mut();

            let exports_js_value =
                _azle_unwrap_boa_result(boa_context.eval("exports"), &mut boa_context);
            let exports_js_object = exports_js_value.as_object().unwrap();

            let guard_fn_js_value = exports_js_object.get(#function_name, &mut boa_context).unwrap();
            let guard_fn_js_object = match guard_fn_js_value.as_object() {
                Some(js_value) => js_value,
                None => ic_cdk::api::trap(&format!("ReferenceError: {} is not on the global exports object", #function_name.to_string()))
            };

            let js_guard_fn_return_value = _azle_unwrap_boa_result(
                guard_fn_js_object.call(&boa_engine::JsValue::Null, &[], &mut boa_context),
                &mut boa_context
            );

            match js_guard_fn_return_value.try_from_vm_value(&mut *boa_context) {
                Ok(return_value) => return_value,
                Err(e) => ic_cdk::api::trap(&format!("TypeError: {}",&e.0))
            }
        })
    }
}
