use swc_ecma_ast::{FnDecl, ModuleItem};

pub trait AsExportedFnDecl {
    fn as_exported_fn_decl(&self) -> Option<FnDecl>;
}

impl AsExportedFnDecl for ModuleItem {
    fn as_exported_fn_decl(&self) -> Option<FnDecl> {
        Some(
            self.as_module_decl()?
                .as_export_decl()?
                .decl
                .as_fn_decl()?
                .clone(),
        )
    }
}
