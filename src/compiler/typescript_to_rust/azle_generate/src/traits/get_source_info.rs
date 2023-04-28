pub trait GetSourceInfo {
    fn get_source(&self) -> String;
    fn get_line_number(&self) -> usize;
    fn get_origin(&self) -> String;
    fn get_range(&self) -> (usize, usize);
}
