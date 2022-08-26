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
    Struct(StructInfo)
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
    pub identifier: TokenStream
}

#[derive(Clone, Default)]
pub struct TypeRefInfo {
    pub identifier: TokenStream,
    pub type_alias_dependency: Option<String>,
    pub inline_enclosed_type: Option<StructInfo> // Opt and Variants are examples of TypeRefs that have enclosed types
}

#[derive(Clone)]
pub struct ArrayTypeInfo {
    pub identifier: TokenStream,
    pub type_alias_dependency: Option<String>,
    pub inline_enclosed_type: Option<StructInfo>
}

/**
 * export function name(): {member1: string, member2: boolean}
 * export function name(): {member1: MemberStruct, member2: {sub_member1: TypeAliasType1, sub_member2: TypeAliasType2}}
 *
 * the first one will look like this
 * StructInfo {
 *     identifier: quote!{AzleInlineStruct_1},
 *     type_alias_dependencies: [],
 *     structure: quote!{struct AzleInlineStruct_1 {member1: String, member2: bool}},
 *     inline_dependencies []
 * }
 *
 * the second one will look like this
 * StructInfo {
 *     identifier: quote!{AzleInlineStruct_2},
 *     type_alias_dependencies: ["MemberStruct"],
 *     structure: quote!{struct AzleInlineStruct_2 {member1: MemberStruct, member2: AzleInlineStruct_3}},
 *     inline_dependencies [
 *         StructInfo {
 *             identifier: quote!{AzleInlineStruct_3},
 *             type_alias_dependencies: ["TypeAliasType1", "TypeAliasType2"],
 *             structure: quote!{struct AzleInlineStruct_3 {sub_member1: TypeAliasType1, sub_member2: TypeAliasType2}},
 *             inline_dependencies []
 *         }
 *     ]
 * }
 *
 * The final rust version of these functions will be
 * pub fn name() -> AzleInlineStruct_1
 * pub fn name() -> AzleInlineStruct_2
 */
#[derive(Clone, Default, Debug)]
pub struct StructInfo {
    pub identifier: TokenStream,
    pub name: String,
    pub type_alias_dependencies: Vec<String>,
    pub structure: TokenStream,
    pub inline_dependencies: Box<Vec<StructInfo>>
}

// pub struct EnumInfoTODORename {
//     pub identifier: TokenStream,
//     pub type_alias_dependencies: Vec<String>,
//     pub structure:
// }

impl RustType {
    pub fn get_type_ident(&self) -> TokenStream {
        let token_stream = match self {
            RustType::KeywordType(keyword_info) => &keyword_info.identifier,
            RustType::TypeRef(type_ref_info) => &type_ref_info.identifier,
            RustType::ArrayType(array_info) => &array_info.identifier,
            RustType::Struct(struct_info) => &struct_info.identifier,
        };
        quote!(#token_stream)
    }

    pub fn get_type_alias_dependency(&self) -> Vec<String> {
        match self {
            RustType::TypeRef(type_ref_info) => {
                match type_ref_info.type_alias_dependency.clone() {
                    Some(dependency) => vec![dependency],
                    None => vec![],
                }
            },
            RustType::ArrayType(array_info) => {
                match array_info.type_alias_dependency.clone() {
                    Some(dependency) => vec![dependency],
                    None => vec![],
                }
            },
            RustType::Struct(struct_info) => struct_info.type_alias_dependencies.clone(),
            _ => vec![]
        }
    }

    pub fn get_inline_dependencies(&self) -> Option<StructInfo> {
        match self {
            RustType::Struct(struct_info) => Some(struct_info.clone()),
            _ => None
        }
    }
}
