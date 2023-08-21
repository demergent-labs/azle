use crate::MyVisitor;
use swc_common::DUMMY_SP;
use swc_ecma_ast::{BindingIdent, Decl, ExportDecl, Ident, Param, Pat};

pub fn visit_mut_export_decl(my_visitor: &mut MyVisitor, export_decl: &mut ExportDecl) {
    if let Decl::Fn(fn_decl) = &mut export_decl.decl {
        // if !fn_decl.is_canister_query_method() {
        //     return;
        // }

        let param_decoders = fn_decl.function.params.iter().map(|param| {
            // TODO check the type of the param and decode with it
            // TODO create the AST nodes to do this
            // TODO add these into the body of the function
        });

        fn_decl.function.params = vec![Param {
            span: DUMMY_SP,
            decorators: vec![],
            pat: Pat::Ident(BindingIdent::from(Ident::new(
                "candidEncodedArgs".into(),
                DUMMY_SP,
            ))),
        }];

        // TODO now we need to generate all of the param decoders
        // TODO we need to analyze the original params to create these decoders
    }

    swc_ecma_visit::visit_mut_export_decl(my_visitor, export_decl);
}
