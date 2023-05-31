use swc_ecma_ast::ClassProp;

use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ComputedPropertyNotAllowed {
    location: Location,
}

impl ComputedPropertyNotAllowed {
    pub fn from_class_prop(sm_class_prop: &SourceMapped<ClassProp>) -> Self {
        Self {
            location: sm_class_prop.get_location(),
        }
    }
}

impl std::error::Error for ComputedPropertyNotAllowed {}

impl From<ComputedPropertyNotAllowed> for crate::Error {
    fn from(error: ComputedPropertyNotAllowed) -> Self {
        Self::ComputedPropertyNotAllowed(error)
    }
}

impl std::fmt::Display for ComputedPropertyNotAllowed {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let compiler_output = CompilerOutput {
            title: "Computed property not allowed. Computed properties in service definitions aren't currently supported.".to_string(),
            annotation: "".to_string(),
            suggestion: None,
            location: self.location.clone(),
        };
        write!(f, "{}", compiler_output)
    }
}
