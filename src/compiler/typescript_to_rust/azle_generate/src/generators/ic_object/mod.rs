use cdk_framework::{nodes::ActExternalCanisterMethod, ToTokenStream};
use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote};

use crate::ts_keywords;

pub mod functions;

pub fn generate_param_variables(method: &ActExternalCanisterMethod) -> Vec<TokenStream> {
    method.params
        .iter()
        .enumerate()
        .map(|(index, param)| {
            let param_name_js_value = format!("{}_js_value", &param.name);
            let user_defined_js_value = mark_user_defined(&param_name_js_value);
            let param_name = mark_user_defined(&param.name);
            let param_type = param.data_type.to_token_stream(&ts_keywords::ts_keywords());

            quote! {
                let #user_defined_js_value = args_js_object.get(#index, _context).unwrap();
                let #param_name: #param_type = #user_defined_js_value.try_from_vm_value(&mut *_context).unwrap();
            }
        })
    .collect()
}

pub fn generate_args_list(method: &ActExternalCanisterMethod) -> TokenStream {
    let param_names: Vec<Ident> = method
        .params
        .iter()
        .map(|param| mark_user_defined(&param.name))
        .collect();

    let comma = if param_names.len() == 1 {
        quote! { , }
    } else {
        quote! {}
    };
    return quote! { (#(#param_names),*#comma) };
}

pub fn mark_user_defined(name: &String) -> Ident {
    format_ident!("_azle_user_defined_var_{}", name)
}
