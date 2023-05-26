use annotate_snippets::{
    display_list::{DisplayList, FormatOptions},
    snippet::{Annotation, AnnotationType, Slice, Snippet, SourceAnnotation},
};
use std::fmt;

use super::{Location, Suggestion};

#[derive(Clone, Debug, PartialEq)]
pub struct CompilerOutput {
    pub title: String,
    pub annotation: String,
    pub suggestion: Option<Suggestion>,
    pub location: Location,
}

impl CompilerOutput {
    fn to_string(&self) -> String {
        let error_snippet = Snippet {
            title: Some(Annotation {
                label: Some(&self.title),
                id: None,
                annotation_type: AnnotationType::Error,
            }),
            footer: vec![],
            slices: vec![Slice {
                source: &self.location.source,
                line_start: self.location.line_number,
                origin: Some(&self.location.origin),
                fold: true,
                annotations: vec![SourceAnnotation {
                    label: &self.annotation,
                    annotation_type: AnnotationType::Error,
                    range: self.location.range,
                }],
            }],
            opt: FormatOptions {
                color: true,
                ..Default::default()
            },
        };

        match &self.suggestion {
            None => format!("{}", DisplayList::from(error_snippet)),
            Some(suggestion) => {
                let suggestion_slice = Slice {
                    source: &suggestion.source,
                    line_start: self.location.line_number,
                    origin: None,
                    fold: false,
                    annotations: vec![SourceAnnotation {
                        label: match &suggestion.annotation {
                            Some(annotation) => &annotation,
                            None => "",
                        },
                        annotation_type: AnnotationType::Help,
                        range: suggestion.range,
                    }],
                };
                let slices = match &suggestion.import_suggestion {
                    Some(import) => vec![
                        Slice {
                            source: &import,
                            line_start: 1,
                            origin: None,
                            annotations: vec![],
                            fold: false,
                        },
                        suggestion_slice,
                    ],
                    None => vec![suggestion_slice],
                };

                let suggestion_snippet = Snippet {
                    title: Some(Annotation {
                        label: Some(&suggestion.title),
                        id: None,
                        annotation_type: AnnotationType::Help,
                    }),
                    footer: vec![],
                    slices,
                    opt: FormatOptions {
                        color: true,
                        ..Default::default()
                    },
                };

                format!(
                    "{}\n{}",
                    DisplayList::from(error_snippet),
                    DisplayList::from(suggestion_snippet)
                )
            }
        }
    }
}

impl fmt::Display for CompilerOutput {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.to_string())
    }
}
