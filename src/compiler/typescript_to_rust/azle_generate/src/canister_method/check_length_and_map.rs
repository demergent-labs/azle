use cdk_framework::act::node::canister_method::CanisterMethodType;

use crate::{
    canister_method::{errors::DuplicateSystemMethod, AnnotatedFnDecl},
    Error,
};

pub trait CheckLengthAndMapForAnnFnDecl<'a, OkValue> {
    fn check_length_and_map<F>(
        &'a self,
        canister_method_type: CanisterMethodType,
        callback: F,
    ) -> Vec<Result<OkValue, Vec<Error>>>
    where
        F: Fn(&'a AnnotatedFnDecl<'a>) -> Result<OkValue, Vec<Error>>;
}

impl<'a, OkValue> CheckLengthAndMapForAnnFnDecl<'a, OkValue> for Vec<&AnnotatedFnDecl<'_>> {
    fn check_length_and_map<F>(
        &'a self,
        canister_method_type: CanisterMethodType,
        callback: F,
    ) -> Vec<Result<OkValue, Vec<Error>>>
    where
        F: Fn(&'a AnnotatedFnDecl<'a>) -> Result<OkValue, Vec<Error>>,
    {
        let results_list: Vec<_> = self.clone().into_iter().map(callback).collect();

        if self.len() > 1 {
            let duplicate_method_types_error: Error =
                DuplicateSystemMethod::from_annotated_fn_decls(&self, canister_method_type).into();

            let mut new_results_list = vec![Err(vec![duplicate_method_types_error])];
            new_results_list.extend(results_list);
            new_results_list
        } else {
            results_list
        }
    }
}

// pub trait CheckLengthAndMapForAnnFnDecl<'a> {
//     fn check_length_and_map<F>(
//         &'a self,
//         canister_method_type: CanisterMethodType,
//         callback: F,
//     ) -> Vec<Result<&'a AnnotatedFnDecl, Vec<Error>>>
//     where
//         F: Fn(&'a AnnotatedFnDecl<'a>) -> Result<&'a AnnotatedFnDecl<'a>, Vec<Error>>;
// }

// impl<'a> CheckLengthAndMapForAnnFnDecl<'a> for Vec<&AnnotatedFnDecl<'_>> {
//     fn check_length_and_map<F>(
//         &'a self,
//         canister_method_type: CanisterMethodType,
//         callback: F,
//     ) -> Vec<Result<&'a AnnotatedFnDecl, Vec<Error>>>
//     where
//         F: Fn(&'a AnnotatedFnDecl<'a>) -> Result<&'a AnnotatedFnDecl<'a>, Vec<Error>>,
//     {
//         let results_list: Vec<_> = self.clone().into_iter().map(callback).collect();

//         if self.len() > 1 {
//             let duplicate_method_types_error: Error =
//                 DuplicateSystemMethod::from_annotated_fn_decls(&self, canister_method_type).into();

//             let mut new_results_list = vec![Err(vec![duplicate_method_types_error])];
//             new_results_list.extend(results_list);
//             new_results_list
//         } else {
//             results_list
//         }
//     }
// }

// impl<OkValue> CheckLengthAndMap<OkValue> for Vec<&AnnotatedFnDecl<'_>> {
//     fn check_length_and_map<F>(
//         &self,
//         canister_method_type: CanisterMethodType,
//         callback: F,
//     ) -> Vec<Result<OkValue, Vec<Error>>>
//     where
//         F: Fn(&AnnotatedFnDecl) -> Result<OkValue, Vec<Error>>,
//     {
//         let results_list: Vec<_> = self.clone().into_iter().map(callback).collect();

//         if self.len() > 1 {
//             let duplicate_method_types_error: Error =
//                 DuplicateSystemMethod::from_annotated_fn_decls(&self, canister_method_type).into();

//             let mut new_results_list = vec![Err(vec![duplicate_method_types_error])];
//             new_results_list.extend(results_list);
//             new_results_list
//         } else {
//             results_list
//         }
//     }
// }

// pub trait CheckLengthAndMap<OkValue> {
//     fn check_length_and_map<F>(
//         &'1 self: Vec<&'2 AnnotatedFnDecl>,
//         canister_method_type: CanisterMethodType,
//         callback: F,
//     ) -> Vec<Result<OkValue, Vec<Error>>>
//     where
//         F: Fn(&AnnotatedFnDecl) -> Result<OkValue, Vec<Error>>;
// }
