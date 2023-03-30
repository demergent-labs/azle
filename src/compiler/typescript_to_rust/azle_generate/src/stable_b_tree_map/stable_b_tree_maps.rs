use swc_ecma_ast::{Decl, Expr, ModuleDecl, ModuleItem, Program, Stmt};

use crate::{
    stable_b_tree_map::{new_expr::AzleNewExpr, StableBTreeMapNode},
    ts_ast::{AzleProgram, GetName},
};

impl AzleProgram {
    pub fn build_stable_b_tree_map_nodes(&self) -> Vec<StableBTreeMapNode> {
        match &self.program {
            Program::Module(module) => module
                .body
                .iter()
                .filter_map(Self::get_decl_from_module_item)
                .flat_map(|decl| self.process_decl(decl).into_iter())
                .collect(),
            Program::Script(_) => vec![],
        }
    }

    fn get_decl_from_module_item(module_item: &ModuleItem) -> Option<&Decl> {
        match module_item {
            ModuleItem::Stmt(Stmt::Decl(decl)) => Some(decl),
            ModuleItem::ModuleDecl(ModuleDecl::ExportDecl(export_decl)) => Some(&export_decl.decl),
            _ => None,
        }
    }

    fn process_decl(&self, decl: &Decl) -> Vec<StableBTreeMapNode> {
        match decl {
            Decl::Var(var_decl) => self.process_var_decl(var_decl),
            _ => vec![],
        }
    }

    fn process_var_decl(&self, var_decl: &swc_ecma_ast::VarDecl) -> Vec<StableBTreeMapNode> {
        var_decl
            .decls
            .iter()
            .filter_map(|var_declarator| match &var_declarator.init {
                Some(init) => match &**init {
                    Expr::New(new_expr)
                        if matches!(
                            &*new_expr.callee,
                            Expr::Ident(ident) if ident.get_name() == "StableBTreeMap"
                        ) =>
                    {
                        let azle_new_expr = AzleNewExpr {
                            new_expr: new_expr.clone(),
                            source_map: &self.source_map,
                        };
                        match azle_new_expr.to_stable_b_tree_map_node() {
                            Ok(stable_b_tree_map_node) => Some(stable_b_tree_map_node),
                            Err(err) => panic!("{}", err),
                        }
                    }
                    _ => None,
                },
                _ => None,
            })
            .collect()
    }
}
