use swc_ecma_ast::NewExpr;

use super::ArgName;
use crate::{errors::CompilerOutput, traits::GetSourceInfo, ts_ast::SourceMapped};

#[derive(Debug, Clone, PartialEq)]
pub struct InvalidArg {
    compiler_output: CompilerOutput,
}

impl InvalidArg {
    pub fn from_new_expr(sm_new_expr: &SourceMapped<NewExpr>, arg_name: ArgName) -> Self {
        Self {
            compiler_output: sm_new_expr.build_invalid_arg_error_message(arg_name),
        }
    }
}

impl std::error::Error for InvalidArg {}

impl From<InvalidArg> for crate::Error {
    fn from(error: InvalidArg) -> Self {
        Self::InvalidArg(error)
    }
}

impl std::fmt::Display for InvalidArg {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.compiler_output)
    }
}

impl SourceMapped<'_, NewExpr> {
    pub fn build_invalid_arg_error_message(&self, arg_name: ArgName) -> CompilerOutput {
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
        // UNWRAP HERE
        let open_paren_index = source.find("(").unwrap();

        let message_id_start_index = source
            .char_indices()
            .find(|(i, c)| *i > open_paren_index && !c.is_whitespace())
            .map(|(i, _)| i)
            // UNWRAP HERE
            .unwrap();
        let message_id_end_index = source
            .char_indices()
            .find(|(i, c)| *i > message_id_start_index && c == &',')
            .map(|(i, _)| i)
            // UNWRAP HERE
            .unwrap();
        let message_id_range = (message_id_start_index, message_id_end_index);

        let max_key_size_start_index = source
            .char_indices()
            .find(|(i, c)| *i > message_id_end_index && !c.is_whitespace())
            .map(|(i, _)| i)
            // UNWRAP HERE
            .unwrap();
        let max_key_size_end_index = source
            .char_indices()
            .find(|(i, c)| *i > max_key_size_start_index && c == &',')
            .map(|(i, _)| i)
            // UNWRAP HERE
            .unwrap();
        let max_key_size_range = (max_key_size_start_index, max_key_size_end_index);

        let max_value_size_start_index = source
            .char_indices()
            .find(|(i, c)| *i > max_key_size_end_index && !c.is_whitespace())
            .map(|(i, _)| i)
            // UNWRAP HERE
            .unwrap();
        let max_value_size_end_index = source
            .char_indices()
            .find(|(i, c)| *i > max_value_size_start_index && (c.is_whitespace() || c == &')'))
            .map(|(i, _)| i)
            // UNWRAP HERE
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
}
