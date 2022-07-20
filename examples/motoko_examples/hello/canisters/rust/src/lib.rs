#[ic_cdk_macros::query]
pub fn greet(name: String) -> String {
    format!("Hello, {name}!")
}
