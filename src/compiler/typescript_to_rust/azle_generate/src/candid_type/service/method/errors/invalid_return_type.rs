use swc_ecma_ast::ClassProp;

use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InvalidReturnType {
    location: Location,
}

impl InvalidReturnType {
    pub fn from_class_prop(sm_class_prop: &SourceMapped<ClassProp>) -> Self {
        Self {
            location: sm_class_prop.get_location(),
        }
    }
}

impl std::error::Error for InvalidReturnType {}

impl From<InvalidReturnType> for crate::Error {
    fn from(error: InvalidReturnType) -> Self {
        Self::InvalidReturnType(error)
    }
}

impl std::fmt::Display for InvalidReturnType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let compiler_output = CompilerOutput {
            title: "Method has an invalid return type. Only function return types are permitted."
                .to_string(),
            annotation: "".to_string(),
            suggestion: None,
            location: self.location.clone(),
        };
        write!(f, "{}", compiler_output)
    }
}
