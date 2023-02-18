use swc_ecma_ast::{TsFnParam, TsType, TsTypeAnn};

use super::GetTsType;

pub trait FunctionAndMethodTypeHelperMethods {
    fn get_ts_type_ann(&self) -> TsTypeAnn;
    fn get_ts_fn_params(&self) -> Vec<TsFnParam>;
    fn get_valid_return_types(&self) -> Vec<&str>;
    fn get_return_type(&self) -> Option<TsType>;

    fn get_param_types(&self) -> Vec<TsType> {
        self.get_ts_fn_params().iter().fold(vec![], |acc, param| {
            vec![acc, vec![param.get_ts_type().clone()]].concat()
        })
    }
}
