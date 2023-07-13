use cdk_framework::{
    act::node::{canister_method::QueryOrUpdateDefinition, CandidType, Param},
    traits::{CollectIterResults, CollectResults},
};
use swc_ecma_ast::TsType;

use crate::{
    canister_method::{query_and_update, AnnotatedFnDecl},
    ts_ast::SourceMapped,
    Error,
};

impl<'a> SourceMapped<'a, AnnotatedFnDecl> {
    pub fn to_definition(&self) -> Result<QueryOrUpdateDefinition, Vec<Error>> {
        let (body, params, return_type) = (
            query_and_update::generate_body(&self),
            self.build_params(),
            self.build_return_type(),
        )
            .collect_results()?;

        let guard_function_name = self.annotation.guard.clone();
        let name = self.get_function_name();

        Ok(QueryOrUpdateDefinition::new(
            self.is_promise(),
            self.is_manual(),
            guard_function_name,
            name,
            params,
            return_type,
            body,
        ))
    }

    pub fn build_params(&self) -> Result<Vec<Param>, Vec<Error>> {
        let (names, types) =
            (self.get_param_name_idents(), self.build_param_types()).collect_results()?;
        Ok(names
            .iter()
            .enumerate()
            .map(|(i, name)| Param {
                name: name.clone().to_string(),
                candid_type: types[i].clone(),
            })
            .collect())
    }

    // TODO why is this separated from get_name. It would be much simpler
    // imho to get the names and the params all in the same pass
    fn build_param_types(&self) -> Result<Vec<CandidType>, Vec<Error>> {
        let ts_type_to_candid_type = |ts_type: &TsType| self.spawn(ts_type).to_candid_type();
        self.get_param_ts_types()?
            .into_iter()
            .map(ts_type_to_candid_type)
            .collect_results()
    }

    fn build_return_type(&self) -> Result<CandidType, Vec<Error>> {
        self.spawn(self.get_return_ts_type()?).to_candid_type()
    }
}
