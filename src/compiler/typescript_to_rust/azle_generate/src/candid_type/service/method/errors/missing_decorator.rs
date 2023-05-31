use swc_ecma_ast::ClassProp;

use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MissingDecorator {
    location: Location,
}

impl MissingDecorator {
    pub fn from_class_prop(sm_class_prop: &SourceMapped<ClassProp>) -> Self {
        Self {
            location: sm_class_prop.get_location(),
        }
    }
}

impl std::error::Error for MissingDecorator {}

impl From<MissingDecorator> for crate::Error {
    fn from(error: MissingDecorator) -> Self {
        Self::MissingDecorator(error)
    }
}

impl std::fmt::Display for MissingDecorator {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let compiler_output = CompilerOutput {
            title: "Missing decorator. External canister methods must be decorated with either @query or @update.".to_string(),
            annotation: "".to_string(),
            suggestion: None,
            location: self.location.clone(),
        };
        write!(f, "{}", compiler_output)
    }
}
