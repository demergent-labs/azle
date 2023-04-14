use swc_common::Span;
use swc_ecma_ast::{Ident, TsType};

pub use callable::Callable;

mod callable;

pub trait GetName {
    fn get_name(&self) -> &str;
}

impl GetName for Ident {
    fn get_name(&self) -> &str {
        self.sym.chars().as_str()
    }
}

pub trait GetSourceInfo {
    fn get_source(&self) -> String;
    fn get_line_number(&self) -> usize;
    fn get_origin(&self) -> String;
    fn get_range(&self) -> (usize, usize);
}

pub trait GetSourceText {
    fn get_source_text(&self) -> String;
}

pub trait GetSpan {
    fn get_span(&self) -> Span;
}

pub trait GetTsType {
    fn get_ts_type(&self) -> TsType;
}

pub trait TypeToString {
    fn type_to_string(&self) -> String;
}
