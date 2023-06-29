use swc_common::source_map::Pos;
use swc_ecma_ast::TsTypeRef;

use crate::{
    errors::{CompilerOutput, InternalError, Location, Suggestion, SuggestionModifications},
    traits::{GetName, GetSourceFileInfo, GetSourceInfo},
    ts_ast::SourceMapped,
    Error,
};

#[derive(Debug, Clone, PartialEq)]
pub struct WrongEnclosedType {
    name: EnclosingType,
    modified_source: String,
    modified_range: (usize, usize),
    location: Location,
}

// NOTE: Vec, and Opt are not included in this enum because they have much more
// flexibility with their enclosing type. Their enclosed type can be any sort of
// TsType. On the other hand Variants and Records must be TsTypeLiterals. Funcs
// have to be a very specific form of TsFnOrConstructorType, and Tuples need to
// be TsTupleTypes
#[derive(Debug, Clone, PartialEq)]
enum EnclosingType {
    Variant,
    Func,
    Record,
    Tuple,
}

impl WrongEnclosedType {
    pub fn error_from_ts_type_ref(sm_ts_type_ref: &SourceMapped<TsTypeRef>) -> Error {
        let original_location = sm_ts_type_ref.get_location();
        let name = sm_ts_type_ref.get_name();
        let name = match name.as_str() {
            _ if sm_ts_type_ref.alias_table.variant.contains(&name) => EnclosingType::Variant,
            _ if sm_ts_type_ref.alias_table.func.contains(&name) => EnclosingType::Func,
            _ if sm_ts_type_ref.alias_table.record.contains(&name) => EnclosingType::Record,
            _ if sm_ts_type_ref.alias_table.tuple.contains(&name) => EnclosingType::Tuple,
            _ => return InternalError::new().into(),
        };
        let (source, range) = match name {
            EnclosingType::Func => sm_ts_type_ref.get_func_source_and_range(),
            _ => (original_location.source, original_location.range),
        };
        let (modified_source, modified_range) = match name {
            EnclosingType::Variant => match sm_ts_type_ref.variant_wrong_enclosed_type_error() {
                Ok(value) => value,
                Err(err) => return err,
            },
            EnclosingType::Func => sm_ts_type_ref.get_func_suggestion_modifications(),
            _ => ("".to_string(), (0, 0)), // TODO make arms for tuple and record
        };

        Self {
            modified_source,
            modified_range,
            location: Location {
                source,
                range,
                ..original_location
            },
            name,
        }
        .into()
    }

    fn variant_wrong_enclosed_type_error(&self) -> CompilerOutput {
        let suggestion = Some(Suggestion {
            title: "Variants must have a type literal as the enclosed type.".to_string(),
            source: self.modified_source.clone(),
            range: self.modified_range,
            annotation: Some("Try wrapping your value in a type literal.".to_string()),
            import_suggestion: None,
        });
        CompilerOutput {
            title: "Invalid Variant".to_string(),
            location: self.location.clone(),
            annotation: "Must have type literal enclosed here.".to_string(),
            suggestion,
        }
    }

    fn record_wrong_enclosed_type_error(&self) -> CompilerOutput {
        let suggestion = Some(Suggestion {
            title: "Records must have a type literal as the enclosed type.".to_string(),
            source: self.modified_source.clone(),
            range: self.modified_range,
            annotation: Some("Try wrapping your value in a type literal.".to_string()),
            import_suggestion: None,
        });
        CompilerOutput {
            title: "Invalid Record".to_string(),
            location: self.location.clone(),
            annotation: "Must have type literal enclosed here.".to_string(),
            suggestion,
        }
    }

    fn tuple_wrong_enclosed_type_error(&self) -> CompilerOutput {
        CompilerOutput {
            title: "Invalid Record".to_string(),
            location: self.location.clone(),
            annotation: "Must have type literal enclosed here.".to_string(),
            suggestion: None,
        }
    }

    // TODO: 2 ways to improve this:
    //
    // 1. If the enclosed type is a TsFunc type, suggest that they wrap it in
    // `Oneway`, `Query`, or `Update` and show them what that would look like in
    // the example.
    //
    // 2. If the enclosed type is a TypeRef that contains a TsFunc, just with
    // the wrong name, we should only modify the name in the example, (rather
    // than nuking their function signature).
    fn func_wrong_enclosed_type_error(&self) -> CompilerOutput {
        CompilerOutput {
            title: "Invalid Func declaration".to_string(),
            location: self.location.clone(),
            annotation: "the type params here are invalid".to_string(),
            suggestion: Some(Suggestion {
                title:
                    "Funcs must have either Query, Update, or Oneway as the enclosed type. E.g.:"
                        .to_string(),
                range: self.modified_range,
                source: self.modified_source.clone(),
                annotation: None,
                import_suggestion: None,
            }),
        }
    }
}

impl std::error::Error for WrongEnclosedType {}

impl std::fmt::Display for WrongEnclosedType {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        let compiler_output = match self.name {
            EnclosingType::Variant => self.variant_wrong_enclosed_type_error(),
            EnclosingType::Func => self.func_wrong_enclosed_type_error(),
            EnclosingType::Record => self.record_wrong_enclosed_type_error(),
            EnclosingType::Tuple => self.tuple_wrong_enclosed_type_error(),
        };
        write!(f, "{}", compiler_output)
    }
}

impl From<WrongEnclosedType> for crate::Error {
    fn from(value: WrongEnclosedType) -> Self {
        Self::WrongEnclosedType(value)
    }
}

impl SourceMapped<'_, TsTypeRef> {
    fn variant_wrong_enclosed_type_error(&self) -> Result<SuggestionModifications, Error> {
        let example_variant = self.generate_example_variant()?;
        let modified_source = self
            .source_map
            .generate_modified_source(self.get_enclosed_span(), &example_variant);
        let modified_range = self
            .source_map
            .generate_modified_range(self.get_enclosed_span(), &example_variant);
        Ok((modified_source, modified_range))
    }

    fn get_func_suggestion_modifications(&self) -> SuggestionModifications {
        let example_func = "Update<() => void>".to_string();

        let (source, (start_pos, end_pos)) = self.get_func_source_and_range();

        let modified_source = format!(
            "{}{}{}",
            source[..start_pos + 1].to_string(),
            example_func,
            source[end_pos - 1..].to_string()
        );
        let modified_range = (start_pos + 1, start_pos + 1 + example_func.len());
        (modified_source, modified_range)
    }

    fn get_func_source_and_range(&self) -> (String, (usize, usize)) {
        let type_params_absolute_range = (self.get_enclosed_span().lo, self.get_enclosed_span().hi);
        let source = self
            .source_map
            .get_source_from_range(type_params_absolute_range);

        let start_pos = self.source_map.get_range(self.get_enclosed_span()).0;
        let offset = type_params_absolute_range.0.to_usize() - start_pos;
        let end_pos = self.get_enclosed_span().hi.to_usize() - offset;
        let range = (start_pos, end_pos);
        (source, range)
    }
}
