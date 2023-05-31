use swc_ecma_ast::ClassProp;

use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MissingTypeAnnotation {
    location: Location,
}

impl MissingTypeAnnotation {
    pub fn from_class_prop(sm_class_prop: &SourceMapped<ClassProp>) -> Self {
        Self {
            location: sm_class_prop.get_location(),
        }
    }
}

impl std::error::Error for MissingTypeAnnotation {}

impl From<MissingTypeAnnotation> for crate::Error {
    fn from(error: MissingTypeAnnotation) -> Self {
        Self::MissingTypeAnnotation(error)
    }
}

impl std::fmt::Display for MissingTypeAnnotation {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let compiler_output = CompilerOutput {
            title: "Missing type annotation. External canister methods must specify a return type."
                .to_string(),
            annotation: "".to_string(),
            suggestion: None,
            location: self.location.clone(),
        };
        write!(f, "{}", compiler_output)
    }
}
