pub mod not_enclosed_in_func;

use swc_ecma_ast::TsFnType;

use crate::{
    errors::{CompilerOutput, Location, Suggestion},
    traits::{GetSourceFileInfo, GetSourceInfo, GetSourceText},
    ts_ast::SourceMapped,
};

impl SourceMapped<'_, TsFnType> {
    pub(super) fn _not_enclosed_in_func_error(&self) -> CompilerOutput {
        let replacement_code = format!("Func<{}>", self.get_source_text());
        let modified_source = self
            .source_map
            .generate_modified_source(self.span, &replacement_code);
        let suggestion = Suggestion {
            title:
                "Any function that will end up as part of the candid needs to be enclosed in Func<>"
                    .to_string(),
            range: self
                .source_map
                .generate_modified_range(self.span, &replacement_code),
            source: modified_source,
            annotation: Some("Enclose in Func<> here.".to_string()),
            import_suggestion: None,
        };
        CompilerOutput {
            title: "Invalid Func".to_string(),
            location: Location {
                origin: self.get_origin(),
                line_number: self.get_line_number(),
                source: self.get_source(),
                range: self.get_range(),
            },
            annotation: "Function must be enclosed in Func<>".to_string(),
            suggestion: Some(suggestion),
        }
    }
}
