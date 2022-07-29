use ic_cdk::export::candid::Nat;
use std::ops::Sub;

#[ic_cdk_macros::query]
fn fac(n: Nat) -> Nat {
    go(n)
}

fn go(m: Nat) -> Nat {
    if m == 0 {
        1.into()
    } else {
        let m_prime = m.clone().sub(1);
        m * go(m_prime)
    }
}
