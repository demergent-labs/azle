pub mod generate_inline_name;
pub mod get_name;
pub mod get_source_info;
pub mod to_display_string;

use super::AzleTypeAliasDecl;
pub use generate_inline_name::GenerateInlineName;
pub use get_name::GetName;
pub use get_source_info::GetSourceInfo;
use std::collections::{HashMap, HashSet};
use swc_common::Span;
use swc_ecma_ast::{TsPropertySignature, TsType};
pub use to_display_string::GetSourceText;

pub trait GetDependencies {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String>;
}

pub trait GetTsType {
    fn get_ts_type(&self) -> TsType;
}

pub trait GetSpan {
    fn get_span(&self) -> Span;
}

impl GetTsType for TsPropertySignature {
    fn get_ts_type(&self) -> TsType {
        self.type_ann.as_ref().unwrap().get_ts_type()
    }
}
