#[ic_cdk_macros::query]
fn fac(n: u128) -> u128 {
    go(n)
}

fn go(m: u128) -> u128 {
    if m == 0 {
        1
    } else {
        m * go(m - 1)
    }
}
