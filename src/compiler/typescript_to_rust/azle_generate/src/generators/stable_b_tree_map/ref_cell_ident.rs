pub fn generate(memory_id: u8) -> proc_macro2::Ident {
    quote::format_ident!("STABLE_B_TREE_MAP_{}_REF_CELL", memory_id)
}
