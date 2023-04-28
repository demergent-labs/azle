use swc_ecma_ast::NewExpr;

use super::ArgName;
use crate::{
    errors::{ErrorMessage, Suggestion},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

impl SourceMapped<'_, NewExpr> {
    pub fn build_missing_type_args_error_message(&self) -> ErrorMessage {
        self.build_type_arg_error_message("missing type arguments".to_string())
    }

    pub fn build_incorrect_type_args_error_message(&self) -> ErrorMessage {
        self.build_type_arg_error_message("wrong number of type arguments".to_string())
    }

    fn build_type_arg_error_message(&self, title: String) -> ErrorMessage {
        let source = self.get_source();
        let range = (
            source.find("StableBTreeMap").unwrap() + "StableBTreeMap".len(),
            source.find("(").unwrap(),
        );
        let annotation = "expected exactly 2 type arguments here".to_string();
        let help = "specify a key and value type. E.g.:".to_string();
        let suggestion = "<KeyType, ValueType>".to_string();

        self.build_error_message(title, range, annotation, help, suggestion)
    }

    pub fn build_arg_spread_error_message(&self) -> ErrorMessage {
        let title = "StableBTreeMap does not currently support argument spreading".to_string();
        let source = self.get_source();
        let range = (source.find("(").unwrap() + 1, source.find(")").unwrap());
        let annotation = "attempted to spread arguments here".to_string();
        let help = "specify each argument individually. E.g.:".to_string();
        let suggestion = "memory_id, max_key_size, max_value_size".to_string();

        self.build_error_message(title, range, annotation, help, suggestion)
    }

    pub fn build_missing_args_error_message(&self) -> ErrorMessage {
        self.build_arg_error_message("missing arguments".to_string())
    }

    pub fn build_incorrect_number_of_args_error_message(&self) -> ErrorMessage {
        self.build_arg_error_message("incorrect arguments".to_string())
    }

    pub fn build_arg_error_message(&self, title: String) -> ErrorMessage {
        let source = self.get_source();
        let range = (source.find("(").unwrap() + 1, source.find(")").unwrap());
        let annotation = "expected exactly 3 arguments here".to_string();
        let help =
            "specify a memory id, the max key size, and the max value size. E.g.:".to_string();
        let suggestion = "memory_id, max_key_size, max_value_size".to_string();

        self.build_error_message(title, range, annotation, help, suggestion)
    }

    pub fn build_invalid_arg_error_message(&self, arg_name: ArgName) -> ErrorMessage {
        let max_size = match arg_name {
            ArgName::MessageId => "255".to_string(),
            ArgName::MaxKeySize => "4,294,967,295".to_string(),
            ArgName::MaxValueSize => "4,294,967,295".to_string(),
        };
        let title = format!(
            "invalid argument: must be an integer literal between 0 and {} inclusive",
            max_size
        );

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
        let message_id_range = (message_id_start_index, message_id_end_index);

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
        let max_key_size_range = (max_key_size_start_index, max_key_size_end_index);

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
        let max_value_size_range = (max_value_size_start_index, max_value_size_end_index);

        let range = match arg_name {
            ArgName::MessageId => message_id_range,
            ArgName::MaxKeySize => max_key_size_range,
            ArgName::MaxValueSize => max_value_size_range,
        };
        let annotation = "expected here".to_string();
        let help = "use a valid integer literal. E.g.:".to_string();
        let suggestion = match arg_name {
            ArgName::MessageId => "0".to_string(),
            ArgName::MaxKeySize => "100".to_string(),
            ArgName::MaxValueSize => "1_000".to_string(),
        };

        self.build_error_message(title, range, annotation, help, suggestion)
    }

    fn build_error_message(
        &self,
        title: String,
        range: (usize, usize),
        annotation: String,
        help: String,
        suggestion: String,
    ) -> ErrorMessage {
        let source = self.get_source();
        let adjusted_range = if range.0 == range.1 {
            (range.0, range.1 + 1)
        } else {
            range
        };

        let modified_source = [
            source.get(..range.0).unwrap(),
            &suggestion,
            source.get(range.1..).unwrap(),
        ]
        .join("");

        let suggestion_range = (range.0, range.0 + &suggestion.len());

        ErrorMessage {
            title,
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: adjusted_range,
            annotation,
            suggestion: Some(Suggestion {
                title: help,
                source: modified_source,
                range: suggestion_range,
                annotation: None,
                import_suggestion: None,
            }),
        }
    }
}
