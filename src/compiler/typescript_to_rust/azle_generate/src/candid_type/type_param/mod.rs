use cdk_framework::{
    act::node::candid::TypeParam,
    traits::{CollectIterResults, ToIdent},
};
use swc_ecma_ast::TsTypeAliasDecl;

use crate::{traits::GetName, ts_ast::SourceMapped, Error};
use quote::quote;

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn get_type_params(&self) -> Result<Vec<TypeParam>, Vec<Error>> {
        self.type_params
            .iter()
            .map(|type_params| {
                type_params.params.iter().map(|type_param| {
                    Ok(TypeParam {
                        name: type_param.name.get_name(),
                        try_into_vm_value_trait_bound: quote!(
                            for<'a, 'b> CdkActTryIntoVmValue<
                                &'a mut boa_engine::Context<'b>,
                                boa_engine::JsValue,
                            >
                        ),
                        try_from_vm_value_trait_bound: |name_string| {
                            let name = name_string.to_ident();

                            quote!(
                                boa_engine::JsValue: for<'a, 'b> CdkActTryFromVmValue<
                                        #name,
                                        boa_engine::JsError,
                                        &'a mut boa_engine::Context<'b>
                                    > + for<'a, 'b> CdkActTryFromVmValue<
                                        Box<#name>,
                                        boa_engine::JsError,
                                        &'a mut boa_engine::Context<'b>
                                    >
                            )
                        },
                    })
                })
            })
            .flatten()
            .collect_results()
    }
}
