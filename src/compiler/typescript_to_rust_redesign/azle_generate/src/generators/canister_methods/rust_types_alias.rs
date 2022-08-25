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
#[derive(Clone)]
pub enum RustType {
    KeywordType(KeywordInfo),
    TypeRef(TypeRefInfo),
    ArrayType(ArrayTypeInfo),
    Struct(StructInfo),
    Enum(EnumInfo),
}

#[derive(Clone)]
pub struct KeywordInfo {
    pub token_stream: TokenStream
}

#[derive(Clone)]
pub struct TypeRefInfo {
    pub token_stream: TokenStream,
    pub type_alias_dependency: Option<String>,
    pub inline_dependencies: Vec<RustType>
}

#[derive(Clone)]
pub struct ArrayTypeInfo {
    pub token_stream: TokenStream,
    pub type_alias_dependencies: Vec<String>,
    pub inline_dependencies: Vec<RustType>
}

#[derive(Clone)]
pub struct StructInfo {
    pub token_stream: TokenStream,
    pub name: String,
    pub type_alias_dependencies: Vec<String>,
    pub inline_dependencies: Vec<RustType>
}
// The idea is that you can put the name into a token stream and (which should be pretty much the same, and that will work after you install all of the dependencies)

// TODO I think the next thing I need to do is understand what I am doing with the
// Collect dependencies. My current theory is that I would have a struct not be a
// Struct type but have it be a type ref with a struct as a dependency
// It might be helpful to think about the keywords
// Maybe have simpler examples, work out the architecture,
// Determine where I determine the dependancies and make sure it's clear in the code
#[derive(Clone)]
pub struct EnumInfo {
    pub token_stream: TokenStream,
    pub name: String,
    pub type_alias_dependencies: Vec<String>,
    pub inline_dependencies: Vec<RustType>
}

impl RustType {
    pub fn get_type_ident(&self) -> TokenStream {
        let token_stream = match self {
            RustType::KeywordType(KeywordInfo{token_stream}) => token_stream,
            RustType::TypeRef(TypeRefInfo{token_stream, type_alias_dependency: _, inline_dependencies: _}) => token_stream,
            RustType::ArrayType(ArrayTypeInfo{token_stream, type_alias_dependencies: _, inline_dependencies: _}) => token_stream,
            RustType::Struct(StructInfo{token_stream, name: _, type_alias_dependencies: _, inline_dependencies: _}) => token_stream,
            RustType::Enum(_) => todo!("Get Enum Type Identifier"),
        };
        quote!(#token_stream)
    }

    pub fn get_type_alias_dependencies(&self) -> Vec<String> {
        match self {
            RustType::KeywordType(KeywordInfo{token_stream: _}) => vec![],
            RustType::TypeRef(TypeRefInfo{token_stream: _, type_alias_dependency, inline_dependencies: _}) => {
                match type_alias_dependency {
                    Some(dependency) => vec![dependency.to_string()],
                    None => vec![]
                }
            },
            RustType::ArrayType(ArrayTypeInfo{token_stream: _, type_alias_dependencies, inline_dependencies: _}) => type_alias_dependencies.to_vec(),
            RustType::Struct(StructInfo{token_stream: _, name: _, type_alias_dependencies, inline_dependencies: _}) => type_alias_dependencies.to_vec(),
            RustType::Enum(_) => todo!("Get Enum dependencies"),
        }
    }
}
