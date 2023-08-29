use swc_ecma_ast::{Module, ModuleItem};

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

pub trait IterWithPeek {
    fn iter_with_peek(&self) -> Pairs<std::slice::Iter<'_, ModuleItem>>;
}

impl IterWithPeek for Module {
    fn iter_with_peek(&self) -> Pairs<std::slice::Iter<'_, ModuleItem>> {
        Pairs::new(self.body.iter())
    }
}
