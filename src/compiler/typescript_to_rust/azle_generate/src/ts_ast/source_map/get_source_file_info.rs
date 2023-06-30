use std::borrow::Cow;

use swc_common::{source_map::Pos, BytePos, SourceMap, Span};

use super::{private_get_source_file_info::PrivateGetSourceFileInfo, Range};
use crate::{errors::Location, traits::GetSourceFileInfo};

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

    fn get_multi_line_range(&self, span: &Span, offset: usize) -> Range {
        (span.lo().to_usize() - offset, span.hi().to_usize() - offset)
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

    fn get_source_from_range(&self, range: (BytePos, BytePos)) -> String {
        let (start, end) = if range.0.to_usize() > range.1.to_usize() {
            println!(
                "Invalid range {:?}. End value ({}) is less than start value ({})",
                range,
                range.0.to_usize(),
                range.1.to_usize()
            );
            (BytePos::from_usize(0), BytePos::from_usize(0)) // TODO make the ranges more robust
        } else {
            range
        };

        let start_line_source_file_and_line = match self.lookup_line(start) {
            Ok(source_file_and_line) => source_file_and_line,
            Err(_) => return "".to_string(), // if we can't get the start line just return an empty string because there is no source found. TODO make this more robust
        };
        let source_file = start_line_source_file_and_line.sf;

        let start_line_number = start_line_source_file_and_line.line;
        let end_line_number = match self.lookup_line(end) {
            Ok(source_file_and_line) => source_file_and_line.line,
            Err(_) => start_line_number, // if we can't get the end line just use the start line. TODO make this more robust
        };

        let source_lines: Vec<String> = (start_line_number..=end_line_number)
            .map(|line_number| {
                match source_file.get_line(line_number) {
                    Some(line) => line.clone(),
                    None => Cow::from(""), // if we can't find one of the middle lines just fill it in with a black. TODO make this more robust
                }
                .to_string()
            })
            .collect();

        source_lines.join("\n")
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

    fn generate_source_with_range_replaced(
        &self,
        span: Span,
        range: Range,
        replacement: &str,
    ) -> String {
        let source = self.get_source(span);
        source
            .chars()
            .take(range.0)
            .chain(replacement.chars())
            .chain(source.chars().skip(range.1))
            .collect()
    }

    fn generate_modified_source(&self, span: Span, replacement: &str) -> String {
        format!(
            "{}{}{}",
            self.get_well_formed_line(span),
            replacement,
            self.get_well_formed_end_line(span)
        )
    }

    fn generate_modified_range(&self, span: Span, replacement: &str) -> Range {
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

    fn get_location(&self, span: Span) -> Location {
        Location {
            origin: self.get_origin(span),
            line_number: self.get_line_number(span),
            source: self.get_source(span),
            range: self.get_range(span),
        }
    }
}
