use swc_ecma_ast::Program;

pub struct StableStorageVariableInfo {
    migrate: bool,
    name: String,
    rust_type: String,
}

pub fn get_stable_storage_variable_infos(
    programs: &Vec<Program>,
) -> Vec<StableStorageVariableInfo> {
    // TODO find the Stable type alias
    // TODO walk through the members of the type literal and build up the StableStorageVariableInfo

    vec![]
}
