#[ic_cdk_macros::query]
pub fn get_bytes(bytes: Vec<u8>) -> Vec<u8> {
    bytes
}