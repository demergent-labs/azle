use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsFnParam, TsFnType, TsTypeAnn};

use super::{
    AzleTypeAliasDecl, FunctionAndMethodTypeHelperMethods, GenerateInlineName, GetDependencies,
};

impl FunctionAndMethodTypeHelperMethods for TsFnType {
    fn get_ts_fn_params(&self) -> Vec<TsFnParam> {
        self.params.clone()
    }

    fn get_ts_type_ann(&self) -> TsTypeAnn {
        self.type_ann.clone()
    }

    fn get_valid_return_types(&self) -> Vec<&str> {
        vec!["Oneway", "Update", "Query"]
    }
}

impl GenerateInlineName for TsFnType {
    fn generate_inline_name(&self) -> String {
        format!("AzleInlineFunc{}", self.calculate_hash())
    }
}

impl GetDependencies for TsFnType {
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
