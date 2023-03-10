pub struct Suggestion {
    pub title: String,
    pub source: String,
    pub range: (usize, usize),
    pub annotation: Option<String>,
    pub import_suggestion: Option<String>,
}
