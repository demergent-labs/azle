use ic_cdk::api::{caller, is_controller};

#[allow(unused)]
pub fn guard_against_non_controllers() -> Result<(), String> {
    if is_controller(&caller()) {
        return Ok(());
    }
    return Err(
        "Not Authorized: only controllers of this canister may call this method".to_string(),
    );
}
