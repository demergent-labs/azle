use std::str::FromStr;

use ic_cdk::export::Principal;
use std::cell::RefCell;

thread_local! {
    static SOMEONE: RefCell<Principal> = RefCell::new(
        Principal::from_str("aaaaa-aa").unwrap()
    );
    static INSTALLER: RefCell<Principal> = RefCell::new(
        Principal::from_str("aaaaa-aa").unwrap()
    );
}

// Manually save the calling principal and argument for later access.
#[ic_cdk_macros::init]
fn init(somebody: Principal) {
    INSTALLER.with(|installer| *installer.borrow_mut() = ic_cdk::caller());
    SOMEONE.with(|someone| *someone.borrow_mut() = somebody);
}

// Manually re-save these variables after new deploys.
#[ic_cdk_macros::post_upgrade]
fn post_upgrade(somebody: Principal) {
    INSTALLER.with(|installer| *installer.borrow_mut() = ic_cdk::caller());
    SOMEONE.with(|someone| *someone.borrow_mut() = somebody);
}

// Return the principal identifier of the wallet canister that installed this
// canister.
#[ic_cdk_macros::query]
fn installer() -> Principal {
    INSTALLER.with(|installer| *installer.borrow())
}

// Return the principal identifier that was provided as an installation
// argument to this canister.
#[ic_cdk_macros::query]
fn argument() -> Principal {
    SOMEONE.with(|someone| *someone.borrow())
}

// Return the principal identifier of the caller of this method.
#[ic_cdk_macros::query]
fn whoami() -> Principal {
    ic_cdk::api::caller()
}

// Return the principal identifier of this canister.
#[ic_cdk_macros::update]
async fn id() -> Principal {
    let call_result: Result<(Principal,), _> =
        ic_cdk::api::call::call(ic_cdk::id(), "whoami", ()).await;
    call_result.unwrap().0
}

// Return the principal identifier of this canister via the `ic_cdk` API.
// This is much quicker than `id()` above because it isn't making a cross-
// canister call to itself. Additionally, it can now be a `Query` which means it
// doesn't have to go through consensus.
#[ic_cdk_macros::query]
fn id_quick() -> Principal {
    ic_cdk::id()
}
