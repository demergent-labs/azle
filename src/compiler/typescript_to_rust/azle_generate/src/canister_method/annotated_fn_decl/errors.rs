use swc_common::{SourceMap, Span};
use swc_ecma_ast::{AssignPat, BindingIdent, Param, Pat};

use super::AnnotatedFnDecl;
use crate::{
    errors::{ErrorMessage, Suggestion},
    traits::GetSourceFileInfo,
    ts_ast::source_map::Range,
};

impl AnnotatedFnDecl<'_> {
    pub(super) fn build_array_destructure_error_msg(&self, param: &Param) -> ErrorMessage {
        let array_pat = param.pat.as_array().expect("Oops! Looks like we introduced a bug while refactoring. Please open a ticket at https://github.com/demergent-labs/azle/issues/new");

        let range = param.get_destructure_range(self.source_map);
        let replacement_name = "myParam".to_string(); // TODO: Come up with a better name from the ts_type_ann

        ErrorMessage {
            title: "Array destructuring in parameters is unsupported at this time".to_string(),
            origin: self.source_map.get_origin(array_pat.span),
            line_number: self.source_map.get_line_number(array_pat.span),
            source: self.source_map.get_source(array_pat.span),
            range,
            annotation: "Attempted to destructure here".to_string(),
            suggestion: Some(Suggestion {
                title: "Remove destructuring in favor of a concrete name".to_string(),
                source: self.source_map.generate_source_with_range_replaced(
                    array_pat.span,
                    range,
                    &replacement_name,
                ),
                range: (range.0, range.0 + replacement_name.len()),
                annotation: None,
                import_suggestion: None,
            }),
        }
    }

    pub(super) fn build_invalid_param_error_msg(&self) -> String {
        "Something is impossibly wrong with your parameters. Please open an issue showing your canister methods and this error.".to_string()
    }

    pub(super) fn build_missing_return_annotation_error_msg(&self) -> String {
        "Canister methods must specify a return type".to_string()
    }

    pub(super) fn build_missing_return_type_error_msg(
        &self,
        span: Span,
        canister_method_type: &str,
    ) -> ErrorMessage {
        let range = self.source_map.get_range(span);
        let example_type_param = "<null>".to_string();
        let example_return_type = format!("{}{}", canister_method_type, example_type_param);

        ErrorMessage {
            title: "Missing return type".to_string(),
            origin: self.source_map.get_origin(span),
            line_number: self.source_map.get_line_number(span),
            source: format!("{} ", self.source_map.get_source(span)),
            range: (range.1, range.1 + 1),
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

    pub(super) fn build_object_destructure_error_msg(&self, param: &Param) -> ErrorMessage {
        let object_pat = param.pat.as_object().expect("Oops! Looks like we introduced a bug while refactoring. Please open a ticket at https://github.com/demergent-labs/azle/issues/new");

        let range = param.get_destructure_range(self.source_map);
        let replacement_name = "myParam".to_string(); // TODO: Come up with a better name from the ts_type_ann

        ErrorMessage {
            title: "Object destructuring in parameters is unsupported at this time".to_string(),
            origin: self.source_map.get_origin(object_pat.span),
            line_number: self.source_map.get_line_number(object_pat.span),
            source: self.source_map.get_source(object_pat.span),
            range,
            annotation: "Attempted to destructure here".to_string(),
            suggestion: Some(Suggestion {
                title: "Remove destructuring in favor of a concrete name".to_string(),
                source: self.source_map.generate_source_with_range_replaced(
                    object_pat.span,
                    range,
                    &replacement_name,
                ),
                range: (range.0, range.0 + replacement_name.len()),
                annotation: None,
                import_suggestion: None,
            }),
        }
    }

    pub(super) fn build_param_default_value_error_msg(
        &self,
        assign_pat: &AssignPat,
    ) -> ErrorMessage {
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

                ErrorMessage {
                    title,
                    origin,
                    line_number,
                    source,
                    range: equals_sign_and_right_hand_range,
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
            None => ErrorMessage {
                title,
                origin,
                line_number,
                source: source.clone(),
                range: (range.0, source.len()),
                annotation: "Attempted to assign a default value to this parameter".to_string(),
                suggestion: None,
            },
        }
    }

    pub(super) fn build_qualified_type_error_msg(&self, span: Span) -> ErrorMessage {
        ErrorMessage {
            title: "Namespace-qualified types are not currently supported".to_string(),
            origin: self.source_map.get_origin(span),
            line_number: self.source_map.get_line_number(span),
            source: self.source_map.get_source(span),
            range: self.source_map.get_range(span),
            annotation: "Namespace specified here".to_string(),
            suggestion: None, // This is caught first by src/compiler/typescript_to_rust/azle_generate/src/ts_ast/azle_type/azle_type_ref/errors.rs
        }
    }

    pub(super) fn build_rest_param_error_msg(&self, param: &Param) -> ErrorMessage {
        let rest_pat = param.pat.as_rest().expect("Oops! Looks like we introduced a bug while refactoring. Please open a ticket at https://github.com/demergent-labs/azle/issues/new");

        let range = param.get_destructure_range(self.source_map);
        let replacement_name = "myParam".to_string(); // TODO: Come up with a better name from the ts_type_ann

        ErrorMessage {
            title: "Rest parameters are not supported in canister method signatures".to_string(),
            origin: self.source_map.get_origin(rest_pat.span),
            line_number: self.source_map.get_line_number(rest_pat.span),
            source: self.source_map.get_source(rest_pat.span),
            range,
            annotation: "Attempted parameter spread here".to_string(),
            suggestion: Some(Suggestion {
                title: "Specify each parameter individually with a concrete type".to_string(),
                source: self.source_map.generate_source_with_range_replaced(
                    rest_pat.span,
                    range,
                    &replacement_name,
                ),
                range: (range.0, range.0 + replacement_name.len()),
                annotation: None,
                import_suggestion: None,
            }),
        }
    }

    pub(super) fn build_untyped_param_error_msg(
        &self,
        binding_ident: &BindingIdent,
    ) -> ErrorMessage {
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

        ErrorMessage {
            title: "Untyped parameter".to_string(),
            origin: self.source_map.get_origin(binding_ident.span),
            line_number: self.source_map.get_line_number(binding_ident.span),
            source,
            range: (range.1, range.1 + 1),
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
