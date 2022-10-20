use swc_common::{Loc, SourceMap, Span};

pub type Range = (usize, usize);

pub trait GetSourceFileInfo {
    fn get_text(&self, span: Span) -> String;
    fn get_origin(&self, span: Span) -> String;
    fn get_source(&self, span: Span) -> String;
    fn get_line_number(&self, span: Span) -> usize;
    fn generate_line_highlight(&self, span: Span) -> String;
    fn generate_highlighted_line(&self, span: Span) -> String;
    fn get_range(&self, span: Span) -> Range;
    fn generate_modified_source(&self, span: Span, replacement: &String) -> String;
    fn generate_modified_range(&self, span: Span, replacement: &String) -> (usize, usize);
}

trait PrivateGetSourceFileInfo {
    fn get_loc(&self, span: Span) -> Loc;
    fn get_start_col(&self, span: Span) -> usize;
    fn get_end_col(&self, span: Span) -> usize;
    fn get_well_formed_end_line(&self, span: Span) -> String;
    fn get_well_formed_line(&self, span: Span) -> String;
}

impl PrivateGetSourceFileInfo for SourceMap {
    fn get_loc(&self, span: Span) -> Loc {
        self.lookup_char_pos(span.lo)
    }

    fn get_start_col(&self, span: Span) -> usize {
        let loc = self.lookup_char_pos(span.lo);
        loc.col_display
    }

    fn get_end_col(&self, span: Span) -> usize {
        let loc = self.lookup_char_pos(span.hi);
        loc.col_display
    }

    fn get_well_formed_end_line(&self, span: Span) -> String {
        let line = self.get_source(span);
        line[self.get_end_col(span)..].to_string()
    }

    fn get_well_formed_line(&self, span: Span) -> String {
        let line = self.get_source(span);
        line[..self.get_start_col(span)].to_string()
    }
}

impl GetSourceFileInfo for SourceMap {
    fn get_text(&self, span: Span) -> String {
        let line = self.get_source(span);
        line[self.get_start_col(span)..self.get_end_col(span)].to_string()
    }

    fn get_range(&self, span: Span) -> Range {
        let start = self.get_start_col(span);
        let end = self.get_end_col(span);
        (start, end)
    }

    fn get_source(&self, span: Span) -> String {
        let line_result = self.lookup_line(span.lo);
        match line_result {
            Ok(source_file_and_line) => {
                let line_number = source_file_and_line.line;
                match source_file_and_line.sf.get_line(line_number) {
                    Some(line) => line.to_string(),
                    None => "Unable to find line in source code".to_string(),
                }
            }
            Err(_) => "Unable to find line in source code".to_string(),
        }
    }

    fn generate_highlighted_line(&self, span: Span) -> String {
        format!(
            "{}\n{}",
            self.get_source(span),
            self.generate_line_highlight(span)
        )
    }

    fn generate_line_highlight(&self, span: Span) -> String {
        let line = self.get_source(span);
        let start = self.get_start_col(span);
        let end = self.get_end_col(span);

        let mut highlight = String::new();

        for i in 0..line.len() {
            if i >= start && i < end {
                highlight.push('^');
            } else {
                highlight.push(' ');
            }
        }

        highlight
    }

    fn generate_modified_source(&self, span: Span, replacement: &String) -> String {
        format!(
            "{}{}{}",
            self.get_well_formed_line(span),
            replacement,
            self.get_well_formed_end_line(span)
        )
    }

    fn generate_modified_range(&self, span: Span, replacement: &String) -> (usize, usize) {
        (
            self.get_start_col(span),
            self.get_start_col(span) + replacement.len(),
        )
    }

    fn get_origin(&self, span: Span) -> String {
        let loc = self.get_loc(span);
        loc.file.name.to_string()
    }

    fn get_line_number(&self, span: Span) -> usize {
        let loc = self.get_loc(span);
        loc.line
    }
}
