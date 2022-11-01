use swc_ecma_ast::{TsFnParam, TsTypeAnn};

use crate::ts_ast::azle_functions_and_methods::FunctionAndMethodTypeHelperMethods;

use super::AzleMethodSignature;

impl FunctionAndMethodTypeHelperMethods for AzleMethodSignature<'_> {
    fn get_ts_fn_params(&self) -> Vec<TsFnParam> {
        self.ts_method_signature.params.clone()
    }

    fn get_ts_type_ann(&self) -> TsTypeAnn {
        match &self.ts_method_signature.type_ann {
            Some(type_ann) => type_ann.clone(),
            None => panic!("{}", self.no_type_annotation_error()),
        }
    }

    fn get_valid_return_types(&self) -> Vec<&str> {
        vec!["Oneway", "Update", "Query", "CanisterResult"]
    }
}
