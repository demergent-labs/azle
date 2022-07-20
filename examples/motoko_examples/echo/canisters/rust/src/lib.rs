#[ic_cdk_macros::query]
pub fn say(phrase: String) -> String {
    return phrase;
}
