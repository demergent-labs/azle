use crate::{
    generators::canister_methods::method_body::generate_call_to_js_function,
    utils::fn_decls::{get_canister_method_type_fn_decls, CanisterMethodType},
};
use quote::quote;
use swc_ecma_ast::{FnDecl, Program};

pub fn generate_canister_method_system_pre_upgrade(
    programs: &Vec<Program>,
) -> proc_macro2::TokenStream {
    let pre_upgrade_fn_decls =
        get_canister_method_type_fn_decls(programs, &CanisterMethodType::PreUpgrade);

    if pre_upgrade_fn_decls.len() > 1 {
        panic!("Only one PreUpgrade function can be defined");
    }

    let pre_upgrade_fn_decl_option = pre_upgrade_fn_decls.get(0);

    let call_to_pre_upgrade_js_function =
        generate_call_to_pre_upgrade_js_function(&pre_upgrade_fn_decl_option);

    quote! {
        #[ic_cdk_macros::pre_upgrade]
        fn _azle_pre_upgrade() {
            unsafe {
                let mut _azle_boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                #call_to_pre_upgrade_js_function

                let _azle_stable_storage_boa_return_value = _azle_boa_context.eval("exports.stable_storage_serialize(globalThis.ic._azle_stable_storage)").unwrap();
                let _azle_stable_storage_json_string: String = _azle_stable_storage_boa_return_value.azle_try_from_js_value(&mut _azle_boa_context).unwrap();
                let _azle_stable_storage = (_azle_stable_storage_json_string,);

                ic_cdk::storage::stable_save(_azle_stable_storage);
            }
        }
    }
}

fn generate_call_to_pre_upgrade_js_function(
    pre_upgrade_fn_decl_option: &Option<&FnDecl>,
) -> proc_macro2::TokenStream {
    if let Some(pre_upgrade_fn_decl) = pre_upgrade_fn_decl_option {
        generate_call_to_js_function(pre_upgrade_fn_decl)
    } else {
        quote!()
    }
}
