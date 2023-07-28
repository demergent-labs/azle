use swc_common::SourceMap;

use crate::{
    errors::Location,
    traits::{GetSourceFileInfo, GetSourceInfo, GetSourceText, GetSpan},
    AliasTable,
};

pub struct SourceMapped<'a, T> {
    inner: T,
    pub source_map: &'a SourceMap,
    pub alias_table: &'a AliasTable,
    pub alias_list: &'a Vec<String>,
}

impl<'a, T> SourceMapped<'a, T>
where
    T: Clone,
{
    pub fn new(
        inner: &T,
        source_map: &'a SourceMap,
        alias_table: &'a AliasTable,
        alias_list: &'a Vec<String>,
    ) -> Self {
        Self {
            inner: inner.clone(),
            source_map,
            alias_table,
            alias_list,
        }
    }

    pub fn spawn<C>(&self, inner: &'a C) -> SourceMapped<C>
    where
        C: Clone,
    {
        SourceMapped {
            inner: inner.clone(),
            source_map: self.source_map,
            alias_table: self.alias_table,
            alias_list: self.alias_list,
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
            alias_table: self.alias_table,
            alias_list: self.alias_list,
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
