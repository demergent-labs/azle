pub use ast_traits::FunctionAndMethodTypeHelperMethods;
pub use ast_traits::GenerateInlineName;
pub use ast_traits::GetDependencies;
pub use ast_traits::GetName;
pub use ast_traits::GetTsType;
pub use ts_ast::TsAst;

pub mod ast_traits;
mod ts_array_type;
mod ts_ast;
mod ts_canister_decl;
mod ts_fn_or_constructor_type;
mod ts_fn_type;
mod ts_keyword_type;
mod ts_method_signature;
mod ts_tuple_type;
mod ts_type;
mod ts_type_ann;
mod ts_type_element;
mod ts_type_lit;
mod ts_type_ref;

pub mod fn_decl;
pub mod ident;
pub mod module;
pub mod program;
pub mod ts_type_alias_decl;
