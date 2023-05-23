mod invalid_param;
mod missing_return_type;
mod param_default_value;
mod qualified_type;
mod untyped_param;

use swc_common::{SourceMap, Span};
use swc_ecma_ast::{AssignPat, BindingIdent, Param, Pat};

use super::AnnotatedFnDecl;
use crate::{
    errors::{CompilerOutput, Location, Suggestion},
    traits::GetSourceFileInfo,
    ts_ast::source_map::Range,
};

pub use invalid_param::InvalidParams;
pub use missing_return_type::MissingReturnType;
pub use param_default_value::ParamDefaultValue;
pub use qualified_type::QualifiedType;
pub use untyped_param::UntypedParam;

impl AnnotatedFnDecl<'_> {
    pub(super) fn _build_invalid_param_error_msg(&self) -> String {
        "Something is impossibly wrong with your parameters. Please open an issue showing your canister methods and this error.".to_string()
    }

    pub(super) fn _build_missing_return_annotation_error_msg(&self) -> String {
        "Canister methods must specify a return type".to_string()
    }

    pub(super) fn _build_missing_return_type_error_msg(
        &self,
        span: Span,
        canister_method_type: &str,
    ) -> CompilerOutput {
        let range = self.source_map.get_range(span);
        let example_type_param = "<null>".to_string();
        let example_return_type = format!("{}{}", canister_method_type, example_type_param);

        CompilerOutput {
            title: "Missing return type".to_string(),
            location: Location {
                origin: self.source_map.get_origin(span),
                line_number: self.source_map.get_line_number(span),
                source: format!("{} ", self.source_map.get_source(span)),
                range: (range.1, range.1 + 1),
            },
            annotation: "Expected return type here".to_string(),
            suggestion: Some(Suggestion {
                title: format!(
                    "Specify a return type as a type argument to `{}`. E.g.:",
                    canister_method_type
                ),
                source: self
                    .source_map
                    .generate_modified_source(span, &example_return_type),
                range: (range.1, range.1 + example_type_param.len()),
                annotation: None,
                import_suggestion: None,
            }),
        }
    }

    pub(super) fn _build_param_default_value_error_msg(
        &self,
        assign_pat: &AssignPat,
    ) -> CompilerOutput {
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

    pub(super) fn _build_qualified_type_error_msg(&self, span: Span) -> CompilerOutput {
        CompilerOutput {
            title: "Namespace-qualified types are not currently supported".to_string(),
            location: Location {
                origin: self.source_map.get_origin(span),
                line_number: self.source_map.get_line_number(span),
                source: self.source_map.get_source(span),
                range: self.source_map.get_range(span),
            },
            annotation: "Namespace specified here".to_string(),
            suggestion: None, // This is caught first by src/compiler/typescript_to_rust/azle_generate/src/ts_ast/azle_type/azle_type_ref/errors.rs
        }
    }

    pub(super) fn _build_untyped_param_error_msg(
        &self,
        binding_ident: &BindingIdent,
    ) -> CompilerOutput {
        let range = self.source_map.get_range(binding_ident.span);
        let raw_source = self.source_map.get_source(binding_ident.span);
        let example_type_ann = ": ParamType".to_string(); // TODO: Come up with a better name from the source
        let source = if raw_source.len() <= range.1 + 1 {
            format!("{} ", raw_source)
        } else {
            raw_source
        };

        let corrected_source = self.source_map.generate_source_with_range_replaced(
            binding_ident.span,
            (range.1, range.1),
            &example_type_ann,
        );

        CompilerOutput {
            title: "Untyped parameter".to_string(),
            location: Location {
                origin: self.source_map.get_origin(binding_ident.span),
                line_number: self.source_map.get_line_number(binding_ident.span),
                source,
                range: (range.1, range.1 + 1),
            },
            annotation: "Expected type annotation here".to_string(),
            suggestion: Some(Suggestion {
                title: "Specify a type for the parameter".to_string(),
                source: corrected_source,
                range: (range.1, range.1 + example_type_ann.len()),
                annotation: None,
                import_suggestion: None,
            }),
        }
    }
}

pub trait GetParamRange {
    fn get_destructure_range(&self, source_map: &SourceMap) -> Range;
}

impl GetParamRange for Param {
    fn get_destructure_range(&self, source_map: &SourceMap) -> Range {
        match &self.pat {
            Pat::Ident(ident) => source_map.get_range(ident.span),
            Pat::Array(array_pat) => {
                let full_param_span_range = source_map.get_range(array_pat.span);
                if array_pat.type_ann.is_none() {
                    return full_param_span_range;
                }
                // UNWRAP HERE
                let ts_type_ann = array_pat.type_ann.as_ref().unwrap();
                let type_ann_range = source_map.get_range(ts_type_ann.span);
                let range_without_type_annotation = (full_param_span_range.0, type_ann_range.0);
                range_without_type_annotation
            }
            Pat::Rest(rest_pat) => {
                let full_param_span_range = source_map.get_range(rest_pat.span);
                if rest_pat.type_ann.is_none() {
                    return full_param_span_range;
                }
                // UNWRAP HERE
                let ts_type_ann = rest_pat.type_ann.as_ref().unwrap();
                let type_ann_range = source_map.get_range(ts_type_ann.span);
                let range_without_type_annotation = (full_param_span_range.0, type_ann_range.0);
                range_without_type_annotation
            }
            Pat::Object(object_pat) => {
                let full_param_span_range = source_map.get_range(object_pat.span);
                if object_pat.type_ann.is_none() {
                    return full_param_span_range;
                }
                // UNWRAP HERE
                let ts_type_ann = object_pat.type_ann.as_ref().unwrap();
                let type_ann_range = source_map.get_range(ts_type_ann.span);
                let range_without_type_annotation = (full_param_span_range.0, type_ann_range.0);
                range_without_type_annotation
            }
            Pat::Assign(assign_pat) => source_map.get_range(assign_pat.span),
            Pat::Invalid(invalid) => source_map.get_range(invalid.span),
            Pat::Expr(_) => panic!("Something's very wrong with your parameters"), // TODO: handle this better
        }
    }
}
