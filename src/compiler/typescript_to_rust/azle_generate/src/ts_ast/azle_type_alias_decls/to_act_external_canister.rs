use swc_common::SourceMap;
use swc_ecma_ast::{TsType, TsTypeElement, TsTypeLit};

use crate::{
    cdk_act::nodes::{ActExternalCanister, ActExternalCanisterMethod},
    ts_ast::{azle_method_signature::AzleMethodSignature, AzleTypeAliasDecl, GetName},
};

impl AzleTypeAliasDecl<'_> {
    pub fn to_act_external_canister(&self) -> ActExternalCanister {
        match &*self.ts_type_alias_decl.type_ann {
            TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_params {
                Some(type_params) => {
                    let name = self.get_name().to_string();

                    if type_params.params.len() > 1 {
                        panic!("Canister types must only contain one type parameter")
                    }

                    match &*type_params.params[0] {
                        TsType::TsTypeLit(ts_type_lit) => {
                            let methods =
                                build_external_canister_methods(ts_type_lit, self.source_map);

                            ActExternalCanister { name, methods }
                        }
                        _ => panic!("The Canister type param must be a type literal"),
                    }
                }
                None => panic!("A Canister type must have one type param"),
            },
            _ => panic!("A Canister type must be a TsTypeRef"),
        }
    }
}

fn build_external_canister_methods(
    ts_type_lit: &TsTypeLit,
    source_map: &SourceMap,
) -> Vec<ActExternalCanisterMethod> {
    ts_type_lit
        .members
        .iter()
        .map(|member| match member {
            TsTypeElement::TsMethodSignature(ts_method_signature) => {
                let azle_method_signature = AzleMethodSignature {
                    ts_method_signature: ts_method_signature.clone(),
                    source_map,
                };
                azle_method_signature.to_act_external_canister_method()
            }
            _ => panic!("Canister methods must be method signatures"),
        })
        .collect()
}
