use swc_common::Span;
use swc_ecma_ast::Expr;

use crate::traits::GetSpan;

impl GetSpan for Expr {
    fn get_span(&self) -> Span {
        match self {
            Expr::This(this) => this.span,
            Expr::Array(array) => array.span,
            Expr::Object(object) => object.span,
            Expr::Fn(fn_expr) => fn_expr.function.span,
            Expr::Unary(unary) => unary.span,
            Expr::Update(update) => update.span,
            Expr::Bin(bin) => bin.span,
            Expr::Assign(assign) => assign.span,
            Expr::Member(member) => member.span,
            Expr::SuperProp(super_prop) => super_prop.span,
            Expr::Cond(cond) => cond.span,
            Expr::Call(call) => call.span,
            Expr::New(new) => new.span,
            Expr::Seq(seq) => seq.span,
            Expr::Ident(ident) => ident.span,
            Expr::Lit(lit) => match lit {
                swc_ecma_ast::Lit::Str(str) => str.span,
                swc_ecma_ast::Lit::Bool(bool) => bool.span,
                swc_ecma_ast::Lit::Null(null) => null.span,
                swc_ecma_ast::Lit::Num(num) => num.span,
                swc_ecma_ast::Lit::BigInt(big_int) => big_int.span,
                swc_ecma_ast::Lit::Regex(regex) => regex.span,
                swc_ecma_ast::Lit::JSXText(jsx_text) => jsx_text.span,
            },
            Expr::Tpl(tpl) => tpl.span,
            Expr::TaggedTpl(tagged_tpl) => tagged_tpl.span,
            Expr::Arrow(arrow) => arrow.span,
            Expr::Class(class) => class.class.span,
            Expr::Yield(yield_expr) => yield_expr.span,
            Expr::MetaProp(meta_prop) => meta_prop.span,
            Expr::Await(await_expr) => await_expr.span,
            Expr::Paren(paren) => paren.span,
            Expr::JSXMember(jsx_member) => jsx_member.prop.span,
            Expr::JSXNamespacedName(jsx_namespaced_name) => jsx_namespaced_name.ns.span,
            Expr::JSXEmpty(jsx_empty) => jsx_empty.span,
            Expr::JSXElement(jsx_element) => jsx_element.span,
            Expr::JSXFragment(jsx_fragment) => jsx_fragment.span,
            Expr::TsTypeAssertion(ts_type_assertion) => ts_type_assertion.span,
            Expr::TsConstAssertion(ts_const_assertion) => ts_const_assertion.span,
            Expr::TsNonNull(ts_non_null) => ts_non_null.span,
            Expr::TsAs(ts_as) => ts_as.span,
            Expr::TsInstantiation(ts_instantiation) => ts_instantiation.span,
            Expr::PrivateName(private_name) => private_name.span,
            Expr::OptChain(opt_chain) => opt_chain.span,
            Expr::Invalid(invalid) => invalid.span,
        }
    }
}
