/// An iterator with a peek-ahead feature.
///
/// Rather than yielding just the current element, this iterator will
/// yield a tuple containing the current element and the next element.
/// The final yield will always have `None` as it's "next" element.
pub struct PeekAheadIterator<'a, T>
where
    T: 'a,
{
    inner: std::iter::Peekable<std::slice::Iter<'a, T>>,
    current: Option<&'a T>,
}

impl<'a, T> PeekAheadIterator<'a, T> {
    pub fn new(mut iter: std::slice::Iter<'a, T>) -> Self {
        let current = iter.next();
        Self {
            inner: iter.peekable(),
            current,
        }
    }
}

impl<'a, T> Iterator for PeekAheadIterator<'a, T> {
    type Item = (&'a T, Option<&'a T>);

    fn next(&mut self) -> Option<Self::Item> {
        if let Some(current) = self.current {
            self.current = self.inner.next();
            Some((current, self.current))
        } else {
            None
        }
    }
}

pub trait IterWithPeek<T> {
    fn iter_with_peek(&self) -> PeekAheadIterator<'_, T>;
}

impl<T, U> IterWithPeek<T> for U
where
    U: AsRef<[T]>,
{
    /// Returns an iterator over the slice.
    ///
    /// The iterator yields a tuple containing the current item and an
    /// optional next item.
    fn iter_with_peek(&self) -> PeekAheadIterator<'_, T> {
        PeekAheadIterator::new(self.as_ref().iter())
    }
}
