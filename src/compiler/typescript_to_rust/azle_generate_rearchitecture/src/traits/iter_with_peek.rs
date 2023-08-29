// The Pairs struct now works with borrowed items (&'a T)
pub struct Pairs<'a, T>
where
    T: 'a,
{
    inner: std::iter::Peekable<std::slice::Iter<'a, T>>,
    last: Option<&'a T>,
}

impl<'a, T> Pairs<'a, T> {
    pub fn new(mut iter: std::slice::Iter<'a, T>) -> Self {
        let last = iter.next();
        Self {
            inner: iter.peekable(),
            last,
        }
    }
}

// The Iterator implementation now yields borrowed items
impl<'a, T> Iterator for Pairs<'a, T> {
    type Item = (&'a T, Option<&'a T>);

    fn next(&mut self) -> Option<Self::Item> {
        if let Some(current) = self.last {
            self.last = self.inner.next();
            Some((current, self.last))
        } else {
            None
        }
    }
}

// The IterWithPeek trait now returns an iterator that yields borrowed items
pub trait IterWithPeek<T> {
    fn iter_with_peek(&self) -> Pairs<'_, T>;
}

// The implementation of IterWithPeek has been updated
impl<T, U> IterWithPeek<T> for U
where
    U: AsRef<[T]>,
{
    fn iter_with_peek(&self) -> Pairs<'_, T> {
        Pairs::new(self.as_ref().iter())
    }
}
