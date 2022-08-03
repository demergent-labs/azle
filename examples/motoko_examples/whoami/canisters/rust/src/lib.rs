use ic_cdk::export::Principal;
use std::cell::RefCell;
use std::str::FromStr;

thread_local! {
    static SOMEONE_REF_CELL: RefCell<Principal> = RefCell::new(
        Principal::from_str("aaaaa-aa").unwrap()
    );
    static INSTALLER_REF_CELL: RefCell<Principal> = RefCell::new(
        Principal::from_str("aaaaa-aa").unwrap()
    );
}

//#region Performance
#[derive(candid::CandidType, Clone)]
pub struct PerfResult {
    wasm_body_only: u64,
    wasm_including_prelude: u64,
}

thread_local! {
    static PERF_RESULT_REF_CELL: RefCell<Option<PerfResult>> = RefCell::default();
}

#[ic_cdk_macros::query]
pub fn get_perf_result() -> Option<PerfResult> {
    PERF_RESULT_REF_CELL
        .with(|perf_result_ref_cell| perf_result_ref_cell.borrow().as_ref().cloned())
}

fn record_performance(start: u64, end: u64) -> () {
    PERF_RESULT_REF_CELL.with(|perf_result_ref_cell| {
        let mut perf_result = perf_result_ref_cell.borrow_mut();

        *perf_result = Some(PerfResult {
            wasm_body_only: end - start,
            wasm_including_prelude: ic_cdk::api::call::performance_counter(0),
        })
    });
}
//#endregion

// Manually save the calling principal and argument for later access.
#[ic_cdk_macros::init]
fn init(somebody: Principal) {
    INSTALLER_REF_CELL.with(|installer_ref_cell| *installer_ref_cell.borrow_mut() = ic_cdk::caller());
    SOMEONE_REF_CELL.with(|someone_ref_cell| *someone_ref_cell.borrow_mut() = somebody);
}

// Manually re-save these variables after new deploys.
#[ic_cdk_macros::post_upgrade]
fn post_upgrade(somebody: Principal) {
    INSTALLER_REF_CELL.with(|installer_ref_cell| *installer_ref_cell.borrow_mut() = ic_cdk::caller());
    SOMEONE_REF_CELL.with(|someone_ref_cell| *someone_ref_cell.borrow_mut() = somebody);
}

// Return the principal identifier of the wallet canister that installed this
// canister.
#[ic_cdk_macros::query]
fn installer_ref_cell() -> Principal {
    INSTALLER_REF_CELL.with(|installer_ref_cell| *installer_ref_cell.borrow())
}

// Return the principal identifier that was provided as an installation
// argument to this canister.
#[ic_cdk_macros::query]
fn argument() -> Principal {
    SOMEONE_REF_CELL.with(|someone_ref_cell| *someone_ref_cell.borrow())
}

// Return the principal identifier of the caller of this method.
#[ic_cdk_macros::update]
fn whoami() -> Principal {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let caller = ic_cdk::api::caller();

    let perf_end = ic_cdk::api::call::performance_counter(0);
    record_performance(perf_start, perf_end);

    caller
}

// Return the principal identifier of this canister.
#[ic_cdk_macros::update]
async fn id() -> Principal {
    let pre_xnet_call_perf_start = ic_cdk::api::call::performance_counter(0);
    let pre_xnet_call_perf_end = ic_cdk::api::call::performance_counter(0);

    let call_result = ic_cdk::api::call::call::<(), (Principal,)>(ic_cdk::id(), "whoami", ()).await;

    let post_xnet_call_perf_start = ic_cdk::api::call::performance_counter(0);

    let response = call_result.unwrap().0;

    let post_xnet_call_perf_end = ic_cdk::api::call::performance_counter(0);
    let pre_xnet_call_perf = pre_xnet_call_perf_end - pre_xnet_call_perf_start;
    let post_xnet_call_perf = post_xnet_call_perf_end - post_xnet_call_perf_start;
    let total_perf = pre_xnet_call_perf + post_xnet_call_perf;
    PERF_RESULT_REF_CELL.with(|perf_result_ref_cell| {
        let mut perf_result = perf_result_ref_cell.borrow_mut();

        *perf_result = Some(PerfResult {
            wasm_body_only: total_perf,
            wasm_including_prelude: ic_cdk::api::call::performance_counter(0),
        })
    });

    response
}

// Return the principal identifier of this canister via the `ic_cdk` API.
// This is much quicker than `id()` above because it isn't making a cross-
// canister call to itself. Additionally, it can now be a `Query` which means it
// doesn't have to go through consensus.
#[ic_cdk_macros::query]
fn id_quick() -> Principal {
    ic_cdk::id()
}
