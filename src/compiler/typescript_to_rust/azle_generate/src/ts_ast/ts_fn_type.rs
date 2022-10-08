use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsFnParam, TsFnType, TsTypeAliasDecl, TsTypeAnn};

use super::{
    FunctionAndMethodTypeHelperMethods, GenerateInlineName, GetDependencies, GetName, GetString,
    GetTsType,
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
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> HashSet<String> {
        let return_type = match self.get_return_type() {
            Some(return_type) => vec![return_type],
            None => vec![],
        };
        vec![self.get_param_types(), return_type]
            .concat()
            .iter()
            .fold(found_types.clone(), |acc, ts_type| {
                acc.union(&ts_type.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}

impl GetString for TsFnType {
    fn get_string(&self) -> String {
        let params = self.params.iter().fold(String::new(), |acc, param| {
            let param_name = param.get_name();
            let param_type = param.get_ts_type().get_string();
            format!("{}, {}: {}", acc, param_name, param_type)
        });
        let return_type = match self.get_return_type() {
            Some(return_type) => return_type.get_string(),
            None => "void".to_string(),
        };
        format!("({}) => {}", params, return_type)
    }
}
