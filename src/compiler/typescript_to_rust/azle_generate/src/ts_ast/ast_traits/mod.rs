pub mod generate_inline_name;
use std::collections::{HashMap, HashSet};

pub use generate_inline_name::GenerateInlineName;
use swc_ecma_ast::{TsType, TsTypeAliasDecl};

pub trait GetDependencies {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> Vec<String>;
}

pub trait GetName {
    fn get_name(&self) -> &str;
}

pub trait GetTsType {
    fn get_ts_type(&self) -> TsType;
}
