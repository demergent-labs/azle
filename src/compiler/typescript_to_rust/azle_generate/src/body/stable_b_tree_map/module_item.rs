use swc_ecma_ast::{Decl, ModuleDecl, ModuleItem, Stmt};

pub trait AsDecl {
    fn as_decl(&self) -> Option<&Decl>;
}

impl AsDecl for ModuleItem {
    fn as_decl(&self) -> Option<&Decl> {
        match self {
            ModuleItem::Stmt(Stmt::Decl(decl)) => Some(decl),
            ModuleItem::ModuleDecl(ModuleDecl::ExportDecl(export_decl)) => Some(&export_decl.decl),
            _ => None,
        }
    }
}
