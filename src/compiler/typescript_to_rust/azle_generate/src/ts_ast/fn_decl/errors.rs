use swc_ecma_ast::FnDecl;

use crate::errors::ErrorWithExampleDiff;

pub trait FnDeclErrors {
    fn build_array_destructure_error_msg(&self) -> String;
    fn build_invalid_param_error_msg(&self) -> String;
    fn build_missing_return_annotation_error_msg(&self) -> String;
    fn build_missing_return_type_error_msg(&self, canister_method_type: &str) -> String;
    fn build_non_type_ref_return_type_error_msg(&self) -> String;
    fn build_object_destructure_error_msg(&self) -> String;
    fn build_param_default_value_error_msg(&self) -> String;
    fn build_qualified_type_error_msg(&self) -> String;
    fn build_rest_param_error_msg(&self) -> String;
    fn build_untyped_param_error_msg(&self) -> String;
}

impl FnDeclErrors for FnDecl {
    fn build_array_destructure_error_msg(&self) -> String {
        let error_message = ErrorWithExampleDiff {
            error: "Array destructuring in parameters is unsupported at this time",
            help: "Remove destructuring in favor of a concrete name",
            remove: "function example([i1, i2]: List) {}",
            add: "function example(list: List) {}",
        };
        error_message.to_string()
    }

    fn build_invalid_param_error_msg(&self) -> String {
        "Something is impossibly wrong with your parameters. Please open an issue showing your canister methods and this error.".to_string()
    }

    fn build_missing_return_annotation_error_msg(&self) -> String {
        "Canister methods must specify a return type".to_string()
    }

    fn build_missing_return_type_error_msg(&self, canister_method_type: &str) -> String {
        let error_message = ErrorWithExampleDiff {
            error: "Missing return type",
            help: &format!("Specify a return type inside of {}", canister_method_type),
            remove: &format!("export function example(): {} {{}}", canister_method_type),
            add: &format!(
                "export function example(): {}<null> {{}}",
                canister_method_type
            ),
        };
        error_message.to_string()
    }

    fn build_non_type_ref_return_type_error_msg(&self) -> String {
        "Canister method return types must be one of: Init, InspectMessage, Oneway, PostUpgrade, PreUpgrade, Query, QueryManual, Update, UpdateManual".to_string()
    }

    fn build_object_destructure_error_msg(&self) -> String {
        let error_message = ErrorWithExampleDiff {
            error: "Object destructuring in parameters is unsupported at this time",
            help: "Remove destructuring in favor of a concrete name",
            remove: "function example({id, name}: User) {}",
            add: "function example(user: User) {}",
        };
        error_message.to_string()
    }

    fn build_param_default_value_error_msg(&self) -> String {
        let error_message = ErrorWithExampleDiff {
            error: "Setting default values for parameters is unsupported at this time",
            help: "Remove the default value or set it in the function body",
            remove: "function example(param: string = 'default') {}",
            add: "function example(param: string) {}",
        };
        error_message.to_string()
    }

    fn build_qualified_type_error_msg(&self) -> String {
        let error_message = ErrorWithExampleDiff {
            error: "Namespace-qualified types are not currently supported",
            help: "Either declare the import locally or remove the wildcard import",
            remove: "export function example(): Query<Namespace.MyType> {}",
            add: "export function example(): Query<MyType> {}",
        };
        error_message.to_string()
    }

    fn build_rest_param_error_msg(&self) -> String {
        let error_message = ErrorWithExampleDiff {
            error: "Rest parameters are not supported",
            help: "Specify each param individually with a concrete type",
            remove: "function example(...options: any[]) {}",
            add: "function example(options: Options) {}",
        };
        error_message.to_string()
    }

    fn build_untyped_param_error_msg(&self) -> String {
        let error_message = ErrorWithExampleDiff {
            error: "Untyped parameter",
            help: "Specify a type for the parameter",
            remove: "function example(param) {}",
            add: "function example(param: MyParam) {}",
        };
        error_message.to_string()
    }
}
