use cdk_framework::{
    act::{node::CandidType, ToTypeAnnotation},
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
    let inner_type =
        &act_data_type.to_type_annotation(&ts_keywords::ts_keywords(), wrapper_struct_name.clone());
    let wrapper_struct_name_ident = wrapper_struct_name.to_ident();

    let dependent_types =
        act_data_type.flatten(&ts_keywords::ts_keywords(), wrapper_struct_name.clone());

    (
        wrapper_struct_name_ident.clone(),
        quote! {
            #[derive(CandidType, Deserialize, CdkActTryFromVmValue)]
            struct #wrapper_struct_name_ident(#inner_type);
            #(#dependent_types)*
        },
    )
}
