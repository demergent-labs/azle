#[allow(unused)]
pub fn guard_against_non_controllers() -> Result<(), String> {
    if ic_cdk::api::is_controller(&ic_cdk::api::caller()) {
        return Ok(());
    }
    return Err(
        "Not Authorized: only controllers of this canister may call this method".to_string(),
    );
}
