use std::fmt::Display;

use swc_ecma_ast::TsTypeRef;

use crate::{
    errors::{CompilerOutput, Location, Suggestion, SuggestionModifications},
    internal_error,
    traits::{GetNameWithError, GetSourceFileInfo, GetSourceInfo},
    ts_ast::SourceMapped,
    Error,
};

#[derive(Debug, Clone, PartialEq)]
pub struct WrongNumberOfParams {
    name: TypeRefCandidTypes,
    param_count: usize,
    location: Location,
    modified_source: String,
    modified_range: (usize, usize),
}

#[derive(Debug, Clone, PartialEq)]
enum TypeRefCandidTypes {
    Record,
    Variant,
    Tuple,
    Vec,
    Opt,
    Func,
}

impl WrongNumberOfParams {
    fn create_annotation(&self) -> String {
        if self.param_count == 0 {
            "Needs to have an enclosed type here."
        } else {
            "Only one enclosed type allowed here."
        }
        .to_string()
    }

    pub fn error_from_ts_type_ref(sm_ts_type_ref: &SourceMapped<TsTypeRef>) -> Error {
        let name = match sm_ts_type_ref.get_candid_type() {
            Ok(name) => name,
            Err(err) => return err,
        };
        let param_count = sm_ts_type_ref.get_param_count();
        let (modified_source, modified_range) =
            match sm_ts_type_ref.get_suggestion_modifications(&name) {
                Ok(ok) => ok,
                Err(err) => return err,
            };
        Self {
            location: sm_ts_type_ref.get_location(),
            param_count,
            modified_source,
            modified_range,
            name,
        }
        .into()
    }

    fn create_variant_error(&self) -> CompilerOutput {
        let suggestion_annotation = if self.param_count == 0 {
            "The simplest Variant is a type literal with a single member with type null"
        } else {
            "Try wrapping everything in a type literal"
        };
        CompilerOutput {
            title: "Invalid Variant".to_string(),
            location: self.location.clone(),
            annotation: self.create_annotation(),
            suggestion: Some(self.create_suggestion(
                "Variant must have exactly one enclosed type. If you need multiple variants, put them all in type literal.",
                suggestion_annotation
            )),
        }
    }

    fn create_func_error(&self) -> CompilerOutput {
        let suggestion_annotation = if self.param_count == 0 {
            "If the func has no parameters or return type then you could do this."
        } else {
            "Did you mean to have multiple parameters?"
        };
        CompilerOutput {
            title: "Invalid Func".to_string(),
            location: self.location.clone(),
            annotation: self.create_annotation(),
            suggestion: Some(self.create_suggestion(
                "Funcs must have exactly one enclosed type.",
                suggestion_annotation,
            )),
        }
    }

    fn create_option_error(&self) -> CompilerOutput {
        let suggestion_annotation = if self.param_count == 0 {
            "For example if you want an optional boolean value, enclose boolean with Opt"
        } else {
            ""
        };
        CompilerOutput {
            title: "Invalid Opt".to_string(),
            location: self.location.clone(),
            annotation: self.create_annotation(),
            suggestion: Some(self.create_suggestion(
                "Opts must have exactly one enclosed type.",
                suggestion_annotation,
            )),
        }
    }

    fn create_record_error(&self) -> CompilerOutput {
        let suggestion_annotation = if self.param_count == 0 {
            "The simplest Record is an empty type literal"
        } else {
            "Try wrapping everything in a type literal"
        };
        CompilerOutput {
            title: "Invalid Record".to_string(),
            location: self.location.clone(),
            annotation: self.create_annotation(),
            suggestion: Some(self.create_suggestion(
                "Opts must have exactly one enclosed type.",
                suggestion_annotation,
            )),
        }
    }

    fn create_tuple_error(&self) -> CompilerOutput {
        let suggestion_annotation = if self.param_count == 0 {
            "Add types to the tuple here"
        } else {
            "Try wrapping everything in square braces"
        };
        CompilerOutput {
            title: "Invalid Tuple".to_string(),
            location: self.location.clone(),
            annotation: self.create_annotation(),
            suggestion: Some(self.create_suggestion(
                "Tuples must have exactly one enclosed type.",
                suggestion_annotation,
            )),
        }
    }

    fn create_vec_error(&self) -> CompilerOutput {
        let suggestion_annotation = if self.param_count == 0 {
            "For example if you want a vec of boolean value, enclose boolean with Vec"
        } else {
            ""
        };
        CompilerOutput {
            title: "Invalid Opt".to_string(),
            location: self.location.clone(),
            annotation: self.create_annotation(),
            suggestion: Some(self.create_suggestion(
                "Opts must have exactly one enclosed type.",
                suggestion_annotation,
            )),
        }
    }

    fn create_suggestion(&self, title: &str, suggestion_annotation: &str) -> Suggestion {
        Suggestion {
            title: title.to_string(),
            range: self.modified_range,
            source: self.modified_source.clone(),
            annotation: Some(suggestion_annotation.to_string()),
            import_suggestion: None,
        }
    }
}

impl std::error::Error for WrongNumberOfParams {}

impl From<WrongNumberOfParams> for crate::Error {
    fn from(error: WrongNumberOfParams) -> Self {
        Self::WrongNumberOfParams(error)
    }
}

impl Display for WrongNumberOfParams {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let compiler_output = match self.name {
            TypeRefCandidTypes::Variant => self.create_variant_error(),
            TypeRefCandidTypes::Func => self.create_func_error(),
            TypeRefCandidTypes::Opt => self.create_option_error(),
            TypeRefCandidTypes::Record => self.create_record_error(),
            TypeRefCandidTypes::Tuple => self.create_tuple_error(),
            TypeRefCandidTypes::Vec => self.create_vec_error(),
        };
        write!(f, "{}", compiler_output)
    }
}

impl SourceMapped<'_, TsTypeRef> {
    fn get_candid_type(&self) -> Result<TypeRefCandidTypes, Error> {
        Ok(match self.get_name()? {
            "Variant" => TypeRefCandidTypes::Variant,
            "Func" => TypeRefCandidTypes::Func,
            "Opt" => TypeRefCandidTypes::Opt,
            "Record" => TypeRefCandidTypes::Record,
            "Tuple" => TypeRefCandidTypes::Tuple,
            "Vec" => TypeRefCandidTypes::Vec,
            _ => internal_error!(),
        })
    }

    fn get_suggestion_modifications(
        &self,
        candid_type: &TypeRefCandidTypes,
    ) -> Result<SuggestionModifications, Error> {
        let example = match candid_type {
            TypeRefCandidTypes::Variant => self.generate_example_variant()?,
            TypeRefCandidTypes::Func => self.generate_example_func(),
            TypeRefCandidTypes::Opt => self.generate_example_option()?,
            TypeRefCandidTypes::Record => self.generate_example_record(),
            TypeRefCandidTypes::Tuple => self.generate_example_tuple(),
            TypeRefCandidTypes::Vec => self.generate_example_vec(),
        };
        Ok(self.get_suggestion_modifications_from_example(example.as_str()))
    }

    fn get_suggestion_modifications_from_example(&self, example: &str) -> SuggestionModifications {
        let modified_source = self
            .source_map
            .generate_modified_source(self.get_enclosed_span(), example);
        let modified_range = self
            .source_map
            .generate_modified_range(self.get_enclosed_span(), example);
        (modified_source, modified_range)
    }
}
