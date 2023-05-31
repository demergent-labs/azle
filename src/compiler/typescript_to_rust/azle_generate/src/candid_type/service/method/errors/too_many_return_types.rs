use swc_ecma_ast::ClassProp;

use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TooManyReturnTypes {
    location: Location,
}

impl TooManyReturnTypes {
    pub fn from_class_prop(sm_class_prop: &SourceMapped<ClassProp>) -> Self {
        Self {
            location: sm_class_prop.get_location(),
        }
    }
}

impl std::error::Error for TooManyReturnTypes {}

impl From<TooManyReturnTypes> for crate::Error {
    fn from(error: TooManyReturnTypes) -> Self {
        Self::TooManyReturnTypes(error)
    }
}

impl std::fmt::Display for TooManyReturnTypes {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let compiler_output = CompilerOutput {
            title: "Too many return types. Generic type CallResult requires 1 type argument"
                .to_string(),
            annotation: "".to_string(),
            suggestion: None,
            location: self.location.clone(),
        };
        write!(f, "{}", compiler_output)
    }
}
