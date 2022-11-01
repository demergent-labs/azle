use crate::{errors::ErrorMessage, ts_ast::ast_traits::GetSourceInfo};

use super::AzleMethodSignature;

impl AzleMethodSignature<'_> {
    pub(super) fn no_type_annotation_error(&self) -> ErrorMessage {
        ErrorMessage {
            title: "Type Annotation Needed".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: "type annotation needed for this member".to_string(),
            suggestion: None,
        }
    }
}
