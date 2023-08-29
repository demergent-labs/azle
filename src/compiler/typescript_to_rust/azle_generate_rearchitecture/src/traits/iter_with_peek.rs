pub struct Pairs<I>
where
    I: Iterator,
    I::Item: Clone,
{
    inner: std::iter::Peekable<I>,
    last: Option<I::Item>,
}

impl<I> Pairs<I>
where
    I: Iterator,
    I::Item: Clone,
{
    pub fn new(mut iter: I) -> Self {
        let last = iter.next();
        Self {
            inner: iter.peekable(),
            last,
        }
    }
}

impl<I> Iterator for Pairs<I>
where
    I: Iterator,
    I::Item: Clone,
{
    type Item = (I::Item, Option<I::Item>);

    fn next(&mut self) -> Option<Self::Item> {
        if let Some(current) = self.last.take() {
            self.last = self.inner.next();
            Some((current, self.last.clone()))
        } else {
            None
        }
    }
}

pub trait IterWithPeek<T> {
    fn iter_with_peek(&self) -> Pairs<std::slice::Iter<'_, T>>
    where
        T: Clone;
}

impl<T, U> IterWithPeek<T> for U
where
    U: AsRef<[T]>,
    T: Clone,
{
    fn iter_with_peek(&self) -> Pairs<std::slice::Iter<'_, T>>
    where
        T: Clone,
    {
        Pairs::new(self.as_ref().iter())
    }
}
