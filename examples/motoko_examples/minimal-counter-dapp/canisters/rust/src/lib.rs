use ic_cdk::export::candid::Nat;
use std::cell::RefCell;

thread_local! {
    static COUNTER: RefCell<Nat> = RefCell::new(Nat::from(0));
}

#[ic_cdk_macros::update]
fn count() -> Nat {
    COUNTER.with(|counter| {
        *counter.borrow_mut() += 1;
        counter.borrow().clone()
    })
}

#[ic_cdk_macros::query]
fn get_count() -> Nat {
    COUNTER.with(|counter| counter.borrow().clone())
}

#[ic_cdk_macros::update]
fn reset() -> Nat {
    COUNTER.with(|counter| {
        *counter.borrow_mut() = Nat::from(0u128);
        counter.borrow().clone()
    })
}
