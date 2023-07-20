use cdk_framework::act::node::candid::TypeAlias;
use swc_ecma_ast::{TsEntityName, TsType, TsTypeAliasDecl, TsTypeRef};

use crate::{traits::GetName, ts_ast::SourceMapped, Error};

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_type_alias(&self) -> Result<Option<TypeAlias>, Vec<Error>> {
        let type_alias_name = self.id.get_name();
        if type_alias_name == "SuperAlias" {
            println!("We are here")
        }
        // We don't want to process things like:
        // export type RecordAlias<T> = azle.Record<T>
        // Things like that should be in the alias table and not in the list of
        // type aliases we pass to the cdk_framework. Their aliaseness will be
        // taken into account when looking to see if the type_ref name is in the
        // AliasTable and does not need to ever be processed beyond that.
        if self.is_something_that_could_be_in_the_alias_table() {
            if type_alias_name == "SuperAlias" {
                println!("SuperAlias was in the alias table?!")
            }
            // TODO I am trying to get rid of this. Because anything that should
            // be out of here because it looks like RecordAlias<T> also wont
            // make it past the is_aliasable check. And this check is getting
            // rid of some things that we need
            // return Ok(None);
        }
        // Next if the thing on the other side is not a type ref then we don't
        // need to consider it either. The type aliases that we are going to be
        // passing to rust are going to be aliases to developer defined types.
        // Like custom Records and Variants. All of those well be TsTypeRefs.
        // Any type_aliases that are to ts primitives should be taken care of
        // in the alias table.
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
        // We also want to make sure that the type_alias name is not in the
        // alias table. If it is in the alias table then the right hand side doesn't really matter
        // because it means that the right hand side mapped to a azle type.
        // This comes into play if the right hand side is something like a
        // qualified name. In this case the right hand side itself might not
        // have made it into table because it was only ever an intermediate step
        // on the path to determining if the type_alias_name should have been in
        // the alias table
        if self.alias_table.search(&type_alias_name) {
            return Ok(None);
        }
        let type_params = self.get_type_params()?.into();
        // TODO: This isn't quite working because we are pulling in stuff that are azle things that we don't want
        // Specifically blob and RequireExactlyOne. blob isn't in the alias table because we don't use it in this file. Require exactly one is a partial variant that we don't finish defining...
        // So even a check for things that lead back to azle would be no good. But on the other hand. Those wouldn't get added beacuse they are in azle...
        // Final step is to make sure that the alias is something that we care
        // about. We don't want to pull in every alias under the sun.
        // TODO Here is a quick and dirty solution. Try and convert the right
        // hand side to a candid type. If you can great it might be something we
        // need to make an alias for. If not then lets not bother for right now.
        // In the future maybe we want to plan for this and warn them... but I
        // think in order to effectively do that we would have to be much more
        // selective. Right now I think there would be too many things that make
        // this return None
        // TODO another possible solution is to make a list of all possible
        // aliases to anything candid related. That kind of filter might be a
        // good start.
        let aliased_type = match type_ref.to_candid_type() {
            Ok(candid_type) => Box::from(candid_type),
            Err(_) => return Ok(None),
        };
        if !self.alias_list.contains(&type_alias_name) {
            return Ok(None);
        }
        println!("{:#?}", self.alias_list);
        return Ok(Some(TypeAlias {
            name: type_alias_name,
            aliased_type,
            type_params,
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
        // let type_alias_name = self.id.get_name();
        // let type_ref = match &*self.type_ann {
        //     TsType::TsTypeRef(ts_type_ref) => self.spawn(ts_type_ref),
        //     _ => return false,
        // };
        // if !self.alias_table.search(&type_ref.get_name())
        //     && !self.alias_table.search(&type_alias_name)
        //     && (type_ref.get_name() == "Result"
        //         || type_ref.get_name() == "Vec"
        //         || type_ref.get_name() == "Opt")
        // {
        //     println!("{:?}", self.alias_list);
        //     return true;
        // }
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
