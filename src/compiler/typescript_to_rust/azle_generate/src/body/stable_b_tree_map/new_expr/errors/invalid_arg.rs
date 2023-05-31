use swc_ecma_ast::NewExpr;

use super::ArgName;
use crate::{
    errors::{CompilerOutput, Location},
    traits::GetSourceInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct InvalidArg {
    arg_name: ArgName,
    source: String,
    location: Location,
}

impl InvalidArg {
    pub fn from_new_expr(sm_new_expr: &SourceMapped<NewExpr>, arg_name: ArgName) -> Self {
        Self {
            source: sm_new_expr.get_source(),
            location: sm_new_expr.get_location(),
            arg_name,
        }
    }

    pub fn build_invalid_arg_error_message(&self) -> CompilerOutput {
        let max_size = match self.arg_name {
            ArgName::MessageId => "255".to_string(),
            ArgName::MaxKeySize => "4,294,967,295".to_string(),
            ArgName::MaxValueSize => "4,294,967,295".to_string(),
        };
        let title = format!(
            "invalid argument: must be an integer literal between 0 and {} inclusive",
            max_size
        );

        // UNWRAP HERE
        let open_paren_index = self.source.find("(").unwrap();

        let message_id_start_index = self
            .source
            .char_indices()
            .find(|(i, c)| *i > open_paren_index && !c.is_whitespace())
            .map(|(i, _)| i)
            // UNWRAP HERE
            .unwrap();
        let message_id_end_index = self
            .source
            .char_indices()
            .find(|(i, c)| *i > message_id_start_index && c == &',')
            .map(|(i, _)| i)
            // UNWRAP HERE
            .unwrap();
        let message_id_range = (message_id_start_index, message_id_end_index);

        let max_key_size_start_index = self
            .source
            .char_indices()
            .find(|(i, c)| *i > message_id_end_index && !c.is_whitespace())
            .map(|(i, _)| i)
            // UNWRAP HERE
            .unwrap();
        let max_key_size_end_index = self
            .source
            .char_indices()
            .find(|(i, c)| *i > max_key_size_start_index && c == &',')
            .map(|(i, _)| i)
            // UNWRAP HERE
            .unwrap();
        let max_key_size_range = (max_key_size_start_index, max_key_size_end_index);

        let max_value_size_start_index = self
            .source
            .char_indices()
            .find(|(i, c)| *i > max_key_size_end_index && !c.is_whitespace())
            .map(|(i, _)| i)
            // UNWRAP HERE
            .unwrap();
        let max_value_size_end_index = self
            .source
            .char_indices()
            .find(|(i, c)| *i > max_value_size_start_index && (c.is_whitespace() || c == &')'))
            .map(|(i, _)| i)
            // UNWRAP HERE
            .unwrap();
        let max_value_size_range = (max_value_size_start_index, max_value_size_end_index);

        let range = match self.arg_name {
            ArgName::MessageId => message_id_range,
            ArgName::MaxKeySize => max_key_size_range,
            ArgName::MaxValueSize => max_value_size_range,
        };
        let annotation = "expected here".to_string();
        let help = "use a valid integer literal. E.g.:".to_string();
        let suggestion = match self.arg_name {
            ArgName::MessageId => "0".to_string(),
            ArgName::MaxKeySize => "100".to_string(),
            ArgName::MaxValueSize => "1_000".to_string(),
        };

        super::build_error_message(
            &title,
            &self.source,
            &self.location,
            range,
            annotation,
            help,
            suggestion,
        )
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
        write!(f, "{}", self.build_invalid_arg_error_message())
    }
}
