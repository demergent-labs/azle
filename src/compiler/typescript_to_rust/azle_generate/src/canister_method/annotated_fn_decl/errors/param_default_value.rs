use swc_ecma_ast::AssignPat;

use crate::{
    canister_method::AnnotatedFnDecl,
    errors::{CompilerOutput, Location, Suggestion},
    traits::GetSourceFileInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct ParamDefaultValue {
    compiler_output: CompilerOutput,
}

impl ParamDefaultValue {
    pub fn from_annotated_fn_decl(
        annotated_fn_decl: &SourceMapped<AnnotatedFnDecl>,
        assign_pat: &AssignPat,
    ) -> Self {
        Self {
            compiler_output: annotated_fn_decl.build_param_default_value_error_msg(assign_pat),
        }
    }
}

impl std::error::Error for ParamDefaultValue {}

impl From<ParamDefaultValue> for crate::Error {
    fn from(error: ParamDefaultValue) -> Self {
        Self::ParamDefaultValue(error)
    }
}

impl std::fmt::Display for ParamDefaultValue {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.compiler_output)
    }
}

impl SourceMapped<'_, AnnotatedFnDecl> {
    fn build_param_default_value_error_msg(&self, assign_pat: &AssignPat) -> CompilerOutput {
        let title = "Setting default values for parameters is unsupported at this time".to_string();
        let origin = self.source_map.get_origin(assign_pat.span);
        let line_number = self.source_map.get_line_number(assign_pat.span);
        let source = self.source_map.get_source(assign_pat.span);
        let range = self.source_map.get_range(assign_pat.span);
        let equals_index_option = source.find('=');

        match equals_index_option {
            Some(equals_index) => {
                let equals_sign_and_right_hand_range = (equals_index, range.1);

                let corrected_source: String = source
                    .chars()
                    .take(equals_index)
                    .chain(source.chars().skip(range.1))
                    .collect();

                CompilerOutput {
                    title,
                    location: Location {
                        origin,
                        line_number,
                        source,
                        range: equals_sign_and_right_hand_range,
                    },
                    annotation: "Attempted to set a default value here".to_string(),
                    suggestion: Some(Suggestion {
                        title: "Remove the default value or set it inside the function body"
                            .to_string(),
                        source: corrected_source,
                        range: (range.0, equals_index),
                        annotation: None,
                        import_suggestion: None,
                    }),
                }
            }
            None => CompilerOutput {
                title,
                location: Location {
                    origin,
                    line_number,
                    source: source.clone(),
                    range: (range.0, source.len()),
                },
                annotation: "Attempted to assign a default value to this parameter".to_string(),
                suggestion: None,
            },
        }
    }
}
