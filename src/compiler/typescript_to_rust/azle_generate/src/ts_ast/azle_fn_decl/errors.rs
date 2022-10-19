use swc_common::Span;
use swc_ecma_ast::{ArrayPat, TsTypeAnn};

use super::AzleFnDecl;
use crate::{
    errors::{ErrorMessage, Suggestion},
    ts_ast::source_map::GetSourceFileInfo,
};

impl AzleFnDecl<'_> {
    pub(super) fn build_array_destructure_error_msg(
        &self,
        array_pat: &ArrayPat,
        ts_type_ann: &TsTypeAnn,
    ) -> ErrorMessage {
        let type_ann_start_col = self.source_map.get_range(ts_type_ann.span);
        let full_param_span_range = self.source_map.get_range(array_pat.span);
        let range_without_type_annotation = (full_param_span_range.0, type_ann_start_col.0);
        let replacement_name = "myParam"; // TODO: Come up with a better name from the ts_type_ann

        ErrorMessage {
            title: "Array destructuring in parameters is unsupported at this time".to_string(),
            origin: self.source_map.get_origin(array_pat.span),
            line_number: self.source_map.get_line_number(array_pat.span),
            source: self.source_map.get_source(array_pat.span),
            range: range_without_type_annotation,
            annotation: "Attempted to destructure here".to_string(),
            suggestion: Some(Suggestion {
                title: "Remove destructuring in favor of a concrete name".to_string(),
                source: format!(
                    "{}{}...",
                    self.source_map.get_well_formed_line(array_pat.span),
                    replacement_name
                ), // TODO: Use the new source_map.get_modified_source(replacement_name)
                range: (
                    full_param_span_range.0,
                    full_param_span_range.0 + replacement_name.len(),
                ), // TODO: Use the new source_map.get_modified_range(replacement_name)
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

    pub(super) fn build_object_destructure_error_msg(&self) -> ErrorMessage {
        ErrorMessage {
            title: "Object destructuring in parameters is unsupported at this time".to_string(),
            origin: "index.ts".to_string(), // TODO: Get this from the source map
            line_number: 1,                 // TODO: Get this from the source map
            source: "export function example({id, name}: User) {}".to_string(), // TODO: Get this from the source map
            range: (24, 34), // TODO: Get this from the source map
            annotation: "Attempted to destructure here".to_string(), // TODO
            suggestion: Some(Suggestion {
                title: "Remove destructuring in favor of a concrete name".to_string(),
                source: "export function example(user: User) {}".to_string(), // TODO: Get this from the source map
                range: (24, 28), // TODO: Get this from the source map
                annotation: None,
                import_suggestion: None,
            }),
        }
    }

    pub(super) fn build_param_default_value_error_msg(&self) -> ErrorMessage {
        ErrorMessage {
            title: "Setting default values for parameters is unsupported at this time".to_string(),
            origin: "index.ts".to_string(), // TODO: Get this from the source map
            line_number: 1,                 // TODO: Get this from the source map
            source: "export function example(param: string = 'default') {}".to_string(), // TODO: Get this from the source map
            range: (38, 49), // TODO: Get this from the source map
            annotation: "Attempted to set a default value here".to_string(), // TODO
            suggestion: Some(Suggestion {
                title: "Remove the default value or set it inside the function body".to_string(),
                source: "export function example(param: string) {}".to_string(), // TODO: Get this from the source map
                range: (31, 37), // TODO: Get this from the source map
                annotation: None,
                import_suggestion: None,
            }),
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

    pub(super) fn build_rest_param_error_msg(&self) -> ErrorMessage {
        ErrorMessage {
            title: "Rest parameters are not supported in canister method signatures".to_string(),
            origin: "index.ts".to_string(), // TODO: Get this from the source map
            line_number: 1,                 // TODO: Get this from the source map
            source: "export function example(...options: any[]) {}".to_string(), // TODO: Get this from the source map
            range: (24, 34), // TODO: Get this from the source map
            annotation: "Attempted parameter spread here".to_string(), // TODO
            suggestion: Some(Suggestion {
                title: "Specify each param individually with a concrete type".to_string(),
                source: "export function example(options: Options) {}".to_string(), // TODO: Get this from the source map
                range: (24, 31), // TODO: Get this from the source map
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
