use swc_ecma_ast::{TsFnParam, TsMethodSignature, TsType, TsTypeAnn};
pub trait TsMethodHelperMethods {
    fn get_return_type(&self) -> TsType;
    fn get_param_ts_types(&self) -> Vec<TsType>;
}
use super::FunctionAndMethodTypeHelperMethods;

impl FunctionAndMethodTypeHelperMethods for TsMethodSignature {
    fn get_ts_fn_params(&self) -> Vec<TsFnParam> {
        self.params.clone()
    }

    fn get_ts_type_ann(&self) -> TsTypeAnn {
        match &self.type_ann {
            Some(type_ann) => type_ann.clone(),
            None => todo!("Canister Method must have a return type"),
        }
    }

    fn get_valid_return_types(&self) -> Vec<&str> {
        vec!["Oneway", "Update", "Query", "CanisterResult"]
    }
}
