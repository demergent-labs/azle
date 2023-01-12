use super::AzleNewExpr;
use crate::{
    errors::{ErrorMessage, Suggestion},
    ts_ast::ast_traits::GetSourceInfo,
};

impl AzleNewExpr<'_> {
    pub fn build_missing_type_args_error_message(&self) -> ErrorMessage {
        let source = self.get_source();

        let type_params_start_index =
            source.find("StableBTreeMap").unwrap() + "StableBTreeMap".len();
        let type_params_end_index = source.find("(").unwrap();

        let modified_source = [
            source.get(..type_params_start_index).unwrap(),
            "<KeyType, ValueType>",
            source.get(type_params_end_index..).unwrap(),
        ]
        .join("");

        ErrorMessage {
            title: "missing type arguments".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source,
            range: (type_params_start_index, type_params_end_index + 1),
            annotation: "expected exactly 2 type arguments here".to_string(),
            suggestion: Some(Suggestion {
                title: "specify a key and value type. E.g.:".to_string(),
                source: modified_source,
                range: (
                    type_params_start_index,
                    type_params_start_index + "<KeyType, ValueType>".len(),
                ),
                annotation: None,
                import_suggestion: None,
            }),
        }
    }

    pub fn build_incorrect_type_args_error_message(&self) -> ErrorMessage {
        let source = self.get_source();

        let type_params_start_index =
            source.find("StableBTreeMap").unwrap() + "StableBTreeMap".len();
        let type_params_end_index = source.find("(").unwrap();

        let modified_source = [
            source.get(..type_params_start_index).unwrap(),
            "<KeyType, ValueType>",
            source.get(type_params_end_index..).unwrap(),
        ]
        .join("");

        ErrorMessage {
            title: "wrong number of type arguments".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source,
            range: (type_params_start_index, type_params_end_index),
            annotation: "expected exactly 2 type arguments here".to_string(),
            suggestion: Some(Suggestion {
                title: "specify a key and value type. E.g.:".to_string(),
                source: modified_source,
                range: (
                    type_params_start_index,
                    type_params_start_index + "<KeyType, ValueType>".len(),
                ),
                annotation: None,
                import_suggestion: None,
            }),
        }
    }

    pub fn build_arg_spread_error_message(&self) -> ErrorMessage {
        let source = self.get_source();

        let args_start_index = source.find("(").unwrap() + 1;
        let args_end_index = source.find(")").unwrap();

        let args_suggestion = "memory_id, max_key_size, max_value_size".to_string();

        let modified_source = [
            source.get(..args_start_index).unwrap(),
            &args_suggestion,
            source.get(args_end_index..).unwrap(),
        ]
        .join("");

        ErrorMessage {
            title: "StableBTreeMap does not currently support argument spreading".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source,
            range: (args_start_index, args_end_index),
            annotation: "attempted to spread arguments here".to_string(),
            suggestion: Some(Suggestion {
                title: "specify each argument individually. E.g.:".to_string(),
                source: modified_source,
                range: (args_start_index, args_start_index + &args_suggestion.len()),
                annotation: None,
                import_suggestion: None,
            }),
        }
    }

    pub fn build_missing_args_error_message(&self) -> ErrorMessage {
        let source = self.get_source();

        let args_start_index = source.find("(").unwrap() + 1;
        let args_end_index = source.find(")").unwrap();

        let args_suggestion = "memory_id, max_key_size, max_value_size".to_string();

        let modified_source = [
            source.get(..args_start_index).unwrap(),
            &args_suggestion,
            source.get(args_end_index..).unwrap(),
        ]
        .join("");

        ErrorMessage {
            title: "missing arguments".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source,
            range: (args_start_index - 1, args_end_index + 1),
            annotation: "expected 3 arguments here".to_string(),
            suggestion: Some(Suggestion {
                title: "specify a memory id, the max key size, and the max value size. E.g.:"
                    .to_string(),
                source: modified_source,
                range: (args_start_index, args_start_index + &args_suggestion.len()),
                annotation: None,
                import_suggestion: None,
            }),
        }
    }

    pub fn build_arg_error_message(&self) -> String {
        let example = "\n    new StableBTreeMap<CustomKeyType, CustomValueType>(0, 100, 1000)";
        format!("The \"StableBTreeMap\" type requires exactly 3 arguments: an identifier, the max key length, and the max value length. E.g.\n{}", example)
    }

    pub fn build_memory_id_error_message(&self) -> String {
        let example = "\n    new StableBTreeMap<CustomKeyType, CustomValueType>(0, 100, 1000)";
        format!(
            "The first argument to StableBTreeMap must be an integer literal between 0 and 255. E.g.\n{}",
            example
        )
    }

    pub fn build_second_argument_size_error_message(&self) -> String {
        let example = "\n    new StableBTreeMap<CustomKeyType, CustomValueType>(0, 100, 1000)";
        format!(
            "The second argument to StableBTreeMap must be an integer literal between 0 and 4,294,967,295. E.g.\n{}",
            example
        )
    }

    pub fn build_third_argument_size_error_message(&self) -> String {
        let example = "\n    new StableBTreeMap<CustomKeyType, CustomValueType>(0, 100, 1000)";
        format!(
            "The third argument to StableBTreeMap must be an integer literal between 0 and 4,294,967,295. E.g.\n{}",
            example
        )
    }
}
