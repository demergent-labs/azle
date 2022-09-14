use proc_macro2::TokenStream;
use quote::quote;
use swc_ecma_ast::FnDecl;

use crate::{generators::canister_methods, ts_ast};

pub fn generate_ic_object_function_reply(fn_decls: &Vec<FnDecl>) -> TokenStream {
    let match_arms = generate_match_arms(fn_decls);
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

fn generate_match_arms(fn_decls: &Vec<FnDecl>) -> Vec<TokenStream> {
    fn_decls
        .iter()
        .filter(|fn_decl| ts_ast::fn_decl::is_manual(fn_decl))
        .map(|fn_decl| generate_match_arm(fn_decl))
        .collect()
}

fn generate_match_arm(fn_decl: &FnDecl) -> TokenStream {
    let fn_name = ts_ast::fn_decl::get_fn_decl_function_name(fn_decl);
    let return_type_ast = ts_ast::fn_decl::get_canister_method_return_type(fn_decl);
    let rust_return_type = match return_type_ast {
        Some(ts_type) => canister_methods::ts_type_to_rust_type(ts_type, &None).get_type_ident(),
        None => quote! {()},
    };
    quote!(
        #fn_name => {
            let reply_value: #rust_return_type = _aargs.get(0).unwrap().clone().azle_try_from_js_value(_context).unwrap();
            Ok(ic_cdk::api::call::reply((reply_value,)).azle_into_js_value(_context))
        }
    )
}
