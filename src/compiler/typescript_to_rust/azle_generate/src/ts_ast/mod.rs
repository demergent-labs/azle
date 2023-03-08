use azle_functions_and_methods::FunctionAndMethodTypeHelperMethods;
use azle_type::{AzleArrayType, AzleFnOrConstructorType};
use traits::{GetDependencies, GetSourceText, GetTsType};

pub use azle_fn_decl::AzleFnDecl;
pub use azle_new_expr::AzleNewExpr;
pub use azle_program::AzleProgram;
pub use azle_type_alias_decls::AzleTypeAliasDecl;
pub use traits::GetName;
pub use ts_ast::TsAst;

mod azle_fn_decl;
mod azle_functions_and_methods;
mod azle_new_expr;
mod expr;
mod ident;
mod module;
mod source_map;
mod ts_ast;
mod ts_fn_param;
mod ts_fn_type;
mod ts_type;
mod ts_type_alias_decl;
mod ts_type_ann;

pub mod azle_program;
pub mod azle_type;
pub mod azle_type_alias_decls;
pub mod class_decl;
pub mod class_prop;
pub mod module_item;
pub mod param;
pub mod traits;
