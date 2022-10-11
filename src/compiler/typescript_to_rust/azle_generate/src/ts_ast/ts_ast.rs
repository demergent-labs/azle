use quote::quote;
use std::path::Path;
use std::{collections::HashSet, iter::FromIterator};
use swc_common::{sync::Lrc, SourceMap};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax, TsConfig};

use crate::generators::async_result_handler::AsyncResultHelperMethods;
use crate::generators::cross_canister_call_functions::CrossCanisterHelperMethods;
use crate::generators::errors;
use crate::ts_ast::program::azle_program::AzleProgramVecHelperMethods;
use crate::ts_ast::type_alias::azle_type_alias_decl::AzleTypeAliasListHelperMethods;
use crate::{
    cdk_act::{
        self, nodes::data_type_nodes, traits::SystemCanisterMethodBuilder, AbstractCanisterTree,
        ActDataType, CanisterMethodType, RequestType, ToAct,
    },
    generators::{canister_methods, stacktrace, type_aliases, vm_value_conversion},
    ts_ast::GetDependencies,
};

use super::program::AzleProgram;

pub struct TsAst {
    pub azle_programs: Vec<AzleProgram>,
}

impl TsAst {
    pub fn from_ts_file_names(ts_file_names: &Vec<&str>) -> Self {
        let azle_programs = ts_file_names
            .iter()
            .map(|ts_file_name| {
                let filepath = Path::new(ts_file_name).to_path_buf();

                let cm: Lrc<SourceMap> = Default::default();

                let fm = cm.load_file(&filepath).unwrap();

                let lexer = Lexer::new(
                    Syntax::Typescript(TsConfig::default()),
                    Default::default(),
                    StringInput::from(&*fm),
                    None,
                );

                let mut parser = Parser::new_from(lexer);

                let program = parser.parse_program().unwrap();

                if let Ok(source_map) = std::rc::Rc::try_unwrap(cm) {
                    return AzleProgram {
                        program,
                        source_map,
                    };
                };
                panic!("this cannot happen");
            })
            .collect();
        Self { azle_programs }
    }
}

impl ToAct for TsAst {
    fn to_act(&self) -> AbstractCanisterTree {
        // Collect AST Information
        let ast_type_alias_decls = &self.azle_programs.get_azle_type_alias_decls();
        let ast_canister_type_alias_decls = ast_type_alias_decls.get_ast_ts_canister_decls();

        // Separate function decls into queries and updates
        let ast_fnc_decls_query = &self
            .azle_programs
            .get_fn_decls_of_type(&CanisterMethodType::Query);
        let ast_fnc_decls_update = &self
            .azle_programs
            .get_fn_decls_of_type(&CanisterMethodType::Update);

        // Determine which type aliases must be present for the functions to work and save them for later parsing
        let found_types = HashSet::new();
        let ast_type_alias_lookup = ast_type_alias_decls.generate_type_alias_lookup();
        let query_dependencies =
            ast_fnc_decls_query.get_dependent_types(&ast_type_alias_lookup, &found_types);
        let update_dependencies =
            ast_fnc_decls_update.get_dependent_types(&ast_type_alias_lookup, &found_types);
        let canister_dependencies =
            ast_canister_type_alias_decls.get_dependent_types(&ast_type_alias_lookup, &found_types);

        // TODO I think this should already be a HashSet at this point
        let query_dependencies: HashSet<String> =
            HashSet::from_iter(query_dependencies.iter().cloned());
        let update_dependencies: HashSet<String> =
            HashSet::from_iter(update_dependencies.iter().cloned());
        let canister_dependencies: HashSet<String> =
            HashSet::from_iter(canister_dependencies.iter().cloned());
        let dependencies: HashSet<String> = query_dependencies
            .union(&update_dependencies)
            .cloned()
            .collect();
        let dependencies: HashSet<String> = dependencies
            .union(&canister_dependencies)
            .cloned()
            .collect();

        let query_methods = canister_methods::build_canister_method_nodes(
            &ast_fnc_decls_query,
            RequestType::Query,
            &Default::default(),
        );
        let update_methods = canister_methods::build_canister_method_nodes(
            &ast_fnc_decls_update,
            RequestType::Update,
            &Default::default(),
        );

        let query_method_type_acts =
            cdk_act::nodes::act_canister_method::get_all_types_from_canister_method_acts(
                &query_methods,
            );
        let update_method_type_acts =
            cdk_act::nodes::act_canister_method::get_all_types_from_canister_method_acts(
                &update_methods,
            );

        let type_alias_acts =
            type_aliases::build_type_alias_acts(&dependencies, &ast_type_alias_decls);

        let type_alias_inline_acts = data_type_nodes::build_inline_type_acts(&type_alias_acts);
        let query_method_inline_acts =
            data_type_nodes::build_inline_type_acts(&query_method_type_acts);
        let update_method_inline_acts =
            data_type_nodes::build_inline_type_acts(&update_method_type_acts);

        let all_inline_acts = vec![
            type_alias_inline_acts,
            query_method_inline_acts,
            update_method_inline_acts,
        ]
        .concat();
        let all_inline_acts = data_type_nodes::deduplicate(all_inline_acts);

        let all_type_acts = vec![type_alias_acts, all_inline_acts].concat();

        let arrays: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::Array(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let funcs: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::Func(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let options: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::Option(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let primitives: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::Primitive(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let records: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::Record(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let tuples: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::Tuple(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let type_refs: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::TypeRef(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let variants: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::Variant(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();

        let heartbeat_method = self.azle_programs.build_heartbeat_method();
        let init_method = self.azle_programs.build_init_method(&Default::default());
        let inspect_message_method = self.azle_programs.build_inspect_method();
        let post_upgrade_method = self
            .azle_programs
            .build_post_upgrade_method(&Default::default());
        let pre_upgrade_method = self.azle_programs.build_pre_upgrade_method();

        let try_into_vm_value_impls = vm_value_conversion::generate_try_into_vm_value_impls();
        let try_from_vm_value_impls = vm_value_conversion::generate_try_from_vm_value_impls();

        let async_result_handler = self.azle_programs.generate_async_result_handler();
        let get_top_level_call_frame_fn = stacktrace::generate_get_top_level_call_frame_fn();

        let cross_canister_call_functions =
            self.azle_programs.generate_cross_canister_call_functions();

        let boa_error_handler = errors::generate_error_handler();
        // TODO Some of the things in this quote belong inside of the quote in AbstractCanisterTree

        AbstractCanisterTree {
            // TODO put a CDK_name property on here for use in things
            update_methods,
            query_methods,
            heartbeat_method,
            init_method,
            inspect_message_method,
            post_upgrade_method,
            pre_upgrade_method,
            rust_code: quote! {
                #boa_error_handler
                #cross_canister_call_functions
                #async_result_handler
                #get_top_level_call_frame_fn
            },
            arrays,
            funcs,
            options,
            primitives,
            records,
            try_from_vm_value_impls,
            try_into_vm_value_impls,
            tuples,
            type_refs,
            variants,
        }
    }
}
