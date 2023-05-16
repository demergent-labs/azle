pub trait Prepend<T> {
    fn prepend(&self, item: T) -> Self;
}

impl<T: Clone> Prepend<T> for Vec<T> {
    fn prepend(&self, item: T) -> Self {
        std::iter::once(item).chain(self.iter().cloned()).collect()
    }
}
