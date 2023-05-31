use swc_ecma_ast::ClassProp;

use crate::{errors::Location, traits::GetSourceInfo, ts_ast::SourceMapped};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct NamespaceQualifiedType {
    location: Location,
}

impl NamespaceQualifiedType {
    pub fn from_class_prop(sm_class_prop: &SourceMapped<ClassProp>) -> Self {
        Self {
            location: sm_class_prop.get_location(),
        }
    }
}

impl std::error::Error for NamespaceQualifiedType {}

impl From<NamespaceQualifiedType> for crate::Error {
    fn from(error: NamespaceQualifiedType) -> Self {
        Self::NamespaceQualifiedType(error)
    }
}

impl std::fmt::Display for NamespaceQualifiedType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Unsupported data type. Qualified types are not currently supported. Try importing the type directly.")
    }
}
