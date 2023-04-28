use cdk_framework::{act::node::candid::TypeParam, traits::ToIdent};
use swc_ecma_ast::TsTypeAliasDecl;

use crate::{traits::GetName, ts_ast::SourceMapped};
use quote::quote;

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn get_type_params(&self) -> Vec<TypeParam> {
        let type_params = if let Some(type_params) = &self.type_params {
            type_params
            .params
            .iter()
            .map(|type_param| TypeParam {
                name: type_param.name.get_name().to_string(),
                try_into_vm_value_trait_bound: quote!(
                    for<'a, 'b> CdkActTryIntoVmValue<
                        &'a mut boa_engine::Context<'b>,
                        boa_engine::JsValue,
                    >
                ),
                try_from_vm_value_trait_bound: |name_string| {
                    let name = name_string.to_ident();

                    quote!(
                        boa_engine::JsValue:
                        for<'a, 'b> CdkActTryFromVmValue<#name, &'a mut boa_engine::Context<'b>> + for<'a, 'b> CdkActTryFromVmValue<Box<#name>, &'a mut boa_engine::Context<'b>>
                    )
                },
            })
            .collect()
        } else {
            vec![]
        };

        type_params
    }
}
