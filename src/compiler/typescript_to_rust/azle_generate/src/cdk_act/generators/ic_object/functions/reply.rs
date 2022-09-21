use proc_macro2::TokenStream;
use quote::quote;

use crate::cdk_act::CanisterMethodActNode;

pub fn generate_ic_object_function_reply(
    canister_methods: &Vec<CanisterMethodActNode>,
) -> TokenStream {
    let match_arms = generate_match_arms(canister_methods);
    quote! {
        fn _azle_ic_reply(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let top_level_call_frame = _azle_get_top_level_call_frame(&_context.vm.frame.as_ref().unwrap());
            let function_name_sym = top_level_call_frame.code.name;
            let function_name = &_context.interner.resolve_expect(function_name_sym.clone());

            match &function_name[..] {
                #(#match_arms)*
                _ => panic!("This cannot happen")
            }
        }
    }
}

fn generate_match_arms(canister_methods: &Vec<CanisterMethodActNode>) -> Vec<TokenStream> {
    canister_methods
        .iter()
        .filter(|canister_method| canister_method.is_manual())
        .map(|canister_method| generate_match_arm(canister_method))
        .collect()
}

fn generate_match_arm(canister_method: &CanisterMethodActNode) -> TokenStream {
    let name = &canister_method.get_name();
    let return_type = &canister_method.get_return_type().get_type_ident();
    quote!(
        #name => {
            let reply_value: #return_type = _aargs.get(0).unwrap().clone().azle_try_from_js_value(_context).unwrap();
            Ok(ic_cdk::api::call::reply((reply_value,)).azle_into_js_value(_context))
        }
    )
}
