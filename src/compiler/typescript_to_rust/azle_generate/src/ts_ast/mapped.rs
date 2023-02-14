use swc_common::SourceMap;

pub struct Mapped<T> {
    inner: T,
    pub source_map: SourceMap, //TODO: Consider making this a ref
}

impl<T> Mapped<T> {
    pub fn new(inner: T, source_map: SourceMap) -> Self {
        Self { inner, source_map }
    }
}

impl<T> std::ops::Deref for Mapped<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.inner
    }
}

impl<T> std::ops::DerefMut for Mapped<T> {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.inner
    }
}
