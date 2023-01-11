use swc_ecma_ast::{Decl, Expr, ModuleItem, Program, Stmt};

use super::AzleProgram;
use crate::{
    stable_b_tree_map_node::AzleStableBTreeMapNode,
    ts_ast::{AzleNewExpr, GetName},
};

impl AzleProgram {
    pub fn azle_stable_b_tree_map_nodes(&self) -> Vec<AzleStableBTreeMapNode> {
        match &self.program {
            Program::Module(module) => {
                module
                    .body
                    .iter()
                    .fold(vec![], |acc, module_item| match module_item {
                        ModuleItem::Stmt(stmt) => match stmt {
                            Stmt::Decl(decl) => match decl {
                                Decl::Var(var_decl) => {
                                    let stable_maps_in_var_decl_decls = var_decl.decls.iter().fold(
                                        vec![],
                                        |inner_acc, var_declarator| match &var_declarator.init {
                                            Some(init) => match &**init {
                                                Expr::New(new_expr) => match &*new_expr.callee {
                                                    Expr::Ident(ident) => {
                                                        if ident.get_name() == "StableBTreeMap" {
                                                            let azle_new_expr = AzleNewExpr {
                                                                new_expr: new_expr.clone(),
                                                                source_map: &self.source_map
                                                            };

                                                            let stable_b_tree_map_node_option = azle_new_expr.to_azle_stable_b_tree_map_node();
                                                            match stable_b_tree_map_node_option {
                                                                Ok(stable_b_tree_map_node) => vec![inner_acc, vec![stable_b_tree_map_node]].concat(),
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
                                        },
                                    );
                                    vec![acc, stable_maps_in_var_decl_decls].concat()
                                }
                                _ => acc,
                            },
                            _ => acc,
                        },
                        ModuleItem::ModuleDecl(module_decl) => {
                            // TODO: This is copy/pasted from above. Go back and consolidate this.
                            match module_decl {
                                swc_ecma_ast::ModuleDecl::ExportDecl(export_decl) => {
                                    match &export_decl.decl {
                                        Decl::Var(var_decl) => {
                                            let stable_maps_in_var_decl_decls = var_decl.decls.iter().fold(
                                                vec![],
                                                |inner_acc, var_declarator| match &var_declarator.init {
                                                    Some(init) => match &**init {
                                                        Expr::New(new_expr) => match &*new_expr.callee {
                                                            Expr::Ident(ident) => {
                                                                if ident.get_name() == "StableBTreeMap" {
                                                                    let azle_new_expr = AzleNewExpr {
                                                                        new_expr: new_expr.clone(),
                                                                        source_map: &self.source_map
                                                                    };

                                                                    let stable_b_tree_map_node_option = azle_new_expr.to_azle_stable_b_tree_map_node();
                                                                    match stable_b_tree_map_node_option {
                                                                        Ok(stable_b_tree_map_node) => vec![inner_acc, vec![stable_b_tree_map_node]].concat(),
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
                                                },
                                            );
                                            vec![acc, stable_maps_in_var_decl_decls].concat()
                                        },
                                        _ => acc,
                                    }
                                },
                                _ => acc,
                            }
                        },
                    })
            }
            Program::Script(_) => vec![],
        }
    }
}
