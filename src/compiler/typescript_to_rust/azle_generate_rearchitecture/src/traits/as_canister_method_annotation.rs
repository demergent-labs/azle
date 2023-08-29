use swc_ecma_ast::ModuleItem;

pub trait AsCanisterMethodAnnotation {
    fn as_canister_method_annotation(&self) -> Option<String>;
}

impl AsCanisterMethodAnnotation for ModuleItem {
    fn as_canister_method_annotation(&self) -> Option<String> {
        todo!()

        // self.as_stmt()
        //     .and_then(|stmt| stmt.as_expr())
        //     .and_then(|expr_stmt| {
        //         expr_stmt
        //             .expr
        //             .as_call()
        //             .and_then(|call_expr| call_expr.callee.as_expr())
        //             .and_then(|box_expr| box_expr.get_name())
        //             .or(expr_stmt.expr.get_name())
        //             .and_then(|name| {
        //                 if is_canister_method_annotation(&name, self.alias_table) {
        //                     Some(Annotation::from_module_item(self))
        //                 } else {
        //                     None
        //                 }
        //             })
        //     })
    }
}
