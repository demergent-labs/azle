use std::collections::{HashMap, HashSet};
use swc_common::SourceMap;
use swc_ecma_ast::{TsFnParam, TsFnType, TsTypeAnn};

use crate::ts_ast::{
    source_map::GetSourceFileInfo, AzleTypeAliasDecl, FunctionAndMethodTypeHelperMethods,
    GetDependencies, GetSourceText,
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

impl GetDependencies for AzleFnType<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        let return_type = match self.get_return_type() {
            Some(return_type) => vec![return_type],
            None => vec![],
        };
        vec![self.get_param_types(), return_type]
            .concat()
            .iter()
            .fold(found_type_names.clone(), |acc, ts_type| {
                acc.union(&ts_type.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}

impl GetSourceText for AzleFnType<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_text(self.ts_fn_type.span)
    }
}
