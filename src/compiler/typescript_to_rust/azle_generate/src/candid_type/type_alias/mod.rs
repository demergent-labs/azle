use cdk_framework::act::node::candid::TypeAlias;
use swc_ecma_ast::{TsEntityName, TsType, TsTypeAliasDecl, TsTypeRef};

use crate::{traits::GetName, ts_ast::SourceMapped, Error};

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_type_alias(&self) -> Result<Option<TypeAlias>, Vec<Error>> {
        let type_alias_name = self.id.get_name();
        // If the thing on the right hand side is not a type ref then we don't
        // need to consider it. The type aliases that we are going to be passing
        // to rust are going to be aliases to developer defined types. Like
        // custom Records and Variants. All of those will be TsTypeRefs. Any
        // type_aliases to ts primitives should be taken care of in the alias
        // table.
        let type_ref = match &*self.type_ann {
            TsType::TsTypeRef(ts_type_ref) => self.spawn(ts_type_ref),
            _ => return Ok(None),
        };
        // We do want to allow things like
        // export type MyBoolVec = azle.Vec<boolean>
        // So we want to allow type refs like azle.Vec but not anything like
        // azle.Manual. That wouldn't make any sense for a type alias. So we
        // filter all of those out
        if !self.alias_table.is_aliasable(&type_ref.get_name()) {
            return Ok(None);
        }
        // We also want to make sure that the type_alias name (the left hand
        // side of the type alias decl) is not in the alias table. If it is in
        // the alias table then the right hand side doesn't really matter
        // because it means that the right hand side mapped to an azle type.
        // This comes into play if the right hand side is something like a
        // qualified name. In this case the right hand side itself might not
        // have made it into table because it was only ever an intermediate step
        // on the path to determining if the type_alias_name should have been in
        // the alias table
        if self.alias_table.search(&type_alias_name) {
            return Ok(None);
        }

        // Try and convert the right hand side to a candid type. If you can
        // great it might be something we need to make an alias for. If not then
        // lets not bother with it.
        let aliased_type = match type_ref.to_candid_type() {
            Ok(candid_type) => Box::from(candid_type),
            Err(_) => return Ok(None),
        };

        // Finally make sure that the type_alias_name is in the list of possible
        // Type aliases
        if !self.alias_list.contains(&type_alias_name) {
            return Ok(None);
        }

        // After all checks are complete, create and return the type alias
        return Ok(Some(TypeAlias {
            name: type_alias_name,
            aliased_type,
            type_params: self.get_type_params()?.into(),
        }));
    }

    /**
     * The point of this function is to help filter out things that look like
     * they might be records, variant, tuples, or funcs but are actually members
     * of the alias table.
     * For example:
     * export type MyRecordDecorator<T> = azle.Record<T>;
     * is not a record and should not be put into the CandidTypes.records list.
     * For right now lets only use it as such.
     *
     * So the only thing this should be doing is checking to see that all of the
     * type args are generics and all of them are defined in the
     */
    pub fn is_something_that_could_be_in_the_alias_table(&self) -> bool {
        let type_params: Vec<_> = self
            .type_params
            .iter()
            .flat_map(|ts_type_param_decl| ts_type_param_decl.params.clone())
            .map(|ts_type_param| ts_type_param.name.get_name())
            .collect();
        let type_args: Vec<_> = match &*self.type_ann {
            TsType::TsTypeRef(ts_type_ref) => ts_type_ref
                .type_params
                .iter()
                .flat_map(|thing| thing.params.clone())
                .map(|boxed_type| *boxed_type)
                .collect(),
            _ => vec![],
        };
        if type_params.len() != type_args.len() {
            return false;
        }
        let type_args_are_generics = type_args.iter().all(|ts_type| {
            if let TsType::TsTypeRef(type_ref) = ts_type {
                if let TsEntityName::Ident(name) = &type_ref.type_name {
                    return type_params.contains(&name.get_name());
                }
            }
            false
        });
        type_args_are_generics
    }

    pub fn process_ts_type_ref<F, T>(
        &self,
        type_names: &Vec<String>,
        handler: F,
    ) -> Result<Option<T>, Vec<Error>>
    where
        F: Fn(SourceMapped<TsTypeRef>) -> Result<T, Vec<Error>>,
    {
        match &*self.type_ann {
            TsType::TsTypeRef(ts_type_ref) => {
                let name = ts_type_ref.type_name.get_name();
                if type_names.contains(&name) {
                    let type_ref = self.spawn(ts_type_ref);
                    handler(type_ref).map(Some)
                } else {
                    Ok(None)
                }
            }
            _ => Ok(None),
        }
    }
}
