use swc_common::{Loc, SourceMap, Span};

pub trait GetSourceFileInfo {
    fn get_span_text(&self, span: Span) -> String;
    fn get_file_name(&self, span: Span) -> String;
    fn get_line_info(&self, span: Span) -> String;
    fn get_line(&self, span: Span) -> String;
    fn get_line_number(&self, span: Span) -> usize;
    fn generate_line_highlight(&self, span: Span) -> String;
    fn generate_highlighted_line(&self, span: Span) -> String;
    fn get_well_formed_line(&self, span: Span) -> String;
}

trait PrivateGetSourceFileInfo {
    fn get_loc(&self, span: Span) -> Loc;
    fn get_start_col(&self, span: Span) -> usize;
    fn get_end_col(&self, span: Span) -> usize;
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
}

impl GetSourceFileInfo for SourceMap {
    fn get_span_text(&self, span: Span) -> String {
        let line = self.get_line(span);
        line[self.get_start_col(span)..self.get_end_col(span)].to_string()
    }

    fn get_line_info(&self, span: Span) -> String {
        let loc = self.get_loc(span);
        let file_name = self.get_file_name(span);
        let line_number = loc.line;
        let col_number = loc.col_display;
        format!("{}:{}:{}", file_name, line_number, col_number)
    }

    fn get_line(&self, span: Span) -> String {
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
            self.get_line(span),
            self.generate_line_highlight(span)
        )
    }

    fn generate_line_highlight(&self, span: Span) -> String {
        let line = self.get_line(span);
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

    fn get_well_formed_line(&self, span: Span) -> String {
        let line = self.get_line(span);
        line[..self.get_start_col(span)].to_string()
    }

    fn get_file_name(&self, span: Span) -> String {
        let loc = self.get_loc(span);
        loc.file.name.to_string()
    }

    fn get_line_number(&self, span: Span) -> usize {
        let loc = self.get_loc(span);
        loc.line
    }
}
