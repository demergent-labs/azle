use cdk_framework::act::node::canister_method::CanisterMethodType;

use crate::{
    canister_method::{errors::DuplicateSystemMethod, AnnotatedFnDecl},
    Error,
};

pub trait CheckLengthAndMap<OkValue> {
    fn check_length_and_map<F>(
        self,
        canister_method_type: CanisterMethodType,
        callback: F,
    ) -> Vec<Result<OkValue, Vec<Error>>>
    where
        F: Fn(&AnnotatedFnDecl) -> Result<OkValue, Vec<Error>>;
}

impl<'a, I, OkValue> CheckLengthAndMap<OkValue> for I
where
    I: Iterator<Item = &'a AnnotatedFnDecl<'a>> + Clone,
{
    fn check_length_and_map<F>(
        self,
        canister_method_type: CanisterMethodType,
        callback: F,
    ) -> Vec<Result<OkValue, Vec<Error>>>
    where
        F: Fn(&AnnotatedFnDecl) -> Result<OkValue, Vec<Error>>,
    {
        let results_list: Vec<_> = self.clone().map(callback).collect();

        if self.clone().count() > 1 {
            let duplicate_method_types_error: Error =
                DuplicateSystemMethod::from_annotated_fn_decls(
                    &self.collect::<Vec<_>>(),
                    canister_method_type,
                )
                .into();

            let mut new_results_list = vec![Err(vec![duplicate_method_types_error])];
            new_results_list.extend(results_list);
            new_results_list
        } else {
            results_list
        }
    }
}
