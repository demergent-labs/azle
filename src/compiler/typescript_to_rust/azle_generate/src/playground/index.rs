#[ic_cdk_macros::query]
#[candid::candid_method(query)]
async fn test() -> u32 {
    Default::default()
}
candid::export_service!();
#[ic_cdk_macros::query(name = "__get_candid_interface_tmp_hack")]
fn export_candid() -> String {
    __export_service()
}
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn write_candid_to_disk() {
        std::fs::write("index.did", export_candid()).unwrap();
    }
}
