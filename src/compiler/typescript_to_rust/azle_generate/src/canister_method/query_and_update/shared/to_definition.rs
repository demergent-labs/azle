use cdk_framework::{
    act::node::{canister_method::QueryOrUpdateDefinition, CandidType, Param},
    traits::CollectResults,
};

use crate::{
    canister_method::{query_and_update, AnnotatedFnDecl},
    errors::CollectResults as OtherCollectResults,
    ts_ast::SourceMapped,
    Error,
};

impl<'a> SourceMapped<'a, AnnotatedFnDecl> {
    pub fn to_definition(&self) -> Result<QueryOrUpdateDefinition, Vec<Error>> {
        let (body, is_async, is_manual, params, return_type) = (
            query_and_update::generate_body(&self),
            self.is_promise().map_err(Error::into),
            self.is_manual().map_err(Error::into),
            self.build_params(),
            self.build_return_type(),
        )
            .collect_results()?;

        let guard_function_name = self.annotation.guard.clone();
        let name = self.get_function_name();

        Ok(QueryOrUpdateDefinition::new(
            is_async,
            is_manual,
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
        self.get_param_ts_types()?
            .into_iter()
            .map(|ts_type| {
                SourceMapped::new(ts_type, self.source_map, self.symbol_table).to_candid_type()
            })
            .collect_results()
    }

    fn build_return_type(&self) -> Result<CandidType, Vec<Error>> {
        SourceMapped::new(
            self.get_return_ts_type()?,
            self.source_map,
            self.symbol_table,
        )
        .to_candid_type()
    }
}
