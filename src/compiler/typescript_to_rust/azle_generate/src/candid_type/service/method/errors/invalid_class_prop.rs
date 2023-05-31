use swc_ecma_ast::{ClassDecl, ClassProp};

use crate::{
    errors::{CompilerOutput, Location},
    traits::{GetName, GetSourceFileInfo},
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InvalidClassProp {
    class_name: String,
    location: Location,
}

impl InvalidClassProp {
    pub fn from_class_decl(class_decl: &SourceMapped<ClassDecl>, class_prop: &ClassProp) -> Self {
        let class_name = class_decl.ident.get_name().to_string();
        Self {
            location: class_decl.build_location_from_class_prop(class_prop),
            class_name,
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
        let compiler_output = CompilerOutput {
            title: format!("Error in class {}", self.class_name),
            annotation: "".to_string(),
            suggestion: None,
            location: self.location.clone(),
        };
        write!(f, "{}", compiler_output)
    }
}

impl SourceMapped<'_, ClassDecl> {
    fn build_location_from_class_prop(&self, class_prop: &ClassProp) -> Location {
        Location {
            origin: self.source_map.get_origin(class_prop.span),
            line_number: self.source_map.get_line_number(class_prop.span),
            range: self.source_map.get_range(class_prop.span),
            source: self.source_map.get_source(class_prop.span),
        }
    }
}
