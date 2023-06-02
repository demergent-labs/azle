use swc_ecma_ast::ClassProp;

use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InvalidDecorator {
    location: Location,
}

impl InvalidDecorator {
    pub fn from_class_prop(sm_class_prop: &SourceMapped<ClassProp>) -> Self {
        Self {
            location: sm_class_prop.get_location(),
        }
    }
}

impl std::error::Error for InvalidDecorator {}

impl From<InvalidDecorator> for crate::Error {
    fn from(error: InvalidDecorator) -> Self {
        Self::InvalidDecorator(error)
    }
}

impl std::fmt::Display for InvalidDecorator {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let compiler_output = CompilerOutput {
            title: "Invalid decorator. Only @serviceQuery and @serviceUpdate are permitted."
                .to_string(),
            annotation: "".to_string(),
            suggestion: None,
            location: self.location.clone(),
        };
        write!(f, "{}", compiler_output)
    }
}
