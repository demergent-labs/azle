use std::cell::RefCell;

thread_local! {
    static COUNTER: RefCell<u128> = RefCell::new(0);
}

#[ic_cdk_macros::query]
fn get() -> u128 {
    COUNTER.with(|counter| counter.borrow().clone())
}

#[ic_cdk_macros::update]
fn inc() -> () {
    COUNTER.with(|counter| *counter.borrow_mut() += 1)
}

#[ic_cdk_macros::update]
fn set(input: u128) -> () {
    COUNTER.with(|counter| *counter.borrow_mut() = input)
}
