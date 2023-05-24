use swc_ecma_ast::{ClassDecl, ClassProp};

use crate::{
    traits::{GetName, GetSourceFileInfo},
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InvalidClassProp {
    message: String,
}

impl InvalidClassProp {
    pub fn from_class_decl(class_decl: &SourceMapped<ClassDecl>, class_prop: &ClassProp) -> Self {
        Self {
            message: class_decl.build_invalid_class_prop_error_message(class_prop),
        }
    }
}

impl std::error::Error for InvalidClassProp {}

impl From<InvalidClassProp> for crate::Error {
    fn from(error: InvalidClassProp) -> Self {
        Self::InvalidClassProp(error)
    }
}

impl std::fmt::Display for InvalidClassProp {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl SourceMapped<'_, ClassDecl> {
    pub fn build_invalid_class_prop_error_message(&self, class_prop: &ClassProp) -> String {
        let service_class_name = self.ident.get_name().to_string();

        let origin = self.source_map.get_origin(class_prop.span);
        let line_number = self.source_map.get_line_number(class_prop.span);
        let column_number = self.source_map.get_range(class_prop.span).0 + 1;
        let location = format!("{}:{}:{}", origin, line_number, column_number);

        format!("Error in class {}\nat {}", service_class_name, location)
    }
}
