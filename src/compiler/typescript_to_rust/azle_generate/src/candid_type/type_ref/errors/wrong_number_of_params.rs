use std::fmt::Display;

use swc_ecma_ast::TsTypeRef;

use crate::{
    errors::{CompilerOutput, InternalError, Location, Suggestion, SuggestionModifications},
    internal_error,
    traits::{GetName, GetSourceFileInfo, GetSourceInfo},
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

    fn create_compiler_output(&self) -> Result<CompilerOutput, Error> {
        Ok(CompilerOutput {
            title: self.create_title(),
            location: self.location.clone(),
            annotation: self.create_annotation()?,
            suggestion: Some(self.create_suggestion()?),
        })
    }

    fn create_title(&self) -> String {
        match self.name {
            TypeRefCandidTypes::Record => "Invalid Record",
            TypeRefCandidTypes::Variant => "Invalid Variant",
            TypeRefCandidTypes::Tuple => "Invalid Tuple",
            TypeRefCandidTypes::Vec => "Invalid Vec",
            TypeRefCandidTypes::Opt => "Invalid Opt",
            TypeRefCandidTypes::Func => "Invalid Func",
        }
        .to_string()
    }

    fn create_annotation(&self) -> Result<String, Error> {
        if self.param_count == 1 {
            return Err(InternalError::new().into());
        }
        Ok(if self.param_count == 0 {
            "Needs to have an enclosed type here."
        } else {
            "Only one enclosed type allowed here."
        }
        .to_string())
    }

    fn create_suggestion(&self) -> Result<Suggestion, Error> {
        Ok(Suggestion {
            title: self.create_suggestion_title(),
            range: self.modified_range,
            source: self.modified_source.clone(),
            annotation: Some(self.create_suggestion_annotation()?),
            import_suggestion: None,
        })
    }
    fn create_suggestion_title(&self) -> String {
        match self.name {
            TypeRefCandidTypes::Record => "Record must have example one enclose type.",
            TypeRefCandidTypes::Variant => "Variant must have exactly one enclosed type. If you need multiple variants, put them all in a type literal.",
            TypeRefCandidTypes::Tuple => "Tuples must have exactly one enclosed type.",
            TypeRefCandidTypes::Vec => "Vecs must have example one enclosed type.",
            TypeRefCandidTypes::Opt => "Opts must have exactly one enclosed type.",
            TypeRefCandidTypes::Func => "Funcs must have exactly one enclosed type.",
        }
        .to_string()
    }

    fn create_suggestion_annotation(&self) -> Result<String, Error> {
        if self.param_count == 1 {
            return Err(InternalError::new().into());
        }
        Ok(match self.name {
            TypeRefCandidTypes::Record => {
                if self.param_count == 0 {
                    "The simplest Record is an empty type literal"
                } else {
                    "Try wrapping everything in a type literal"
                }
            }
            TypeRefCandidTypes::Variant => {
                if self.param_count == 0 {
                    "The simplest Variant is a type literal with a single member with type null"
                } else {
                    "Try wrapping everything in a type literal"
                }
            }
            TypeRefCandidTypes::Tuple => {
                if self.param_count == 0 {
                    "Add types to the tuple here"
                } else {
                    "Try wrapping everything in square braces"
                }
            }
            TypeRefCandidTypes::Vec => {
                if self.param_count == 0 {
                    "For example if you want a vec of boolean value, enclose boolean with Vec"
                } else {
                    ""
                }
            }
            TypeRefCandidTypes::Opt => {
                if self.param_count == 0 {
                    "For example if you want an optional boolean value, enclose boolean with Opt"
                } else {
                    ""
                }
            }
            TypeRefCandidTypes::Func => {
                if self.param_count == 0 {
                    "If the func has no parameters or return type then you could do this."
                } else {
                    "Did you mean to have multiple parameters?"
                }
            }
        }
        .to_string())
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
        match self.create_compiler_output() {
            Ok(compiler_output) => write!(f, "{}", compiler_output),
            Err(err) => write!(f, "{}", err),
        }
    }
}

impl SourceMapped<'_, TsTypeRef> {
    fn get_candid_type(&self) -> Result<TypeRefCandidTypes, Error> {
        let name = self.get_name();
        Ok(match name.as_str() {
            _ if self.alias_table.variant.contains(&name) => TypeRefCandidTypes::Variant,
            _ if self.alias_table.func.contains(&name) => TypeRefCandidTypes::Func,
            _ if self.alias_table.opt.contains(&name) => TypeRefCandidTypes::Opt,
            _ if self.alias_table.record.contains(&name) => TypeRefCandidTypes::Record,
            _ if self.alias_table.tuple.contains(&name) => TypeRefCandidTypes::Tuple,
            _ if self.alias_table.vec.contains(&name) => TypeRefCandidTypes::Vec,
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
