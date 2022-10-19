use crate::{
    errors::{ErrorMessage, Suggestion},
    ts_ast::{ast_traits::GetSourceInfo, source_map::GetSourceFileInfo, GetSourceText},
};

use super::AzleFnType;

impl AzleFnType<'_> {
    pub(super) fn not_enclosed_in_func_error(&self) -> ErrorMessage {
        let well_formed = self.source_map.get_well_formed_line(self.ts_fn_type.span);
        let source = self.get_source_text();
        let suggestion_source = format!("{}Func<{}>", well_formed, source);
        let suggestion = Suggestion {
            title:
                "Any function that will end up as part of the candid needs to be enclosed in Func<>"
                    .to_string(),
            range: (well_formed.len(), suggestion_source.len()),
            source: suggestion_source,
            annotation: Some("Enclose in Func<> here.".to_string()),
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
