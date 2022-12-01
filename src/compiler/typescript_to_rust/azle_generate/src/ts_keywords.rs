// I believe all TS keywords are allowed as property names in objects.
// If that's not the case then we should change to commented out approach below
pub fn ts_keywords() -> Vec<String> {
    vec![]
}

// const TS_KEYWORDS: [&str; 2] = ["async", "etc"];

// pub fn ts_keywords() -> Vec<String> {
//     TS_KEYWORDS
//         .iter()
//         .map(|keyword| keyword.to_string())
//         .collect()
// }
