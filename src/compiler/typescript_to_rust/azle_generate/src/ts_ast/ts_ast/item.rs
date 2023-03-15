use swc_common::SourceMap;
use swc_ecma_ast::ModuleItem;

pub struct Item {
    module_item: ModuleItem,
    pub source_map: SourceMap,
}

impl Item {
    pub fn new(module: ModuleItem, source_map: SourceMap) -> Self {
        Self {
            module_item: module,
            source_map,
        }
    }
}

impl std::ops::Deref for Item {
    type Target = ModuleItem;

    fn deref(&self) -> &Self::Target {
        &self.module_item
    }
}
