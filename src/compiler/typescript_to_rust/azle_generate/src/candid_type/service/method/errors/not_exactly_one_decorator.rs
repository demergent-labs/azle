use swc_ecma_ast::{ClassProp, Decorator};

use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct NotExactlyOneDecorator {
    decorators: Vec<Decorator>,
    location: Location,
}

impl NotExactlyOneDecorator {
    pub fn from_decorator_list(
        decorators: &Vec<Decorator>,
        sm_class_prop: &SourceMapped<ClassProp>,
    ) -> Self {
        Self {
            decorators: decorators.clone(),
            location: sm_class_prop.get_location(),
        }
    }
}

impl std::error::Error for NotExactlyOneDecorator {}

impl From<NotExactlyOneDecorator> for crate::Error {
    fn from(error: NotExactlyOneDecorator) -> Self {
        Self::NotExactlyOneDecorator(error)
    }
}

impl std::fmt::Display for NotExactlyOneDecorator {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let compiler_output = CompilerOutput {
            title: "Too many decorators. Service methods can only specify one decorator: @serviceQuery or @serviceUpdate.".to_string(),
            annotation: "".to_string(),
            suggestion: None,
            location: self.location.clone(),
        };
        write!(f, "{}", compiler_output)
    }
}
