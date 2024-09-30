#[allow(unused)]
pub async fn chunk() {
    let id = ic_cdk::id();
    let method = "_azle_chunk";
    let args_raw = [68, 73, 68, 76, 0, 0]; // '()' pre encoded
    let _ = ic_cdk::api::call::call_raw128(id, method, args_raw, 0).await;
}
