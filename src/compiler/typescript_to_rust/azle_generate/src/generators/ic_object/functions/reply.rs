use proc_macro2::TokenStream;
use quote::quote;

use cdk_framework::{nodes::ActCanisterMethod, ToTokenStream};

use crate::ts_keywords;

pub fn generate(canister_methods: &Vec<ActCanisterMethod>) -> TokenStream {
    let match_arms = generate_match_arms(canister_methods);
    quote! {
        fn _azle_ic_reply(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let method_name = METHOD_NAME_REF_CELL.with(|method_name_ref_cell| method_name_ref_cell.borrow().clone());

            match &method_name[..] {
                #(#match_arms)*
                _ => panic!("This cannot happen")
            }
        }
    }
}

fn generate_match_arms(canister_methods: &Vec<ActCanisterMethod>) -> Vec<TokenStream> {
    canister_methods
        .iter()
        .filter(|canister_method| canister_method.is_manual())
        .map(|canister_method| generate_match_arm(canister_method))
        .collect()
}

fn generate_match_arm(canister_method: &ActCanisterMethod) -> TokenStream {
    let name = &canister_method.get_name();
    let return_type = &canister_method
        .get_return_type()
        .to_token_stream(&ts_keywords::ts_keywords());
    quote!(
        #name => {
            let reply_value: #return_type = _aargs.get(0).unwrap().clone().try_from_vm_value(&mut *_context).unwrap();
            Ok(ic_cdk::api::call::reply((reply_value,)).try_into_vm_value(_context).unwrap())
        }
    )
}
