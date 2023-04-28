use crate::Error;

pub trait CollectResults<T> {
    fn collect_results(self) -> Result<T, Vec<Error>>;
}

impl<A> CollectResults<(A,)> for (Result<A, Vec<Error>>,)
where
    A: Clone,
{
    fn collect_results(self) -> Result<(A,), Vec<Error>> {
        let (a, a_errs) = (self.0.clone().ok(), self.0.err().unwrap_or_default());

        let errors = vec![a_errs].concat();

        if !errors.is_empty() {
            return Err(errors);
        }

        Ok((a.unwrap(),))
    }
}

impl<A, B> CollectResults<(A, B)> for (Result<A, Vec<Error>>, Result<B, Vec<Error>>)
where
    A: Clone,
    B: Clone,
{
    fn collect_results(self) -> Result<(A, B), Vec<Error>> {
        let (a, a_errs) = (self.0.clone().ok(), self.0.err().unwrap_or_default());
        let (b, b_errs) = (self.1.clone().ok(), self.1.err().unwrap_or_default());

        let errors = vec![a_errs, b_errs].concat();

        if !errors.is_empty() {
            return Err(errors);
        }

        Ok((a.unwrap(), b.unwrap()))
    }
}

impl<A, B, C> CollectResults<(A, B, C)>
    for (
        Result<A, Vec<Error>>,
        Result<B, Vec<Error>>,
        Result<C, Vec<Error>>,
    )
where
    A: Clone,
    B: Clone,
    C: Clone,
{
    fn collect_results(self) -> Result<(A, B, C), Vec<Error>> {
        let (a, a_errs) = (self.0.clone().ok(), self.0.err().unwrap_or_default());
        let (b, b_errs) = (self.1.clone().ok(), self.1.err().unwrap_or_default());
        let (c, c_errs) = (self.2.clone().ok(), self.2.err().unwrap_or_default());

        let errors = vec![a_errs, b_errs, c_errs].concat();

        if !errors.is_empty() {
            return Err(errors);
        }

        Ok((a.unwrap(), b.unwrap(), c.unwrap()))
    }
}

impl<A, B, C, D> CollectResults<(A, B, C, D)>
    for (
        Result<A, Vec<Error>>,
        Result<B, Vec<Error>>,
        Result<C, Vec<Error>>,
        Result<D, Vec<Error>>,
    )
where
    A: Clone,
    B: Clone,
    C: Clone,
    D: Clone,
{
    fn collect_results(self) -> Result<(A, B, C, D), Vec<Error>> {
        let (a, a_errs) = (self.0.clone().ok(), self.0.err().unwrap_or_default());
        let (b, b_errs) = (self.1.clone().ok(), self.1.err().unwrap_or_default());
        let (c, c_errs) = (self.2.clone().ok(), self.2.err().unwrap_or_default());
        let (d, d_errs) = (self.3.clone().ok(), self.3.err().unwrap_or_default());

        let errors = vec![a_errs, b_errs, c_errs, d_errs].concat();

        if !errors.is_empty() {
            return Err(errors);
        }

        Ok((a.unwrap(), b.unwrap(), c.unwrap(), d.unwrap()))
    }
}

impl<A, B, C, D, E> CollectResults<(A, B, C, D, E)>
    for (
        Result<A, Vec<Error>>,
        Result<B, Vec<Error>>,
        Result<C, Vec<Error>>,
        Result<D, Vec<Error>>,
        Result<E, Vec<Error>>,
    )
where
    A: Clone,
    B: Clone,
    C: Clone,
    D: Clone,
    E: Clone,
{
    fn collect_results(self) -> Result<(A, B, C, D, E), Vec<Error>> {
        let (a, a_errs) = (self.0.clone().ok(), self.0.err().unwrap_or_default());
        let (b, b_errs) = (self.1.clone().ok(), self.1.err().unwrap_or_default());
        let (c, c_errs) = (self.2.clone().ok(), self.2.err().unwrap_or_default());
        let (d, d_errs) = (self.3.clone().ok(), self.3.err().unwrap_or_default());
        let (e, e_errs) = (self.4.clone().ok(), self.4.err().unwrap_or_default());

        let errors = vec![a_errs, b_errs, c_errs, d_errs, e_errs].concat();

        if !errors.is_empty() {
            return Err(errors);
        }

        Ok((a.unwrap(), b.unwrap(), c.unwrap(), d.unwrap(), e.unwrap()))
    }
}

impl<A, B, C, D, E, F> CollectResults<(A, B, C, D, E, F)>
    for (
        Result<A, Vec<Error>>,
        Result<B, Vec<Error>>,
        Result<C, Vec<Error>>,
        Result<D, Vec<Error>>,
        Result<E, Vec<Error>>,
        Result<F, Vec<Error>>,
    )
where
    A: Clone,
    B: Clone,
    C: Clone,
    D: Clone,
    E: Clone,
    F: Clone,
{
    fn collect_results(self) -> Result<(A, B, C, D, E, F), Vec<Error>> {
        let (a, a_errs) = (self.0.clone().ok(), self.0.err().unwrap_or_default());
        let (b, b_errs) = (self.1.clone().ok(), self.1.err().unwrap_or_default());
        let (c, c_errs) = (self.2.clone().ok(), self.2.err().unwrap_or_default());
        let (d, d_errs) = (self.3.clone().ok(), self.3.err().unwrap_or_default());
        let (e, e_errs) = (self.4.clone().ok(), self.4.err().unwrap_or_default());
        let (f, f_errs) = (self.5.clone().ok(), self.5.err().unwrap_or_default());

        let errors = vec![a_errs, b_errs, c_errs, d_errs, e_errs, f_errs].concat();

        if !errors.is_empty() {
            return Err(errors);
        }

        Ok((
            a.unwrap(),
            b.unwrap(),
            c.unwrap(),
            d.unwrap(),
            e.unwrap(),
            f.unwrap(),
        ))
    }
}

impl<A, B, C, D, E, F, G> CollectResults<(A, B, C, D, E, F, G)>
    for (
        Result<A, Vec<Error>>,
        Result<B, Vec<Error>>,
        Result<C, Vec<Error>>,
        Result<D, Vec<Error>>,
        Result<E, Vec<Error>>,
        Result<F, Vec<Error>>,
        Result<G, Vec<Error>>,
    )
where
    A: Clone,
    B: Clone,
    C: Clone,
    D: Clone,
    E: Clone,
    F: Clone,
    G: Clone,
{
    fn collect_results(self) -> Result<(A, B, C, D, E, F, G), Vec<Error>> {
        let (a, a_errs) = (self.0.clone().ok(), self.0.err().unwrap_or_default());
        let (b, b_errs) = (self.1.clone().ok(), self.1.err().unwrap_or_default());
        let (c, c_errs) = (self.2.clone().ok(), self.2.err().unwrap_or_default());
        let (d, d_errs) = (self.3.clone().ok(), self.3.err().unwrap_or_default());
        let (e, e_errs) = (self.4.clone().ok(), self.4.err().unwrap_or_default());
        let (f, f_errs) = (self.5.clone().ok(), self.5.err().unwrap_or_default());
        let (g, g_errs) = (self.6.clone().ok(), self.6.err().unwrap_or_default());

        let errors = vec![a_errs, b_errs, c_errs, d_errs, e_errs, f_errs, g_errs].concat();

        if !errors.is_empty() {
            return Err(errors);
        }

        Ok((
            a.unwrap(),
            b.unwrap(),
            c.unwrap(),
            d.unwrap(),
            e.unwrap(),
            f.unwrap(),
            g.unwrap(),
        ))
    }
}
