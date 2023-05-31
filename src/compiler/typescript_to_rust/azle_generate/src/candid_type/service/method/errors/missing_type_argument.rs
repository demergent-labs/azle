use swc_ecma_ast::ClassProp;

use crate::{errors::Location, traits::GetSourceInfo, ts_ast::SourceMapped};

#[derive(Debug, Clone, PartialEq)]
pub struct MissingTypeArguments {
    message: String,
    location: Location,
}

impl MissingTypeArguments {
    pub fn from_class_prop(sm_class_prop: &SourceMapped<ClassProp>) -> Self {
        Self {
            message: "Missing type argument. Generic type CallResult requires 1 type argument."
                .to_string(),
            location: sm_class_prop.get_location(),
        }
    }
}

impl std::error::Error for MissingTypeArguments {}

impl From<MissingTypeArguments> for crate::Error {
    fn from(error: MissingTypeArguments) -> Self {
        Self::MissingTypeArgument(error)
    }
}

impl std::fmt::Display for MissingTypeArguments {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.message)
    }
}
