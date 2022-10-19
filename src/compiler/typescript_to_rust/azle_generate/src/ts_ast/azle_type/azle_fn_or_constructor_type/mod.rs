use swc_common::SourceMap;
use swc_ecma_ast::TsFnOrConstructorType;

pub mod azle_fn_type;
mod errors;
pub mod get_source_info;

use crate::{
    cdk_act::ToActDataType,
    ts_ast::{GetDependencies, GetSourceText},
};
pub use azle_fn_type::AzleFnType;

#[derive(Clone)]
pub enum AzleFnOrConstructorType<'a> {
    AzleFnType(AzleFnType<'a>),
}

impl AzleFnOrConstructorType<'_> {
    pub fn from_ts_fn_or_constructor_type(
        ts_fn_or_constructor_type: TsFnOrConstructorType,
        source_map: &SourceMap,
    ) -> AzleFnOrConstructorType {
        match ts_fn_or_constructor_type {
            TsFnOrConstructorType::TsFnType(ts_fn_type) => {
                AzleFnOrConstructorType::AzleFnType(AzleFnType {
                    ts_fn_type,
                    source_map,
                })
            }
            TsFnOrConstructorType::TsConstructorType(_) => {
                panic!(
                    "{}",
                    errors::constructor_not_supported_error(ts_fn_or_constructor_type, source_map)
                )
            }
        }
    }
}

impl GetDependencies for AzleFnOrConstructorType<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &std::collections::HashMap<String, crate::ts_ast::AzleTypeAliasDecl>,
        found_type_names: &std::collections::HashSet<String>,
    ) -> std::collections::HashSet<String> {
        match self {
            AzleFnOrConstructorType::AzleFnType(azle_fn_type) => {
                azle_fn_type.get_dependent_types(type_alias_lookup, found_type_names)
            }
        }
    }
}

impl GetSourceText for AzleFnOrConstructorType<'_> {
    fn get_source_text(&self) -> String {
        match self {
            AzleFnOrConstructorType::AzleFnType(azle_fn_type) => azle_fn_type.get_source_text(),
        }
    }
}

impl ToActDataType for AzleFnOrConstructorType<'_> {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> crate::cdk_act::ActDataType {
        match self {
            AzleFnOrConstructorType::AzleFnType(azle_fn_type) => {
                azle_fn_type.to_act_data_type(alias_name)
            }
        }
    }
}
