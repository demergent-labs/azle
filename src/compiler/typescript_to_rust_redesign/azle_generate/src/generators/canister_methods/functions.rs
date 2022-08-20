use proc_macro2::Ident;
use quote::{
    format_ident,
    quote,
};
use swc_ecma_ast::{FnDecl, TsType, TsKeywordTypeKind, TsTypeAnn, TsKeywordType, TsTypeRef, Param, TsArrayType };

pub fn generate_function_token_stream(ast_fnc_decl_query: &FnDecl) -> proc_macro2::TokenStream {
    let function_name = ast_fnc_decl_query.ident.to_string().replace("#0", "");
    let function_name_ident = format_ident!("{}", function_name);

    let ts_type_ann = &ast_fnc_decl_query.function.return_type.as_ref();
    let return_type_ident = generate_return_type_ident(ts_type_ann);

    let param_name_idents = generate_param_name_idents(&ast_fnc_decl_query.function.params);
    let param_type_idents = generate_param_type_idents(&ast_fnc_decl_query.function.params);
    let params = generate_params_quote(param_name_idents, param_type_idents);

    quote! {
        async fn #function_name_ident(#(#params),*) -> #return_type_ident {
            Default::default()
        }
    }
}

fn generate_param_name_idents(params: &Vec<Param>) -> Vec<Ident> {
    params.iter().map(|param| {
        let thing = param.pat.as_ident().unwrap().id.to_string().replace("#0", "");
        format_ident!("{}", thing)
    }).collect()
}

fn generate_params_quote(names: Vec<Ident>, types: Vec<Ident>) -> Vec<proc_macro2::TokenStream> {
    names.iter().enumerate().map(|(i, name)| {
        let param_type = types[i].clone();
        quote!{
            #name: #param_type
        }
    }).collect()
}

fn string_to_token_stream(string: String) -> proc_macro2::TokenStream {
    let ident = format_ident!("{}", string);
    quote!{#ident}
}

fn parse_ts_keyword_type(ts_keyword_type: TsKeywordType) -> Ident {
    let kind = ts_keyword_type.kind;
    let result = match &kind {
        TsKeywordTypeKind::TsBooleanKeyword => "bool",
        TsKeywordTypeKind::TsStringKeyword => "String",
        TsKeywordTypeKind::TsVoidKeyword => "RustVoid",
        TsKeywordTypeKind::TsNullKeyword => "RustNull",
        TsKeywordTypeKind::TsObjectKeyword => todo!(),
        TsKeywordTypeKind::TsNumberKeyword => todo!(),
        TsKeywordTypeKind::TsBigIntKeyword => todo!(),
        TsKeywordTypeKind::TsNeverKeyword => todo!(),
        TsKeywordTypeKind::TsSymbolKeyword => todo!(),
        TsKeywordTypeKind::TsIntrinsicKeyword => todo!(),
        TsKeywordTypeKind::TsUndefinedKeyword => todo!(),
        TsKeywordTypeKind::TsUnknownKeyword => todo!(),
        TsKeywordTypeKind::TsAnyKeyword => todo!(),
    };
    format_ident!("{}", result)
}

fn parse_ts_type_ref(ts_type_ref: TsTypeRef) -> Ident {
    let type_name = ts_type_ref.type_name.as_ident().unwrap().sym.chars().as_str();
    let result = match &type_name[..] {
        "blob" => "RustBlob",
        "float32" => "f32",
        "float64" => "f64",
        "int" => "CandidInt",
        "int8" => "i8",
        "int16" => "i16",
        "int32" => "i32",
        "int64" => "i64",
        "nat" => "CandidNat",
        "nat8" => "u8",
        "nat16" => "u16",
        "nat32" => "u32",
        "nat64" => "u64",
        "Principal" => "CandidPrincipal",
        "empty" => "CandidEmpty",
        "reserved" => "CandidReserved",
        _ => todo!(),
    };
    format_ident!("{}", result)
}

fn parse_ts_array_type(ts_array_type: TsArrayType) -> Ident {
    let elem_type = *ts_array_type.elem_type;
    let elem_type_ident = generate_type_ident(elem_type);
    format_ident!("Vec<{}>", elem_type_ident)
}

fn generate_return_type_ident(ts_type_ann:&Option<&TsTypeAnn>) -> Ident {
    let type_ann = ts_type_ann.clone().unwrap();
    let type_ref = type_ann.type_ann.as_ts_type_ref().unwrap();
    let type_params = type_ref.type_params.clone().unwrap();

    let params = *type_params.params[0].clone();
    generate_type_ident(params)
}

fn generate_param_type_idents(params: &Vec<Param>) -> Vec<Ident> {
    params.iter().map(|param| {
        let type_ann = &param.pat.as_ident().unwrap().type_ann.as_ref();

        let type_ann = type_ann.clone().unwrap();
        let ts_type = *type_ann.type_ann.clone();

        generate_type_ident(ts_type)
    }).collect()
}


fn generate_type_ident(ts_type: TsType) -> Ident {
    match ts_type {
        TsType::TsKeywordType(ts_keyword_type) => parse_ts_keyword_type(ts_keyword_type),
        TsType::TsTypeRef(ts_type_ref) => parse_ts_type_ref(ts_type_ref),
        TsType::TsArrayType(ts_array_type) => parse_ts_array_type(ts_array_type),
        TsType::TsThisType(_) => todo!(),
        TsType::TsFnOrConstructorType(_) => todo!(),
        TsType::TsTypeQuery(_) => todo!(),
        TsType::TsTypeLit(_) => todo!(),
        TsType::TsTupleType(_) => todo!(),
        TsType::TsOptionalType(_) => todo!(),
        TsType::TsRestType(_) => todo!(),
        TsType::TsUnionOrIntersectionType(_) => todo!(),
        TsType::TsConditionalType(_) => todo!(),
        TsType::TsInferType(_) => todo!(),
        TsType::TsParenthesizedType(_) => todo!(),
        TsType::TsTypeOperator(_) => todo!(),
        TsType::TsIndexedAccessType(_) => todo!(),
        TsType::TsMappedType(_) => todo!(),
        TsType::TsLitType(_) => todo!(),
        TsType::TsTypePredicate(_) => todo!(),
        TsType::TsImportType(_) => todo!(),
    }
}
