use super::AzleNewExpr;
use crate::{
    errors::{ErrorMessage, Suggestion},
    ts_ast::source_map::GetSourceFileInfo,
};

impl AzleNewExpr<'_> {
    pub fn build_missing_type_args_error_message(&self) -> ErrorMessage {
        let source = self.source_map.get_source(self.new_expr.span);

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
            origin: self.source_map.get_origin(self.new_expr.span),
            line_number: self.source_map.get_line_number(self.new_expr.span),
            source,
            range: (type_params_start_index, type_params_end_index + 1),
            annotation: "Expected exactly 2 type arguments here".to_string(),
            suggestion: Some(Suggestion {
                title: "Specify a key and value type".to_string(),
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

    pub fn build_type_arg_error_message(&self) -> String {
        let example = "\n    new StableBTreeMap<CustomKeyType, CustomValueType>(0, 100, 1000)";
        format!("The \"StableBTreeMap\" type requires exactly 2 type arguments: the key datatype, and the value datatype. E.g.\n{}", example)
    }

    pub fn build_arg_spread_error_message(&self) -> String {
        let example = "\n    new StableBTreeMap<CustomKeyType, CustomValueType>(0, 100, 1000)";
        format!("The \"StableBTreeMap\" type does not currently support argument spreading. Instead, pass each argument individually. E.g.\n{}", example)
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
