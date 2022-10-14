pub struct ErrorWithExampleDiff<'a> {
    pub error: &'a str,
    pub help: &'a str,
    pub remove: &'a str,
    pub add: &'a str,
}

impl<'a> ErrorWithExampleDiff<'a> {
    pub fn to_string(&'a self) -> String {
        format!(
            "{}\n\nHelp: {}\n\nExample:\n-|    {}\n+|    {}",
            self.error, self.help, self.remove, self.add
        )
    }
}
