use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsFnParam, TsFnType, TsTypeAliasDecl, TsTypeAnn};

use super::{FunctionAndMethodTypeHelperMethods, GetDependencies};

impl FunctionAndMethodTypeHelperMethods for TsFnType {
    fn get_ts_fn_params(&self) -> Vec<TsFnParam> {
        self.params.clone()
    }

    fn get_ts_type_ann(&self) -> TsTypeAnn {
        self.type_ann.clone()
    }
}

impl GetDependencies for TsFnType {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> Vec<String> {
        let return_type = match self.get_return_type() {
            Some(return_type) => vec![return_type],
            None => vec![],
        };
        vec![self.get_param_types(), return_type]
            .concat()
            .iter()
            .fold(vec![], |acc, ts_type| {
                vec![
                    acc,
                    ts_type.get_dependent_types(type_alias_lookup, found_types),
                ]
                .concat()
            })
    }
}
