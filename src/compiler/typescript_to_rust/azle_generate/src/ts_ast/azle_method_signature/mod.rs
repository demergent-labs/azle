use swc_common::SourceMap;
use swc_ecma_ast::{Expr, TsFnParam, TsMethodSignature};

use crate::ts_ast::{azle_type::AzleType, GetName};
use cdk_framework::{
    nodes::{ActExternalCanisterMethod, ActFnParam},
    ActDataType, ToActDataType,
};

#[derive(Clone)]
pub struct AzleMethodSignature<'a> {
    pub ts_method_signature: TsMethodSignature,
    pub source_map: &'a SourceMap,
}

impl AzleMethodSignature<'_> {
    pub fn to_act_external_canister_method(&self) -> ActExternalCanisterMethod {
        let name = self.method_name();
        let return_type = self.return_type();
        let params = self.params();

        ActExternalCanisterMethod {
            name,
            params,
            return_type,
        }
    }

    fn method_name(&self) -> String {
        // TODO: Use source map to improve the error message in this panic
        match &*self.ts_method_signature.key {
            Expr::Ident(ident) => ident.get_name().to_string(),
            _ => panic!("Expected an Ident but got something else"),
        }
    }

    fn return_type(&self) -> ActDataType {
        // TODO: Swap out unwraps for panics and use source map to provide better
        // error messages

        let ts_type_ann = &*self.ts_method_signature.type_ann.as_ref().unwrap().type_ann;
        let ts_type_ref = &ts_type_ann.as_ts_type_ref().unwrap();
        let type_params = ts_type_ref.type_params.as_ref().unwrap();
        let return_ts_type = &**type_params.params.get(0).unwrap();
        let return_azle_type = AzleType::from_ts_type(return_ts_type.clone(), self.source_map);

        return_azle_type.to_act_data_type(&None)
    }

    fn params(&self) -> Vec<ActFnParam> {
        self.ts_method_signature
            .params
            .iter()
            .map(|ts_fn_param| match ts_fn_param {
                TsFnParam::Ident(binding_ident) => {
                    let name = binding_ident.id.get_name().to_string();
                    let param_ts_type = &*binding_ident.type_ann.as_ref().unwrap().type_ann.clone();
                    let param_azle_type =
                        AzleType::from_ts_type(param_ts_type.clone(), self.source_map);
                    let data_type = param_azle_type.to_act_data_type(&None);

                    ActFnParam { name, data_type }
                }
                _ => todo!(),
            })
            .collect()
    }
}
