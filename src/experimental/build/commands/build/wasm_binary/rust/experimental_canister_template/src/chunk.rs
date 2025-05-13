#[allow(unused)]
pub async fn chunk() {
    let id = ic_cdk::api::canister_self();
    let method = "_azle_chunk";
    let args_raw = [68, 73, 68, 76, 0, 0]; // pre-encoded Candid empty params
    let _ = ic_cdk::call::Call::unbounded_wait(id, method)
        .with_raw_args(&args_raw)
        .await;
}
