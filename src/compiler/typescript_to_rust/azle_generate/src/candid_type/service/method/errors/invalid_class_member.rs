use swc_ecma_ast::{ClassDecl, ClassMember};

use crate::{
    errors::{CompilerOutput, Location},
    traits::{GetName, GetSourceFileInfo, GetSpan},
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InvalidClassMember {
    location: Location,
    member_type: String,
    class_name: String,
}

impl InvalidClassMember {
    pub fn from_class_decl(
        class_decl: &SourceMapped<ClassDecl>,
        class_member: &ClassMember,
    ) -> Self {
        let class_name = class_decl.ident.get_name();

        let member_type = match class_member {
            ClassMember::Constructor(_) => "constructor",
            ClassMember::Method(_) => "method",
            ClassMember::PrivateMethod(_) => "private method",
            ClassMember::ClassProp(_) => "class prop",
            ClassMember::PrivateProp(_) => "private prop",
            ClassMember::TsIndexSignature(_) => "TS index signature",
            ClassMember::Empty(_) => "empty block",
            ClassMember::StaticBlock(_) => "static block",
        }
        .to_string();

        Self {
            location: class_decl.build_location_from_class_member(class_member),
            member_type,
            class_name,
        }
    }
}

impl std::error::Error for InvalidClassMember {}

impl From<InvalidClassMember> for crate::Error {
    fn from(error: InvalidClassMember) -> Self {
        Self::InvalidClassMember(error)
    }
}

impl std::fmt::Display for InvalidClassMember {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let compiler_output = CompilerOutput {
            title: format!(
                "Invalid {} in class {}\nHelp: Remove this member or make it a property",
                self.member_type, self.class_name,
            ),
            annotation: "".to_string(),
            suggestion: None,
            location: self.location.clone(),
        };
        write!(f, "{}", compiler_output)
    }
}

impl SourceMapped<'_, ClassDecl> {
    fn build_location_from_class_member(&self, class_member: &ClassMember) -> Location {
        let span = class_member.get_span();
        Location {
            origin: self.source_map.get_origin(span),
            line_number: self.source_map.get_line_number(span),
            range: self.source_map.get_range(span),
            source: self.source_map.get_source(span),
        }
    }
}
