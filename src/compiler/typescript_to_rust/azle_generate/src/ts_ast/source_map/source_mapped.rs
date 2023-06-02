use swc_common::SourceMap;

use crate::{
    errors::Location,
    traits::{GetSourceFileInfo, GetSourceInfo, GetSourceText, GetSpan},
    SymbolTable,
};

pub struct SourceMapped<'a, T> {
    inner: T,
    pub source_map: &'a SourceMap,
    pub symbol_table: &'a SymbolTable,
}

impl<'a, T> SourceMapped<'a, T>
where
    T: Clone,
{
    pub fn new(inner: &T, source_map: &'a SourceMap, symbol_table: &'a SymbolTable) -> Self {
        Self {
            inner: inner.clone(),
            source_map,
            symbol_table,
        }
    }

    pub fn new_special(inner: T, source_map: &'a SourceMap, symbol_table: &'a SymbolTable) -> Self {
        Self {
            inner: inner.clone(),
            source_map,
            symbol_table,
        }
    }

    pub fn new_from_parent<P>(inner: &'a T, parent: &'a SourceMapped<P>) -> Self {
        Self {
            inner: inner.clone(),
            source_map: parent.source_map,
            symbol_table: parent.symbol_table,
        }
    }
}

impl<'a, T> Clone for SourceMapped<'a, T>
where
    T: Clone,
{
    fn clone(&self) -> Self {
        Self {
            inner: self.inner.clone(),
            source_map: self.source_map,
            symbol_table: self.symbol_table,
        }
    }
}

impl<T> std::ops::Deref for SourceMapped<'_, T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.inner
    }
}

impl<T> GetSourceInfo for SourceMapped<'_, T>
where
    T: GetSpan,
{
    fn get_range(&self) -> (usize, usize) {
        self.source_map.get_range(self.get_span())
    }

    fn get_source(&self) -> String {
        let span = self.get_span();
        self.source_map.get_source_from_range((span.lo, span.hi))
    }

    fn get_origin(&self) -> String {
        self.source_map.get_origin(self.get_span())
    }

    fn get_line_number(&self) -> usize {
        self.source_map.get_line_number(self.get_span())
    }

    fn get_location(&self) -> Location {
        Location {
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
        }
    }
}

impl<T> GetSourceText for SourceMapped<'_, T>
where
    T: GetSpan,
{
    fn get_source_text(&self) -> String {
        self.source_map.get_text(self.get_span())
    }
}
