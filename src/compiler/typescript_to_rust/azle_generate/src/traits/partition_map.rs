pub trait PartitionMap<T, E> {
    fn partition_map<F, OkT, ErrT>(&self, f: F) -> (Vec<OkT>, Vec<ErrT>)
    where
        F: FnMut(&T) -> Result<OkT, ErrT>;
}

impl<T, E> PartitionMap<T, E> for Vec<T> {
    fn partition_map<F, OkT, ErrT>(&self, mut f: F) -> (Vec<OkT>, Vec<ErrT>)
    where
        F: FnMut(&T) -> Result<OkT, ErrT>,
    {
        let mut ok_values = Vec::new();
        let mut err_values = Vec::new();

        for item in self.iter() {
            match f(item) {
                Ok(ok_value) => ok_values.push(ok_value),
                Err(err_value) => err_values.push(err_value),
            }
        }

        (ok_values, err_values)
    }
}
