use swc_common::SourceMap;
use swc_ecma_ast::{Expr, TsFnParam, TsMethodSignature, TsType, TsTypeElement, TsTypeLit};

use crate::{
    cdk_act::{
        nodes::{ActExternalCanister, ActExternalCanisterMethod, ActFnParam},
        ActDataType, ToActDataType,
    },
    ts_ast::{azle_type::AzleType, AzleTypeAliasDecl, GetName},
};

impl AzleTypeAliasDecl<'_> {
    pub fn build_external_canister(&self) -> ActExternalCanister {
        match &*self.ts_type_alias_decl.type_ann {
            TsType::TsTypeRef(ts_type_ref) => {
                match &ts_type_ref.type_params {
                    Some(type_params) => {
                        let canister_name = self.get_name();

                        let type_param = &type_params.params[0];

                        // TODO handle if there is more than one param

                        match &**type_param {
                            TsType::TsTypeLit(ts_type_lit) => {
                                build_external_canister_from_type_literal(
                                    canister_name,
                                    ts_type_lit,
                                    self.source_map,
                                )
                            }
                            _ => panic!("The Canister type param must be a type literal"),
                        }
                    }
                    None => panic!("A Canister type must have one type param"),
                }
            }
            _ => panic!("A Canister type must be a TsTypeRef"),
        }
    }
}

fn build_external_canister_from_type_literal(
    canister_name: &str,
    canister_type_literal_node: &TsTypeLit,
    source_map: &SourceMap,
) -> ActExternalCanister {
    let name = canister_name.to_string();

    let methods: Vec<ActExternalCanisterMethod> = canister_type_literal_node
        .members
        .iter()
        .map(|member| match member {
            TsTypeElement::TsMethodSignature(ts_method_signature) => {
                build_external_canister_method(ts_method_signature, source_map)
            }
            _ => panic!("Canister methods must be method signatures"),
        })
        .collect();

    ActExternalCanister { name, methods }
}

fn build_external_canister_method(
    ts_method_signature: &TsMethodSignature,
    source_map: &SourceMap,
) -> ActExternalCanisterMethod {
    let name = get_ts_method_signature_method_name(ts_method_signature, source_map);
    let return_type = get_ts_method_signature_return_type(ts_method_signature, source_map);
    let params = get_ts_method_signature_params(ts_method_signature, source_map);

    ActExternalCanisterMethod {
        name,
        params,
        return_type,
    }
}

fn get_ts_method_signature_method_name(
    ts_method_signature: &TsMethodSignature,
    source_map: &SourceMap,
) -> String {
    // TODO: Use source map to improve the error message in this panic
    match &*ts_method_signature.key {
        Expr::Ident(ident) => ident.get_name().to_string(),
        _ => panic!("Expected an Ident but got something else"),
    }
}

fn get_ts_method_signature_return_type(
    ts_method_signature: &TsMethodSignature,
    source_map: &SourceMap,
) -> ActDataType {
    // TODO: Swap out unwraps for panics and use source map to provide better
    // error messages

    let ts_type_ann = &*ts_method_signature.type_ann.as_ref().unwrap().type_ann;
    let ts_type_ref = &ts_type_ann.as_ts_type_ref().unwrap();
    let type_params = ts_type_ref.type_params.as_ref().unwrap();
    let return_ts_type = &**type_params.params.get(0).unwrap();
    let return_azle_type = AzleType::from_ts_type(return_ts_type.clone(), source_map);

    return_azle_type.to_act_data_type(&None)
}

fn get_ts_method_signature_params(
    ts_method_signature: &TsMethodSignature,
    source_map: &SourceMap,
) -> Vec<ActFnParam> {
    ts_method_signature
        .params
        .iter()
        .map(|ts_fn_param| match ts_fn_param {
            TsFnParam::Ident(binding_ident) => {
                let name = binding_ident.id.get_name().to_string();
                let param_ts_type = &*binding_ident.type_ann.as_ref().unwrap().type_ann.clone();
                let param_azle_type = AzleType::from_ts_type(param_ts_type.clone(), source_map);
                let data_type = param_azle_type.to_act_data_type(&None);

                ActFnParam { name, data_type }
            }
            _ => todo!(),
        })
        .collect()
}
