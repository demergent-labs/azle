use swc_ecma_ast::{Decl, Expr, ModuleItem, Program, Stmt};

use crate::{
    stable_b_tree_map::AzleStableBTreeMapNode,
    ts_ast::{AzleNewExpr, AzleProgram, GetName},
};

impl AzleProgram {
    pub fn azle_stable_b_tree_map_nodes(&self) -> Vec<AzleStableBTreeMapNode> {
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
            ModuleItem::Stmt(stmt) => match stmt {
                Stmt::Decl(decl) => Some(decl),
                _ => None,
            },
            ModuleItem::ModuleDecl(module_decl) => match module_decl {
                swc_ecma_ast::ModuleDecl::ExportDecl(export_decl) => Some(&export_decl.decl),
                _ => None,
            },
        }
    }

    fn process_decl(&self, decl: &Decl) -> Vec<AzleStableBTreeMapNode> {
        match decl {
            Decl::Var(var_decl) => self.process_var_decl(var_decl),
            _ => vec![],
        }
    }

    fn process_var_decl(&self, var_decl: &swc_ecma_ast::VarDecl) -> Vec<AzleStableBTreeMapNode> {
        var_decl
            .decls
            .iter()
            .fold(vec![], |inner_acc, var_declarator| {
                match &var_declarator.init {
                    Some(init) => match &**init {
                        Expr::New(new_expr) => match &*new_expr.callee {
                            Expr::Ident(ident) => {
                                if ident.get_name() == "StableBTreeMap" {
                                    let azle_new_expr = AzleNewExpr {
                                        new_expr: new_expr.clone(),
                                        source_map: &self.source_map,
                                    };

                                    let stable_b_tree_map_node_option =
                                        azle_new_expr.to_azle_stable_b_tree_map_node();
                                    match stable_b_tree_map_node_option {
                                        Ok(stable_b_tree_map_node) => {
                                            vec![inner_acc, vec![stable_b_tree_map_node]].concat()
                                        }
                                        Err(err) => panic!("{}", err),
                                    }
                                } else {
                                    inner_acc
                                }
                            }
                            _ => inner_acc,
                        },
                        _ => inner_acc,
                    },
                    None => inner_acc,
                }
            })
    }
}
