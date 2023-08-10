use alias_table::AliasLists;
use cdk_framework::act::node::canister_method::QueryOrUpdateMethod;
use cdk_framework::{
    act::abstract_canister_tree::{Import, Module},
    traits::CollectResults,
    AbstractCanisterTree,
};
use proc_macro2::TokenStream;

use crate::body::{async_await_result_handler, ic_object, stable_b_tree_map};
pub use crate::errors::{Error, GuardFunctionNotFound};
use crate::{body::stable_b_tree_map::StableBTreeMapNode, ts_ast::TsAst};

mod body;
mod candid_type;
mod canister_method;
mod guard_function;
mod header;
mod macros;
mod ts_ast;
mod ts_keywords;
mod vm_value_conversion;

pub mod alias_table;
pub mod errors;
pub mod imports;
pub mod plugin;
pub mod traits;

pub use alias_table::AliasTable;
pub use alias_table::AliasTables;
pub use plugin::Plugin;

pub fn generate_canister(
    ts_file_names: &Vec<String>,
    main_js: String,
    alias_tables: AliasTables,
    alias_lists: AliasLists,
    plugins: &Vec<Plugin>,
    environment_variables: &Vec<(String, String)>,
) -> Result<TokenStream, Vec<Error>> {
    TsAst::new(ts_file_names, main_js, alias_tables, alias_lists)?
        .to_act(plugins, environment_variables)?
        .to_token_stream()
        .map_err(|cdkf_errors| cdkf_errors.into_iter().map(Error::from).collect())
}

impl TsAst {
    pub fn to_act(
        &self,
        plugins: &Vec<Plugin>,
        environment_variables: &Vec<(String, String)>,
    ) -> Result<AbstractCanisterTree, Vec<Error>> {
        let modules = self
            .programs
            .iter()
            .map(|program| {
                let path = convert_module_name_to_path(&program.filepath);

                let canister_methods = program
                    .build_canister_methods(plugins, environment_variables)
                    .unwrap();

                let imports = program.build_imports();

                let exports = program.build_exports();

                let candid_types = program.build_candid_types().unwrap();

                let guard_functions = program.build_guard_functions();

                let stable_b_tree_map_nodes = program.build_stable_b_tree_map_nodes().unwrap();

                let query_and_update_methods = vec![
                    canister_methods
                        .query_methods
                        .iter()
                        .map(|query_method| QueryOrUpdateMethod::Query(query_method.clone()))
                        .collect::<Vec<_>>(),
                    canister_methods
                        .update_methods
                        .iter()
                        .map(|update_methods| QueryOrUpdateMethod::Update(update_methods.clone()))
                        .collect::<Vec<_>>(),
                ]
                .concat();

                let stable_b_tree_maps =
                    stable_b_tree_map::rust::generate(&stable_b_tree_map_nodes);
                let service_functions =
                    crate::body::ic_object::functions::service::generate(&candid_types.services);

                Module {
                    path,
                    canister_methods,
                    candid_types,
                    guard_functions,
                    body: quote::quote! {
                        #stable_b_tree_maps
                        #(#service_functions)*
                    },
                    imports,
                    exports,
                }
            })
            .collect();

        let register_ic_object_function = ic_object::register_function::generate(&modules).unwrap();
        let ic_object_functions = ic_object::functions::generate();

        let async_await_result_handler = async_await_result_handler::generate(&modules);

        let body = body::generate(plugins)?;
        let cdk_name = "azle".to_string();
        let header = header::generate(&self.main_js);
        let keywords = ts_keywords::ts_keywords();
        let vm_value_conversion = self.build_vm_value_conversion();

        Ok(AbstractCanisterTree {
            body: quote::quote! {
                #body

                mod _azle_ic_object {
                    use crate::ToJsError;
                    use crate::CdkActTryFromVmValue;
                    use crate::CdkActTryIntoVmValue;
                    use crate::UnwrapJsResultOrTrap;
                    use crate::UnwrapOrTrapWithMessage;

                    #ic_object_functions
                    #register_ic_object_function
                }

                mod _azle_async_await_result_handler {
                    use crate::ToJsError;
                    use crate::CdkActTryFromVmValue;
                    use crate::CdkActTryIntoVmValue;
                    use crate::UnwrapJsResultOrTrap;
                    use crate::UnwrapOrTrapWithMessage;
                    use crate::ToStdString;

                    #async_await_result_handler
                }
            },
            cdk_name,
            header,
            keywords,
            vm_value_conversion,
            modules,
            // default_init_method: InitMethod {
            //     params: vec![],
            //     body: crate::canister_method::init::rust::generate(
            //         None,
            //         plugins,
            //         environment_variables,
            //     )?,
            //     guard_function: None,
            // },
        })
    }
}

// TODO try to use the official Path and component method
// TODO this is very hacky
// TODO this will break probably in many cases, for example if there is no starting /
pub fn convert_module_name_to_path(name: &str) -> Vec<String> {
    let path = std::path::Path::new(name);

    let components: Vec<String> = path
        .components()
        .filter_map(|component| {
            // Filter out the prefix (like '/')
            if let std::path::Component::Normal(part) = component {
                let string_with_possible_extension = part.to_string_lossy().into_owned();

                let string_without_extension =
                    std::path::Path::new(&string_with_possible_extension)
                        .file_stem()
                        .unwrap()
                        .to_str()
                        .unwrap()
                        .to_string();

                Some(string_without_extension)
            } else {
                None
            }
        })
        .collect();

    components

    // let components = &name.split("/").filter(|c| c != &"").collect::<Vec<&str>>();

    // components
    //     .iter()
    //     .map(|c| {
    //         std::path::Path::new(c)
    //             .file_stem()
    //             .unwrap()
    //             .to_str()
    //             .unwrap()
    //             .to_string()
    //     })
    //     .collect::<Vec<String>>()
}
