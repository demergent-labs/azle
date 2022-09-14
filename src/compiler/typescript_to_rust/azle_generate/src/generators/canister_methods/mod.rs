pub use functions::{generate_function_info, FunctionInformation};
pub use query::generate_query_function_infos;
pub use record_type_aliases::generate_record_token_streams;
pub use rust_types::{ArrayTypeInfo, FuncInfo, KeywordInfo, RustType, StructInfo, TypeRefInfo};
pub use type_aliases::{generate_hash_map, generate_type_alias_token_streams};
pub use types::ts_type_to_rust_type;
pub use update::generate_update_function_infos;
pub use variant_type_aliases::generate_variant_token_streams;

mod method_body;
mod query;
mod record_type_aliases;
mod rust_types;
mod type_aliases;
mod types;
mod update;
mod variant_type_aliases;

pub mod async_result_handler;
pub mod functions;
pub mod system {
    pub mod heartbeat;
    pub mod init;
    pub mod inspect_message;
    pub mod post_upgrade;
    pub mod pre_upgrade;
}
