pub use duplicate_method_types::{
    build_duplicate_method_types_error_message,
    build_duplicate_method_types_error_message_from_azle_fn_decl,
};
pub use extraneous_decorator::build_extraneous_decorator_error_message;
pub use missing_return_type::build_missing_return_type_error_message;
pub use parse_error::build_parse_error_message;
pub use parse_error::ParseError;

mod duplicate_method_types;
mod extraneous_decorator;
mod missing_return_type;
mod parse_error;
