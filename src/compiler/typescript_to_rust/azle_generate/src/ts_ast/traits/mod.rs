pub mod get_name;
pub mod get_source_info;
pub mod to_display_string;

pub use get_name::GetName;
pub use get_source_info::GetSourceInfo;
use swc_common::Span;
use swc_ecma_ast::TsType;
pub use to_display_string::GetSourceText;

pub trait GetTsType {
    fn get_ts_type(&self) -> TsType;
}

pub trait GetSpan {
    fn get_span(&self) -> Span;
}

pub trait TypeToString {
    fn type_to_string(&self) -> String;
}
