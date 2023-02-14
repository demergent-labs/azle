use swc_common::SourceMap;

pub struct Mapped<'a, T> {
    inner: &'a T,
    pub source_map: &'a SourceMap,
}

impl<T> Mapped<'_, T> {
    pub fn new(inner: &T, source_map: &SourceMap) -> Self {
        Self { inner, source_map }
    }
}

impl<T> std::ops::Deref for Mapped<'_, T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.inner
    }
}

impl<T> std::ops::DerefMut for Mapped<'_, T> {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.inner
    }
}
