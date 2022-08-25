use proc_macro2::TokenStream;
use quote::quote;

/**
 * Here is how a Rust Type should work
 *
 * RustType::get_type_ident() should give you the identifier for that type, (eg,
 * bool, String, nat64, CustomType, InlineType1). Typically that will be stored
 * in the token_stream member.
 *
 * RustType::get_type_alias_dependencies() will give you an array of
 * dependencies that will need to be installed for this type to work. For
 * example if you have `StructName { member: CustomType }` Then the type alias
 * dependencies for StructName will look like this ["CustomType"]. And that will
 * let you know that you need to go find the type defined by Custom Type in the
 * type aliases
 *
 * RustType::get_inline_dependencies() will give you a list of token streams
 * that will need to be installed. These were found inline so they are not going
 * to be in the type aliases.
 */
/**
 * Here is how the Rust Types are going to work
 * We are going to use them exclusively for work in making function names
 * What does that mean? No more structs, no more enums, no more dependencies
 * besides those that can be found in the type aliases.
 *
 * These are just supposed to let us get a list of dependencies and a token
 * stream to put into the function
 */
#[derive(Clone)]
pub enum RustType {
    KeywordType(KeywordInfo),
    TypeRef(TypeRefInfo),
    ArrayType(ArrayTypeInfo),
}

/**
 * in Typescript it they look like this
 * boolean, string, void
 * in Rust they look like this
 * bool, String, ()
 *
 * They don't have any dependencies.
 */
#[derive(Clone)]
pub struct KeywordInfo {
    pub token_stream: TokenStream
}

#[derive(Clone, Default)]
pub struct TypeRefInfo {
    pub token_stream: TokenStream,
    pub type_alias_dependency: Option<String>,
}

#[derive(Clone)]
pub struct ArrayTypeInfo {
    pub token_stream: TokenStream,
    pub type_alias_dependency: Option<String>,
}

impl RustType {
    pub fn get_type_ident(&self) -> TokenStream {
        let token_stream = match self {
            RustType::KeywordType(KeywordInfo{token_stream}) => token_stream,
            RustType::TypeRef(TypeRefInfo{token_stream, type_alias_dependency: _}) => token_stream,
            RustType::ArrayType(ArrayTypeInfo{token_stream, type_alias_dependency: _}) => token_stream,
        };
        quote!(#token_stream)
    }

    pub fn get_type_alias_dependency(&self) -> Option<String> {
        match self {
            RustType::KeywordType(KeywordInfo{token_stream: _}) => None,
            RustType::TypeRef(TypeRefInfo{token_stream: _, type_alias_dependency}) => {
                type_alias_dependency.clone()
            },
            RustType::ArrayType(ArrayTypeInfo{token_stream: _, type_alias_dependency}) => type_alias_dependency.clone(),
        }
    }
}
