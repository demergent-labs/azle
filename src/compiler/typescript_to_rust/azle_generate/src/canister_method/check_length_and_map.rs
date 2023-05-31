use crate::Error;

pub trait CheckLengthAndMapTwo<OkValue, Node> {
    fn check_length_and_map<E, F>(
        &self,
        length_check: bool,
        length_error_generator: E,
        callback: F,
    ) -> Vec<Result<OkValue, Vec<Error>>>
    where
        F: Fn(&Node) -> Result<OkValue, Vec<Error>>,
        E: Fn(&Vec<Node>) -> Error;

    fn check_length_is_one_and_map<E, F>(
        &self,
        length_error_generator: E,
        callback: F,
    ) -> Result<OkValue, Vec<Error>>
    where
        F: Fn(&Node) -> Result<OkValue, Vec<Error>>,
        E: Fn(&Vec<Node>) -> Error + Clone;
}

impl<OkValue, Node> CheckLengthAndMapTwo<OkValue, Node> for Vec<Node> {
    fn check_length_and_map<E, F>(
        &self,
        meets_length_requirement: bool,
        length_error_generator: E,
        callback: F,
    ) -> Vec<Result<OkValue, Vec<Error>>>
    where
        F: Fn(&Node) -> Result<OkValue, Vec<Error>>,
        E: Fn(&Vec<Node>) -> Error,
    {
        let results_list: Vec<_> = self.clone().into_iter().map(callback).collect();

        if !meets_length_requirement {
            let length_error: Vec<Error> = length_error_generator(self).into();
            let length_result: Result<OkValue, _> = Err(length_error);

            vec![length_result]
                .into_iter()
                .chain(results_list)
                .collect()
        } else {
            results_list
        }
    }

    fn check_length_is_one_and_map<E, F>(
        &self,
        length_error_generator: E,
        callback: F,
    ) -> Result<OkValue, Vec<Error>>
    where
        F: Fn(&Node) -> Result<OkValue, Vec<Error>>,
        E: Fn(&Vec<Node>) -> Error + Clone,
    {
        match self
            .check_length_and_map(self.len() == 1, length_error_generator.clone(), callback)
            .pop()
        {
            Some(ok_value) => ok_value,
            None => Err(length_error_generator(self).into()),
        }
    }
}
