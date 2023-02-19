use swc_common::SourceMap;

pub struct SourceMapped<'a, T> {
    inner: &'a T,
    pub source_map: &'a SourceMap,
}

impl<'a, T> SourceMapped<'a, T> {
    pub fn new(inner: &'a T, source_map: &'a SourceMap) -> Self {
        Self { inner, source_map }
    }
}

impl<T> std::ops::Deref for SourceMapped<'_, T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.inner
    }
}
