use quote::quote;
use std::collections::HashSet;
use std::path::Path;
use swc_common::{sync::Lrc, SourceMap};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax, TsConfig};

use crate::{
    cdk_act::{
        self, nodes::data_type_nodes, traits::SystemCanisterMethodBuilder, AbstractCanisterTree,
        ActDataTypeNode, CanisterMethodType,
        RequestType, ToAct,
    },
    generators::{
        async_result_handler, azle_into_js_value, azle_try_from_js_value, canister_methods,
        cross_canister_call_functions, stacktrace, type_aliases,
    },
    ts_ast::{self, fn_decl::FnDeclVecHelperMethods, program::TsProgramVecHelperMethods},
};

pub struct TsAst {
    pub programs: Vec<swc_ecma_ast::Program>,
}

impl TsAst {
    pub fn from_ts_file_names(ts_file_names: &Vec<&str>) -> Self {
        let programs = ts_file_names
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

                program
            })
            .collect();
        Self { programs }
    }
}

impl ToAct for TsAst {
    fn to_act(&self) -> AbstractCanisterTree {
        eprintln!("-----------------------------------------------");
        eprintln!("--- Starting AST to ACT Conversion ------------");
        eprintln!("-----------------------------------------------");
        // Collect AST Information
        let ast_type_alias_decls = &self.programs.get_ast_type_alias_decls();
        let ast_canister_type_alias_decls =
            ts_ast::ts_type_alias_decl::get_ast_canister_type_alias_decls(&ast_type_alias_decls);

        // Separate function decls into queries and updates
        let ast_fnc_decls_query = &self
            .programs
            .get_fn_decls_of_type(&CanisterMethodType::Query);
        let ast_fnc_decls_update = &self
            .programs
            .get_fn_decls_of_type(&CanisterMethodType::Update);

        // Determine which type aliases must be present for the functions to work and save them for later parsing
        let query_dependencies =
            ast_fnc_decls_query.get_dependent_types_from_fn_decls(&ast_type_alias_decls);
        let update_dependencies =
            ast_fnc_decls_update.get_dependent_types_from_fn_decls(&ast_type_alias_decls);
        let canister_dependencies =
            ts_ast::ts_type_alias_decl::get_dependent_types_from_canister_decls(
                &ast_canister_type_alias_decls,
                &ast_type_alias_decls,
            );

        let dependencies: HashSet<String> = query_dependencies
            .union(&update_dependencies)
            .cloned()
            .collect();
        let dependencies: HashSet<String> = dependencies
            .union(&canister_dependencies)
            .cloned()
            .collect();

        let query_methods =
            canister_methods::build_canister_method_nodes(&ast_fnc_decls_query, RequestType::Query);
        let update_methods = canister_methods::build_canister_method_nodes(
            &ast_fnc_decls_update,
            RequestType::Update,
        );

        let query_method_type_acts =
            cdk_act::nodes::act_canister_method_node::get_all_types_from_canister_method_acts(
                &query_methods,
            );
        let update_method_type_acts =
            cdk_act::nodes::act_canister_method_node::get_all_types_from_canister_method_acts(
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

        let arrays: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::Array(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let funcs: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::Func(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let options: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::Option(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let primitives: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::Primitive(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let records: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::Record(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let tuples: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::Tuple(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let type_refs: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::TypeRef(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let variants: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::Variant(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();

        let heartbeat_method = self.programs.build_heartbeat_method();
        let init_method = self.programs.build_init_method();
        let inspect_message_method = self.programs.build_inspect_method();
        let post_upgrade_method = self.programs.build_post_upgrade_method();
        let pre_upgrade_method = self.programs.build_pre_upgrade_method();

        let azle_into_js_value = azle_into_js_value::generate_azle_into_js_value();
        let azle_try_from_js_value = azle_try_from_js_value::generate_azle_try_from_js_value();

        let async_result_handler =
            async_result_handler::generate_async_result_handler(&self.programs);
        let get_top_level_call_frame_fn = stacktrace::generate_get_top_level_call_frame_fn();

        let cross_canister_call_functions =
            cross_canister_call_functions::generate_cross_canister_call_functions(&self.programs);

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

                #cross_canister_call_functions

                #async_result_handler
                #get_top_level_call_frame_fn

                #azle_into_js_value
                #azle_try_from_js_value

            },
            arrays,
            funcs,
            options,
            primitives,
            records,
            tuples,
            type_refs,
            variants,
        }
    }
}
