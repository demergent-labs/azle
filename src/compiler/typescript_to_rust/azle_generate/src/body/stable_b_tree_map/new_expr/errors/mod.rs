mod arg_spread;
mod incorrect_number_of_args;
mod incorrect_type_args;
mod invalid_arg;
mod missing_args;
mod missing_sbtm_type_argument;

use super::ArgName;
use crate::errors::{CompilerOutput, Location, Suggestion};

pub use arg_spread::ArgSpread;
pub use incorrect_number_of_args::IncorrectNumberOfArgs;
pub use incorrect_type_args::IncorrectTypeArgs;
pub use invalid_arg::InvalidArg;
pub use missing_args::MissingArgs;
pub use missing_sbtm_type_argument::MissingSbtmTypeArguments;

pub fn build_type_arg_error_message(
    title: &str,
    source: &str,
    location: &Location,
) -> CompilerOutput {
    // let range = (
    //     // UNWRAP HERE // TODO this will be made more complicated by robust imports
    //     source.find("StableBTreeMap").unwrap() + "StableBTreeMap".len(),
    //     // UNWRAP HERE
    //     source.find("(").unwrap(),
    // );
    let range = (0, 0); // TODO figure out a dynamic way to get the range with the symbol table instead of the string literal "StableBTreeMap"
    let annotation = "expected exactly 2 type arguments here".to_string();
    let help = "specify a key and value type. E.g.:".to_string();
    let suggestion = "<KeyType, ValueType>".to_string();

    build_error_message(title, source, location, range, annotation, help, suggestion)
}

pub fn build_arg_error_message(title: &str, source: &str, location: &Location) -> CompilerOutput {
    // UNWRAP HERE // UNWRAP HERE
    let range = (source.find("(").unwrap() + 1, source.find(")").unwrap());
    let annotation = "expected exactly 3 arguments here".to_string();
    let help = "specify a memory id, the max key size, and the max value size. E.g.:".to_string();
    let suggestion = "memory_id, max_key_size, max_value_size".to_string();

    build_error_message(title, source, location, range, annotation, help, suggestion)
}

fn build_error_message(
    title: &str,
    source: &str,
    location: &Location,
    range: (usize, usize),
    annotation: String,
    help: String,
    suggestion: String,
) -> CompilerOutput {
    let adjusted_range = if range.0 == range.1 {
        (range.0, range.1 + 1)
    } else {
        range
    };

    let modified_source = [
        // UNWRAP HERE
        source.get(..range.0).unwrap(),
        &suggestion,
        // UNWRAP HERE
        source.get(range.1..).unwrap(),
    ]
    .join("");

    let suggestion_range = (range.0, range.0 + &suggestion.len());

    CompilerOutput {
        title: title.to_string(),
        location: Location {
            range: adjusted_range,
            ..location.clone()
        },
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
