use annotate_snippets::{
    display_list::{DisplayList, FormatOptions},
    snippet::{Annotation, AnnotationType, Slice, Snippet, SourceAnnotation},
};
use std::fmt;

pub struct Suggestion {
    pub title: String,
    pub source: String,
    pub range: (usize, usize),
}

pub struct ErrorMessage {
    pub title: String,
    pub origin: String,
    pub line_number: usize,
    pub source: String,
    pub range: (usize, usize),
    pub annotation: String,
    pub suggestion: Option<Suggestion>,
}

impl ErrorMessage {
    fn to_string(&self) -> String {
        let error_snippet = Snippet {
            title: Some(Annotation {
                label: Some(&self.title),
                id: None,
                annotation_type: AnnotationType::Error,
            }),
            footer: vec![],
            slices: vec![Slice {
                source: &self.source,
                line_start: self.line_number,
                origin: Some(&self.origin),
                fold: true,
                annotations: vec![SourceAnnotation {
                    label: &self.annotation,
                    annotation_type: AnnotationType::Error,
                    range: self.range,
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
                let suggestion_snippet = Snippet {
                    title: Some(Annotation {
                        label: Some(&suggestion.title),
                        id: None,
                        annotation_type: AnnotationType::Help,
                    }),
                    footer: vec![],
                    slices: vec![Slice {
                        source: &suggestion.source,
                        line_start: self.line_number,
                        origin: None,
                        fold: true,
                        annotations: vec![SourceAnnotation {
                            label: "",
                            annotation_type: AnnotationType::Help,
                            range: suggestion.range,
                        }],
                    }],
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

impl fmt::Display for ErrorMessage {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.to_string())
    }
}
