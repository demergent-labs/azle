pub trait GetSourceInfo {
    fn get_line(&self) -> String;
    fn get_line_number(&self) -> usize;
    fn get_file_name(&self) -> String;
    fn get_range(&self) -> (usize, usize);
}
