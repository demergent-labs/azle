use super::AzleFnType;
use crate::{
    errors::{ErrorMessage, Suggestion},
    ts_ast::{ast_traits::GetSourceInfo, source_map::GetSourceFileInfo, GetSourceText},
};

impl AzleFnType<'_> {
    pub(super) fn not_enclosed_in_func_error(&self) -> ErrorMessage {
        let replacement_code = format!("Func<{}>", self.get_source_text());
        let modified_source = self
            .source_map
            .generate_modified_source(self.ts_fn_type.span, &replacement_code);
        let suggestion = Suggestion {
            title:
                "Any function that will end up as part of the candid needs to be enclosed in Func<>"
                    .to_string(),
            range: self
                .source_map
                .generate_modified_range(self.ts_fn_type.span, &replacement_code),
            source: modified_source,
            annotation: Some("Enclose in Func<> here.".to_string()),
            import_suggestion: None,
        };
        ErrorMessage {
            title: "Invalid Func".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: "Function must be enclosed in Func<>".to_string(),
            suggestion: Some(suggestion),
        }
    }
}
