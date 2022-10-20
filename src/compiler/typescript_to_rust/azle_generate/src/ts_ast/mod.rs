use ast_traits::GenerateInlineName;
use ast_traits::GetDependencies;
use ast_traits::GetSourceText;
use ast_traits::GetTsType;
use azle_functions_and_methods::FunctionAndMethodTypeHelperMethods;
use azle_type::AzleArrayType;
use azle_type::AzleFnOrConstructorType;

pub use ast_traits::GetName;
pub use azle_fn_decl::AzleFnDecl;
pub use azle_type_alias_decls::AzleTypeAliasDecl;
pub use ts_ast::TsAst;

mod ast_traits;
mod azle_fn_decl;
mod azle_functions_and_methods;
mod ident;
mod module;
mod source_map;
mod ts_ast;
mod ts_type;
mod ts_type_ann;

pub mod azle_type;
pub mod azle_type_alias_decls;
pub mod param;
pub mod program;
