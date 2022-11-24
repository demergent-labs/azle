use cdk_framework::{ActDataType, ToActDataType};
use proc_macro2::Ident;
use quote::format_ident;
use swc_common::SourceMap;
use swc_ecma_ast::BindingIdent;

use crate::ts_ast::{ast_traits::get_name::GetName, azle_type::AzleType};

mod to_token_stream;

#[derive(Clone)]
pub struct AzleBindingIdent<'a> {
    pub binding_ident: BindingIdent,
    pub source_map: &'a SourceMap,
}

impl AzleBindingIdent<'_> {
    pub fn name_as_ident(&self) -> Ident {
        let param_name = self.binding_ident.id.get_name().to_string();

        format_ident!("{}", param_name)
    }

    pub fn data_type(&self) -> ActDataType {
        let param_ts_type = &*self.binding_ident.type_ann.as_ref().unwrap().type_ann; // TODO: Properly handle this unwrap. Combine with duplicate code above
        let param_azle_type = AzleType::from_ts_type(param_ts_type.clone(), self.source_map);
        param_azle_type.to_act_data_type(&None)
    }
}
