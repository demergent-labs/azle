use swc_ecma_ast::{TsFnParam, TsTypeAnn};

use super::AzleFnType;
use crate::ts_ast::FunctionAndMethodTypeHelperMethods;

impl FunctionAndMethodTypeHelperMethods for AzleFnType<'_> {
    fn get_ts_fn_params(&self) -> Vec<TsFnParam> {
        self.ts_fn_type.params.clone()
    }

    fn get_ts_type_ann(&self) -> TsTypeAnn {
        self.ts_fn_type.type_ann.clone()
    }

    fn get_valid_return_types(&self) -> Vec<&str> {
        vec!["Oneway", "Update", "Query"]
    }
}
