use proc_macro2::TokenStream;
use quote::quote;

use cdk_framework::{
    act::node::{canister_method::QueryOrUpdateMethod, Context},
    traits::ToTypeAnnotation,
};

use crate::ts_keywords;

pub fn generate(methods: &Vec<QueryOrUpdateMethod>) -> TokenStream {
    let match_arms = generate_match_arms(methods);
    quote! {
        fn reply(
            _this: &boa_engine::JsValue,
            aargs: &[boa_engine::JsValue],
            context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let method_name = METHOD_NAME_REF_CELL
                .with(|method_name_ref_cell| method_name_ref_cell.borrow().clone());

            match &method_name[..] {
                #(#match_arms)*
                _ => {
                    Err(format!("Missing reply handler for method '{method_name}'")
                        .to_js_error(None))
                }
            }
        }
    }
}

fn generate_match_arms(methods: &Vec<QueryOrUpdateMethod>) -> Vec<TokenStream> {
    methods
        .iter()
        .filter(|method| method.is_manual)
        .map(|method| generate_match_arm(method))
        .collect()
}

fn generate_match_arm(method: &QueryOrUpdateMethod) -> TokenStream {
    let name = &method.name;
    let return_type = method.return_type.to_type_annotation(
        &Context {
            keyword_list: ts_keywords::ts_keywords(),
            cdk_name: "azle".to_string(),
        },
        name.clone(),
        &None,
    );

    quote!(
        #name => {
            let reply_value: (#return_type) = aargs
                .get(0)
                .ok_or_else(|| "An argument for 'reply' was not provided".to_js_error(None))?
                .clone()
                .try_from_vm_value(&mut *context)?;

            ic_cdk::api::call::reply((reply_value,))
                .try_into_vm_value(context)
                .map_err(|vmc_err| vmc_err.to_js_error(None))
        }
    )
}
