pub struct Location {
    pub origin: String,
    pub line_number: usize,
    pub source: String,
    pub range: (usize, usize),
}
