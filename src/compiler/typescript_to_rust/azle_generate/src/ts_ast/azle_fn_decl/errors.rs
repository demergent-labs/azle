use swc_common::Span;
use swc_ecma_ast::{AssignPat, Param};

use super::AzleFnDecl;
use crate::{
    errors::{ErrorMessage, Suggestion},
    ts_ast::{param::GetParamRange, source_map::GetSourceFileInfo},
};

impl AzleFnDecl<'_> {
    pub(super) fn build_array_destructure_error_msg(&self, param: &Param) -> ErrorMessage {
        let array_pat = param.pat.as_array().expect("Oops! Looks like we introduced a bug while refactoring. Please open a ticket at https://github.com/demergent-labs/azle/issues/new");

        let range = param.get_destructure_range(self.source_map);
        let replacement_name = "myParam"; // TODO: Come up with a better name from the ts_type_ann

        ErrorMessage {
            title: "Array destructuring in parameters is unsupported at this time".to_string(),
            origin: self.source_map.get_origin(array_pat.span),
            line_number: self.source_map.get_line_number(array_pat.span),
            source: self.source_map.get_source(array_pat.span),
            range,
            annotation: "Attempted to destructure here".to_string(),
            suggestion: Some(Suggestion {
                title: "Remove destructuring in favor of a concrete name".to_string(),
                source: format!(
                    "{}{}...",
                    self.source_map.get_well_formed_line(array_pat.span),
                    replacement_name
                ), // TODO: Use the new source_map.get_modified_source(replacement_name)
                range: (range.0, range.0 + replacement_name.len()), // TODO: Use the new source_map.get_modified_range(replacement_name)
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
                source: format!(
                    "{}{}{} {{}}",
                    self.source_map.get_well_formed_line(span),
                    canister_method_type,
                    example_type_param
                ), // TODO: Use the new source_map.get_modified_source(replacement_name)
                range: (range.1, range.1 + example_type_param.len()),
                annotation: None,
                import_suggestion: None,
            }),
        }
    }

    pub(super) fn build_non_type_ref_return_type_error_msg(&self) -> String {
        "Canister method return types must be one of: Init, InspectMessage, Oneway, PostUpgrade, PreUpgrade, Query, QueryManual, Update, UpdateManual".to_string()
    }

    pub(super) fn build_object_destructure_error_msg(&self, param: &Param) -> ErrorMessage {
        let object_pat = param.pat.as_object().expect("Oops! Looks like we introduced a bug while refactoring. Please open a ticket at https://github.com/demergent-labs/azle/issues/new");

        let range = param.get_destructure_range(self.source_map);
        let replacement_name = "myParam"; // TODO: Come up with a better name from the ts_type_ann

        ErrorMessage {
            title: "Object destructuring in parameters is unsupported at this time".to_string(),
            origin: self.source_map.get_origin(object_pat.span),
            line_number: self.source_map.get_line_number(object_pat.span),
            source: self.source_map.get_source(object_pat.span),
            range,
            annotation: "Attempted to destructure here".to_string(),
            suggestion: Some(Suggestion {
                title: "Remove destructuring in favor of a concrete name".to_string(),
                source: format!(
                    "{}{}...",
                    self.source_map.get_well_formed_line(object_pat.span),
                    replacement_name
                ), // TODO: Use the new source_map.get_modified_source(replacement_name)
                range: (range.0, range.0 + replacement_name.len()), // TODO: Use the new source_map.get_modified_range(replacement_name)
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

    pub(super) fn build_qualified_type_error_msg(&self) -> ErrorMessage {
        ErrorMessage {
            title: "Namespace-qualified types are not currently supported".to_string(),
            origin: "index.ts".to_string(), // TODO: Get this from the source map
            line_number: 1,                 // TODO: Get this from the source map
            source: "export function example(): Query<Namespace.MyType> {}".to_string(), // TODO: Get this from the source map
            range: (33, 43), // TODO: Get this from the source map
            annotation: "Namespace specified here".to_string(), // TODO
            suggestion: Some(Suggestion {
                title: "Either declare the import locally or remove the wildcard import"
                    .to_string(),
                source: "export function example(): Query<MyType> {}".to_string(), // TODO: Get this from the source map
                range: (33, 39), // TODO: Get this from the source map
                annotation: None,
                import_suggestion: None,
            }),
        }
    }

    pub(super) fn build_rest_param_error_msg(&self, param: &Param) -> ErrorMessage {
        let rest_pat = param.pat.as_rest().expect("Oops! Looks like we introduced a bug while refactoring. Please open a ticket at https://github.com/demergent-labs/azle/issues/new");

        let range = param.get_destructure_range(self.source_map);
        let replacement_name = "myParam"; // TODO: Come up with a better name from the ts_type_ann

        ErrorMessage {
            title: "Rest parameters are not supported in canister method signatures".to_string(),
            origin: self.source_map.get_origin(rest_pat.span),
            line_number: self.source_map.get_line_number(rest_pat.span),
            source: self.source_map.get_source(rest_pat.span),
            range,
            annotation: "Attempted parameter spread here".to_string(), // TODO
            suggestion: Some(Suggestion {
                title: "Specify each parameter individually with a concrete type".to_string(),
                source: format!(
                    "{}{}...",
                    self.source_map.get_well_formed_line(rest_pat.span),
                    replacement_name
                ), // TODO: Use the new source_map.get_modified_source(replacement_name)
                range: (range.0, range.0 + replacement_name.len()), // TODO: Use the new source_map.get_modified_range(replacement_name)
                annotation: None,
                import_suggestion: None,
            }),
        }
    }

    pub(super) fn build_untyped_param_error_msg(&self) -> ErrorMessage {
        ErrorMessage {
            title: "Untyped parameter".to_string(),
            origin: "index.ts".to_string(), // TODO: Get this from the source map
            line_number: 1,                 // TODO: Get this from the source map
            source: "export function example(param) {}".to_string(), // TODO: Get this from the source map
            range: (29, 30), // TODO: Get this from the source map
            annotation: "Expected type here".to_string(), // TODO
            suggestion: Some(Suggestion {
                title: "Specify a type for the parameter".to_string(),
                source: "export function example(param: MyParam) {}".to_string(), // TODO: Get this from the source map
                range: (29, 38), // TODO: Get this from the source map
                annotation: None,
                import_suggestion: None,
            }),
        }
    }
}
