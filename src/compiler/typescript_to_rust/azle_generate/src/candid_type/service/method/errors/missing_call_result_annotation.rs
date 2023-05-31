use swc_ecma_ast::ClassProp;

use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MissingCallResultAnnotation {
    location: Location,
}

impl MissingCallResultAnnotation {
    pub fn from_class_prop(sm_class_prop: &SourceMapped<ClassProp>) -> Self {
        Self {
            location: sm_class_prop.get_location(),
        }
    }
}

impl std::error::Error for MissingCallResultAnnotation {}

impl From<MissingCallResultAnnotation> for crate::Error {
    fn from(error: MissingCallResultAnnotation) -> Self {
        Self::MissingCallResultAnnotation(error)
    }
}

impl std::fmt::Display for MissingCallResultAnnotation {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let compiler_output = CompilerOutput {
            title: "Invalid return type. External canister methods must wrap their return types in the CallResult<T> generic type.".to_string(),
            annotation: "".to_string(),
            suggestion: None,
            location: self.location.clone(),
        };
        write!(f, "{}", compiler_output)
    }
}
