use swc_common::source_map::Pos;
use swc_ecma_ast::TsTypeRef;

use crate::{
    errors::{CompilerOutput, Location, Suggestion},
    internal_error,
    traits::{GetNameWithError, GetSourceFileInfo, GetSourceInfo},
    ts_ast::SourceMapped,
    Error,
};

#[derive(Debug, Clone, PartialEq)]
pub struct WrongEnclosedType {
    compiler_output: CompilerOutput,
}

impl WrongEnclosedType {
    pub fn error_from_ts_type_ref(sm_ts_type_ref: &SourceMapped<TsTypeRef>) -> Error {
        Self {
            compiler_output: match sm_ts_type_ref.wrong_enclosed_type_error() {
                Ok(compiler_output) => compiler_output,
                Err(err) => return err,
            },
        }
        .into()
    }
}

impl std::error::Error for WrongEnclosedType {}

impl std::fmt::Display for WrongEnclosedType {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl From<WrongEnclosedType> for crate::Error {
    fn from(value: WrongEnclosedType) -> Self {
        Self::WrongEnclosedType(value)
    }
}

impl SourceMapped<'_, TsTypeRef> {
    pub fn wrong_enclosed_type_error(&self) -> Result<CompilerOutput, Error> {
        Ok(match self.get_name()? {
            "Variant" => self.variant_wrong_enclosed_type_error()?,
            "Func" => self.func_wrong_enclosed_type_error(),
            _ => internal_error!(),
        })
    }

    fn variant_wrong_enclosed_type_error(&self) -> Result<CompilerOutput, Error> {
        let example_variant = self.generate_example_variant()?;
        let modified_source = self
            .source_map
            .generate_modified_source(self.get_enclosed_span(), &example_variant);
        let suggestion = Some(Suggestion {
            title: "Variants must have a type literal as the enclosed type.".to_string(),
            range: self
                .source_map
                .generate_modified_range(self.get_enclosed_span(), &example_variant),
            source: modified_source,
            annotation: Some("Try wrapping your value in a type literal.".to_string()),
            import_suggestion: None,
        });
        Ok(CompilerOutput {
            title: "Invalid Variant".to_string(),
            location: Location {
                origin: self.get_origin(),
                line_number: self.get_line_number(),
                source: self.get_source(),
                range: self.source_map.get_range(self.get_enclosed_span()),
            },
            annotation: "Must have type literal enclosed here.".to_string(),
            suggestion,
        })
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
        let example_func = "Update<() => void>".to_string();

        let type_params_absolute_range = (self.get_enclosed_span().lo, self.get_enclosed_span().hi);
        let source = self
            .source_map
            .get_source_from_range(type_params_absolute_range);

        let start_pos = self.source_map.get_range(self.get_enclosed_span()).0;
        let offset = type_params_absolute_range.0.to_usize() - start_pos;
        let end_pos = self.get_enclosed_span().hi.to_usize() - offset;
        let range = (start_pos, end_pos);

        let modified_source = format!(
            "{}{}{}",
            source[..start_pos + 1].to_string(),
            example_func,
            source[end_pos - 1..].to_string()
        );

        CompilerOutput {
            title: "Invalid Func declaration".to_string(),
            location: Location {
                origin: self.get_origin(),
                line_number: self.get_line_number(),
                source,
                range,
            },
            annotation: "the type params here are invalid".to_string(),
            suggestion: Some(Suggestion {
                title:
                    "Funcs must have either Query, Update, or Oneway as the enclosed type. E.g.:"
                        .to_string(),
                range: (start_pos + 1, start_pos + 1 + example_func.len()),
                source: modified_source,
                annotation: None,
                import_suggestion: None,
            }),
        }
    }
}
