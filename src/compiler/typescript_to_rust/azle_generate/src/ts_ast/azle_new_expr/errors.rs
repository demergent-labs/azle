use super::AzleNewExpr;

impl AzleNewExpr<'_> {
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
