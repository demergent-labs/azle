use swc_common::SourceMap;
use swc_ecma_ast::TsFnOrConstructorType;

pub use azle_fn_type::AzleFnType;

mod azle_fn_type;
mod errors;
mod get_dependencies;
mod get_source_info;
mod get_source_text;
mod to_act_data_type;

#[derive(Clone)]
pub enum AzleFnOrConstructorType<'a> {
    AzleFnType(AzleFnType<'a>),
}

impl AzleFnOrConstructorType<'_> {
    pub(super) fn from_ts_fn_or_constructor_type(
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
