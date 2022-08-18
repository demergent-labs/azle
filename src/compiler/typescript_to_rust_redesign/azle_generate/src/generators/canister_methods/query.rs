use quote::{
    format_ident,
    quote
};
use swc_ecma_ast::{FnDecl, TsTypeAnn};

pub fn generate_query_function_token_streams(ast_fnc_decls_query: &Vec<FnDecl>) -> Vec<proc_macro2::TokenStream> {
    ast_fnc_decls_query.iter().map(|ast_fnc_decl_query| {
        generate_query_function_token_stream(ast_fnc_decl_query)
    }).collect()
}

fn generate_query_function_token_stream(ast_fnc_decl_query: &FnDecl) -> proc_macro2::TokenStream {
    let function_name = ast_fnc_decl_query.ident.to_string().replace("#0", "");
    let function_name_ident = format_ident!("{}", function_name);

    let return_type_name = generate_return_type_ident(&ast_fnc_decl_query.function.return_type);
    let return_type_ident = format_ident!("{}", return_type_name);

    // let param_type_names = "";
    // let param_type_ident = format!("{}",  param_type_names);

    // let param_name: String = "".to_string();
        // async fn #function_name_ident(#param_name: #param_type_ident) -> #return_type_ident {

    quote! {
        #[ic_cdk_macros::query]
        #[candid::candid_method(query)]
        async fn #function_name_ident() -> #return_type_ident {
            Default::default()
        }
    }
}

fn generate_return_type_ident(return_type:&Option<TsTypeAnn>) -> String {
    let type_ann = return_type.clone().unwrap();
    let type_ref = type_ann.type_ann.as_ts_type_ref().unwrap();
    let type_params = type_ref.type_params.clone().unwrap();

    let params = *type_params.params[0].clone();
    match params {
        swc_ecma_ast::TsType::TsKeywordType(ts_keyword_type) => {
            let kind = ts_keyword_type.kind;
            match &kind {
                swc_ecma_ast::TsKeywordTypeKind::TsBooleanKeyword => "bool".to_string(),
                swc_ecma_ast::TsKeywordTypeKind::TsStringKeyword => "String".to_string(),
                swc_ecma_ast::TsKeywordTypeKind::TsVoidKeyword => "()".to_string(),
                swc_ecma_ast::TsKeywordTypeKind::TsNullKeyword => "(())".to_string(),
                swc_ecma_ast::TsKeywordTypeKind::TsObjectKeyword => todo!(),
                swc_ecma_ast::TsKeywordTypeKind::TsNumberKeyword => todo!(),
                swc_ecma_ast::TsKeywordTypeKind::TsBigIntKeyword => todo!(),
                swc_ecma_ast::TsKeywordTypeKind::TsNeverKeyword => todo!(),
                swc_ecma_ast::TsKeywordTypeKind::TsSymbolKeyword => todo!(),
                swc_ecma_ast::TsKeywordTypeKind::TsIntrinsicKeyword => todo!(),
                swc_ecma_ast::TsKeywordTypeKind::TsUndefinedKeyword => todo!(),
                swc_ecma_ast::TsKeywordTypeKind::TsUnknownKeyword => todo!(),
                swc_ecma_ast::TsKeywordTypeKind::TsAnyKeyword => todo!(),
            }
        },
        swc_ecma_ast::TsType::TsThisType(_) => todo!(),
        swc_ecma_ast::TsType::TsFnOrConstructorType(_) => todo!(),
        swc_ecma_ast::TsType::TsTypeRef(ts_type_ref) => {
            let type_name = ts_type_ref.type_name.as_ident().unwrap().sym.chars().as_str();
            println!("{}", type_name);
            match &type_name[..] {
                "nat64" => "CandidNat".to_string(),
                _ => "u128".to_string(),
            }
        },
        swc_ecma_ast::TsType::TsTypeQuery(_) => todo!(),
        swc_ecma_ast::TsType::TsTypeLit(_) => todo!(),
        swc_ecma_ast::TsType::TsArrayType(_) => todo!(),
        swc_ecma_ast::TsType::TsTupleType(_) => todo!(),
        swc_ecma_ast::TsType::TsOptionalType(_) => todo!(),
        swc_ecma_ast::TsType::TsRestType(_) => todo!(),
        swc_ecma_ast::TsType::TsUnionOrIntersectionType(_) => todo!(),
        swc_ecma_ast::TsType::TsConditionalType(_) => todo!(),
        swc_ecma_ast::TsType::TsInferType(_) => todo!(),
        swc_ecma_ast::TsType::TsParenthesizedType(_) => todo!(),
        swc_ecma_ast::TsType::TsTypeOperator(_) => todo!(),
        swc_ecma_ast::TsType::TsIndexedAccessType(_) => todo!(),
        swc_ecma_ast::TsType::TsMappedType(_) => todo!(),
        swc_ecma_ast::TsType::TsLitType(_) => todo!(),
        swc_ecma_ast::TsType::TsTypePredicate(_) => todo!(),
        swc_ecma_ast::TsType::TsImportType(_) => todo!(),
    }
}

pub fn get_query_fn_decls(fn_decls: Vec<FnDecl>) -> Vec<FnDecl> {
    fn_decls.into_iter().filter(|fn_decl| is_query_fn_decl(fn_decl)).collect()
}

fn is_query_fn_decl(fn_decl: &FnDecl) -> bool {
    if let Some(ts_type_ann) = &fn_decl.function.return_type {
        if ts_type_ann.type_ann.is_ts_type_ref() {
            let type_ref = ts_type_ann.type_ann.as_ts_type_ref().unwrap();

            if type_ref.type_name.is_ident() {
                let ident = type_ref.type_name.as_ident().unwrap();

                ident.to_string() == "Query#0" // TODO probably use ident.sym to get the real name without the #0
            }
            else {
                false
            }
        }
        else {
            false
        }
    }
    else {
        false
    }
}
