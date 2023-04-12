use cdk_framework::{
    act::{
        node::{CandidType, Context},
        ToTypeAnnotation,
    },
    traits::{Declare, ToIdent},
};
use proc_macro2::{Ident, TokenStream};
use quote::quote;

use crate::ts_keywords;

pub fn generate(
    act_data_type: &CandidType,
    memory_id: u8,
    key_or_value: &str,
) -> (Ident, TokenStream) {
    let wrapper_struct_name = format!("StableBTreeMap{}{}Type", memory_id, key_or_value);
    let inner_type = &act_data_type.to_type_annotation(
        &Context {
            keyword_list: ts_keywords::ts_keywords(),
            cdk_name: "azle".to_string(),
        },
        wrapper_struct_name.clone(),
    );
    let wrapper_struct_name_ident = wrapper_struct_name.to_ident();

    let dependent_types = act_data_type.flatten(
        &Context {
            keyword_list: ts_keywords::ts_keywords(),
            cdk_name: "azle".to_string(),
        },
        wrapper_struct_name.clone(),
    );

    (
        wrapper_struct_name_ident.clone(),
        quote! {
            #[derive(candid::CandidType, candid::Deserialize, CdkActTryFromVmValue, Ord, PartialOrd, Eq, PartialEq, Clone)]
            struct #wrapper_struct_name_ident(#inner_type);
            #(#dependent_types)*
        },
    )
}
