use std::vec;

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
#[derive(Clone, Debug)]
pub enum ActNode {
    Primitive(PrimitiveInfo),
    Option(OptionInfo),
    CustomType(PrimitiveInfo),
    Array(ArrayTypeInfo),
    Record(StructInfo),
    Variant(EnumInfo),
    Func(FuncInfo),
    Tuple(TupleInfo),
    TypeAlias(TypeAliasInfo),
}

/**
 * in Typescript it they look like this
 * boolean, string, void
 * in Rust they look like this
 * bool, String, ()
 *
 * They don't have any dependencies.
 */
#[derive(Clone, Debug)]
pub struct PrimitiveInfo {
    pub identifier: TokenStream,
}

#[derive(Clone, Default, Debug)]
pub struct OptionInfo {
    pub identifier: TokenStream,
    pub enclosed_inline_type: Box<Option<ActNode>>, // Opt and Variants are examples of TypeRefs that have enclosed types
}

#[derive(Clone, Debug)]
pub struct ArrayTypeInfo {
    pub identifier: TokenStream,
    pub enclosed_inline_type: Box<Option<ActNode>>,
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
    pub definition: TokenStream,
    pub is_inline: bool,
    pub inline_members: Box<Vec<ActNode>>,
}

#[derive(Clone, Debug)]
pub struct EnumInfo {
    pub identifier: TokenStream,
    pub definition: TokenStream,
    pub is_inline: bool,
    pub inline_members: Box<Vec<ActNode>>,
}

#[derive(Clone, Debug)]
pub struct FuncInfo {
    pub identifier: TokenStream,
    pub definition: TokenStream,
    pub is_inline: bool,
    pub inline_members: Box<Vec<ActNode>>,
}

#[derive(Clone, Debug)]
pub struct TypeAliasInfo {
    pub identifier: TokenStream,
    pub definition: TokenStream,
    pub is_inline: bool,
    pub inline_members: Box<Vec<ActNode>>,
}

#[derive(Clone, Debug)]
pub struct TupleInfo {
    pub identifier: TokenStream,
    pub definition: TokenStream,
    pub is_inline: bool,
    pub inline_members: Box<Vec<ActNode>>,
}

impl ActNode {
    pub fn get_type_ident(&self) -> TokenStream {
        let token_stream = match self {
            ActNode::Primitive(keyword_info) => &keyword_info.identifier,
            ActNode::CustomType(type_ref_info) => &type_ref_info.identifier,
            ActNode::Array(array_info) => &array_info.identifier,
            ActNode::Record(struct_info) => &struct_info.identifier,
            ActNode::Variant(enum_info) => &enum_info.identifier,
            ActNode::Func(func_info) => &func_info.identifier,
            ActNode::Tuple(tuple_info) => &tuple_info.identifier,
            ActNode::Option(option_info) => &option_info.identifier,
            ActNode::TypeAlias(type_alias_info) => &type_alias_info.identifier,
        };
        quote!(#token_stream)
    }

    // TODO I am not sure if and array type could be an inline type?? We should test that
    // TODO change is_inline to needs to be defined?
    pub fn is_inline_rust_type(&self) -> bool {
        match self {
            ActNode::Primitive(_) => false,
            ActNode::CustomType(_) => false,
            ActNode::Array(array_type_info) => array_type_info.enclosed_inline_type.is_some(),
            ActNode::Record(struct_info) => struct_info.is_inline,
            ActNode::Variant(enum_info) => enum_info.is_inline,
            ActNode::Func(func_info) => func_info.is_inline,
            ActNode::Tuple(tuple_info) => tuple_info.is_inline,
            ActNode::Option(option_info) => option_info.enclosed_inline_type.is_some(),
            ActNode::TypeAlias(type_alias_info) => type_alias_info.is_inline,
        }
    }

    pub fn get_definition(&self) -> Option<TokenStream> {
        match self {
            ActNode::Record(struct_info) => Some(struct_info.definition.clone()),
            ActNode::Variant(enum_info) => Some(enum_info.definition.clone()),
            ActNode::Func(func_info) => Some(func_info.definition.clone()),
            ActNode::Tuple(tuple_info) => Some(tuple_info.definition.clone()),
            ActNode::Primitive(_) => None,
            ActNode::CustomType(_) => None,
            ActNode::Option(type_ref_info) => match &*type_ref_info.enclosed_inline_type {
                Some(inline_type) => inline_type.get_definition(),
                None => None,
            },
            ActNode::Array(array_type_info) => match &*array_type_info.enclosed_inline_type {
                Some(inline_type) => inline_type.get_definition(),
                None => None,
            },
            ActNode::TypeAlias(type_alias_info) => Some(type_alias_info.definition.clone()),
        }
    }

    pub fn needs_to_be_boxed(&self) -> bool {
        true
    }

    // TODO I think that the inline members for type ref and array type ought to be empty list since we are taking care of it with get_structure
    pub fn get_inline_members(&self) -> Vec<ActNode> {
        match self {
            ActNode::Record(struct_info) => *struct_info.inline_members.clone(),
            ActNode::Variant(enum_info) => *enum_info.inline_members.clone(),
            ActNode::Func(func_info) => *func_info.inline_members.clone(),
            ActNode::Primitive(_) => vec![],
            ActNode::CustomType(_) => vec![],
            ActNode::Array(_) => vec![],
            ActNode::Tuple(tuple_info) => *tuple_info.inline_members.clone(),
            ActNode::Option(_) => vec![],
            ActNode::TypeAlias(_) => vec![],
        }
    }

    pub fn to_type_definition_token_stream(&self) -> TokenStream {
        let rust_type_definition = match self.get_definition() {
            Some(definition) => definition,
            None => quote!(),
        };
        let rust_member_type_definitions: Vec<TokenStream> = self
            .get_inline_members()
            .iter()
            .map(|member| member.to_type_definition_token_stream())
            .collect();
        quote! {
            #rust_type_definition
            #(#rust_member_type_definitions)*
        }
    }
}
