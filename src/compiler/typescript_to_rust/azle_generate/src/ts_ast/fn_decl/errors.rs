use swc_ecma_ast::FnDecl;

use crate::errors::{ErrorMessage, Suggestion};

pub trait FnDeclErrors {
    fn build_array_destructure_error_msg(&self) -> ErrorMessage;
    fn build_invalid_param_error_msg(&self) -> String;
    fn build_missing_return_annotation_error_msg(&self) -> String;
    fn build_missing_return_type_error_msg(&self, canister_method_type: &str) -> ErrorMessage;
    fn build_non_type_ref_return_type_error_msg(&self) -> String;
    fn build_object_destructure_error_msg(&self) -> ErrorMessage;
    fn build_param_default_value_error_msg(&self) -> ErrorMessage;
    fn build_qualified_type_error_msg(&self) -> ErrorMessage;
    fn build_rest_param_error_msg(&self) -> ErrorMessage;
    fn build_untyped_param_error_msg(&self) -> ErrorMessage;
}

impl FnDeclErrors for FnDecl {
    fn build_array_destructure_error_msg(&self) -> ErrorMessage {
        ErrorMessage {
            title: "Array destructuring in parameters is unsupported at this time".to_string(),
            origin: "index.ts".to_string(), // TODO: Get this from the source map
            line_number: 1,                 // TODO: Get this from the source map
            source: "export function example([i1, i2]: List) {}".to_string(), // TODO: Get this from the source map
            range: (24, 32), // TODO: Get this from the source map
            annotation: "Attempted to destructure here".to_string(),
            suggestion: Some(Suggestion {
                title: "Remove destructuring in favor of a concrete name".to_string(),
                source: "export function example(list: List) {}".to_string(), // TODO: Get this from the source map
                range: (24, 28), // TODO: Get this from the source map
            }),
        }
    }

    fn build_invalid_param_error_msg(&self) -> String {
        "Something is impossibly wrong with your parameters. Please open an issue showing your canister methods and this error.".to_string()
    }

    fn build_missing_return_annotation_error_msg(&self) -> String {
        "Canister methods must specify a return type".to_string()
    }

    fn build_missing_return_type_error_msg(&self, canister_method_type: &str) -> ErrorMessage {
        ErrorMessage {
            title: "Missing return type".to_string(),
            origin: "index.ts".to_string(), // TODO: Get this from the source map
            line_number: 1,                 // TODO: Get this from the source map
            source: format!("export function example(): {} {{}}", canister_method_type), // TODO: Get this from the source map
            range: (32, 33), // TODO: Get this from the source map
            annotation: "Expected return type here".to_string(), // TODO
            suggestion: Some(Suggestion {
                title: format!("Specify a return type inside of {}", canister_method_type),
                source: format!(
                    "export function example(): {}<null> {{}}",
                    canister_method_type
                ), // TODO: Get this from the source map
                range: (32, 38), // TODO: Get this from the source map
            }),
        }
    }

    fn build_non_type_ref_return_type_error_msg(&self) -> String {
        "Canister method return types must be one of: Init, InspectMessage, Oneway, PostUpgrade, PreUpgrade, Query, QueryManual, Update, UpdateManual".to_string()
    }

    fn build_object_destructure_error_msg(&self) -> ErrorMessage {
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
            }),
        }
    }

    fn build_param_default_value_error_msg(&self) -> ErrorMessage {
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
            }),
        }
    }

    fn build_qualified_type_error_msg(&self) -> ErrorMessage {
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
            }),
        }
    }

    fn build_rest_param_error_msg(&self) -> ErrorMessage {
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
            }),
        }
    }

    fn build_untyped_param_error_msg(&self) -> ErrorMessage {
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
            }),
        }
    }
}
