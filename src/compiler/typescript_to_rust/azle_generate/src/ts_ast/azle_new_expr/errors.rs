use super::{to_stable_b_tree_map::ArgName, AzleNewExpr};
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

    pub fn build_incorrect_number_of_args_error_message(&self) -> ErrorMessage {
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
            title: "incorrect arguments".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source,
            range: (args_start_index - 1, args_end_index + 1),
            annotation: "expected exactly 3 arguments here".to_string(),
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

    pub fn build_invalid_arg_error_message(&self, arg_name: ArgName) -> ErrorMessage {
        let source = self.get_source();

        let open_paren_index = source.find("(").unwrap();
        let message_id_start_index = source
            .char_indices()
            .find(|(i, c)| *i > open_paren_index && !c.is_whitespace())
            .map(|(i, _)| i)
            .unwrap();

        let message_id_end_index = source
            .char_indices()
            .find(|(i, c)| *i > message_id_start_index && c == &',')
            .map(|(i, _)| i)
            .unwrap();

        let max_key_size_start_index = source
            .char_indices()
            .find(|(i, c)| *i > message_id_end_index && !c.is_whitespace())
            .map(|(i, _)| i)
            .unwrap();

        let max_key_size_end_index = source
            .char_indices()
            .find(|(i, c)| *i > max_key_size_start_index && c == &',')
            .map(|(i, _)| i)
            .unwrap();

        let max_value_size_start_index = source
            .char_indices()
            .find(|(i, c)| *i > max_key_size_end_index && !c.is_whitespace())
            .map(|(i, _)| i)
            .unwrap();

        let max_value_size_end_index = source
            .char_indices()
            .find(|(i, c)| *i > max_value_size_start_index && (c.is_whitespace() || c == &')'))
            .map(|(i, _)| i)
            .unwrap();

        let suggested_replacement = match arg_name {
            ArgName::MessageId => "0".to_string(),
            ArgName::MaxKeySize => "100".to_string(),
            ArgName::MaxValueSize => "1_000".to_string(),
        };

        let modified_source = match arg_name {
            ArgName::MessageId => [
                source.get(..message_id_start_index).unwrap(),
                &suggested_replacement,
                source.get(message_id_end_index..).unwrap(),
            ]
            .join(""),
            ArgName::MaxKeySize => [
                source.get(..max_key_size_start_index).unwrap(),
                &suggested_replacement,
                source.get(max_key_size_end_index..).unwrap(),
            ]
            .join(""),
            ArgName::MaxValueSize => [
                source.get(..max_value_size_start_index).unwrap(),
                &suggested_replacement,
                source.get(max_value_size_end_index..).unwrap(),
            ]
            .join(""),
        };

        let range = match arg_name {
            ArgName::MessageId => (message_id_start_index, message_id_end_index),
            ArgName::MaxKeySize => (max_key_size_start_index, max_key_size_end_index),
            ArgName::MaxValueSize => (max_value_size_start_index, max_value_size_end_index),
        };

        let suggestion_range = match arg_name {
            ArgName::MessageId => (
                message_id_start_index,
                message_id_start_index + &suggested_replacement.len(),
            ),
            ArgName::MaxKeySize => (
                max_key_size_start_index,
                max_key_size_start_index + &suggested_replacement.len(),
            ),
            ArgName::MaxValueSize => (
                max_value_size_start_index,
                max_value_size_start_index + &suggested_replacement.len(),
            ),
        };

        let max_size = match arg_name {
            ArgName::MessageId => "255".to_string(),
            ArgName::MaxKeySize => "4,294,967,295".to_string(),
            ArgName::MaxValueSize => "4,294,967,295".to_string(),
        };

        ErrorMessage {
            title: format!(
                "invalid argument: must be an integer literal between 0 and {} inclusive",
                max_size
            ),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source,
            range,
            annotation: "expected here".to_string(),
            suggestion: Some(Suggestion {
                title: "use a valid integer literal. E.g.:".to_string(),
                source: modified_source,
                range: suggestion_range,
                annotation: None,
                import_suggestion: None,
            }),
        }
    }
}
