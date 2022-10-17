use std::collections::{HashMap, HashSet};
use swc_common::SourceMap;
use swc_ecma_ast::{TsFnParam, TsFnType, TsTypeAnn};

use crate::{
    cdk_act::ToActDataType,
    ts_ast::{
        azle_type::AzleType, source_map::GetSourceFileInfo, AzleTypeAliasDecl,
        FunctionAndMethodTypeHelperMethods, GetDependencies, GetSourceText,
    },
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
                let azle_type = AzleType::from_ts_type(ts_type.clone(), self.source_map);
                acc.union(&azle_type.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}

impl ToActDataType for AzleFnType<'_> {
    fn to_act_data_type(&self, _: &Option<&String>) -> crate::cdk_act::ActDataType {
        todo!("This doesn't have a direct to_act_data_type implementation yet");
    }
}

impl GetSourceText for AzleFnType<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_source(self.ts_fn_type.span)
    }
}
