use cdk_framework::act::{node::external_canister::Method, ToTypeAnnotation};
use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote};

use crate::ts_keywords;

pub mod functions;
pub mod register_function;

pub fn generate_param_variables(method: &Method, canister_name: &String) -> Vec<TokenStream> {
    method.params
        .iter()
        .enumerate()
        .map(|(index, param)| {
            let param_name_js_value = format_ident!("{}_js_value", &param.get_prefixed_name());
            let param_name = format_ident!("{}", &param.get_prefixed_name());
            let param_type = param.to_type_annotation(&ts_keywords::ts_keywords(), method.create_qualified_name(canister_name));

            quote! {
                let #param_name_js_value = args_js_object.get(#index, _context).unwrap();
                let #param_name: #param_type = #param_name_js_value.try_from_vm_value(&mut *_context).unwrap();
            }
        })
    .collect()
}

pub fn generate_args_list(method: &Method) -> TokenStream {
    let param_names: Vec<Ident> = method
        .params
        .iter()
        .map(|param| format_ident!("{}", &param.get_prefixed_name()))
        .collect();

    let comma = if param_names.len() == 1 {
        quote! { , }
    } else {
        quote! {}
    };
    return quote! { (#(#param_names),*#comma) };
}
