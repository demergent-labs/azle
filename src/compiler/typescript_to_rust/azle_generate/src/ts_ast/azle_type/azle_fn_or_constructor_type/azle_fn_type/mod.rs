mod errors;
pub mod get_dependencies;
pub mod get_source_info;
pub mod to_act_data_type;

use swc_common::SourceMap;
use swc_ecma_ast::{TsFnParam, TsFnType, TsTypeAnn};

use crate::ts_ast::{
    source_map::GetSourceFileInfo, FunctionAndMethodTypeHelperMethods, GetSourceText,
};

#[derive(Clone)]
pub struct AzleFnType<'a> {
    pub ts_fn_type: TsFnType,
    pub source_map: &'a SourceMap,
}

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

impl GetSourceText for AzleFnType<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_text(self.ts_fn_type.span)
    }
}
