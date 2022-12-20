use swc_ecma_ast::{Decl, Expr, ModuleItem, Program, Stmt};

use super::AzleProgram;
use crate::{stable_b_tree_map::StableBTreeMap, ts_ast::GetName};

impl AzleProgram {
    pub fn stable_b_tree_maps(&self) -> Vec<StableBTreeMap> {
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
                                                            // TODO: Implement this correctly
                                                            vec![inner_acc, vec![StableBTreeMap {
                                                                id: "TEST_ID".to_string(),
                                                                key_type: "TEST_KEY_TYPE"
                                                                    .to_string(),
                                                                max_key_size: 100u64,
                                                                value_type: "TEST_KEY_TYPE"
                                                                    .to_string(),
                                                                max_value_size: 100u64,
                                                            }]].concat()
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
                        ModuleItem::ModuleDecl(_) => acc,
                    })
            }
            Program::Script(_) => vec![],
        }
    }
}
