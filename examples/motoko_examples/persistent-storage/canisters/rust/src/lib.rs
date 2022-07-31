use std::cell::RefCell;
use candid::Nat;

//#region Performance
#[derive(candid::CandidType, Clone)]
pub struct PerfResult {
    wasm_body_only: u64,
    wasm_including_prelude: u64
}

thread_local! {
    static PERF_RESULT_REF_CELL: RefCell<Option<PerfResult>> = RefCell::default();
}

#[ic_cdk_macros::query]
pub fn get_perf_result() -> Option<PerfResult> {
    PERF_RESULT_REF_CELL.with(|perf_result_ref_cell| perf_result_ref_cell.borrow().as_ref().cloned())
}

fn record_performance(start: u64, end: u64) {
    PERF_RESULT_REF_CELL.with(|perf_result_ref_cell| {
        let mut perf_result = perf_result_ref_cell.borrow_mut();

        *perf_result = Some(PerfResult {
            wasm_body_only: end - start,
            wasm_including_prelude: ic_cdk::api::call::performance_counter(0)
        })
    });
}
//#endregion

#[ic_cdk_macros::init]
pub fn init() {
    ic_cdk::storage::stable_save((Nat::from(0),)).unwrap();
}

#[ic_cdk_macros::update]
pub fn increment() -> Nat {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let stable_storage: (Nat,) = ic_cdk::storage::stable_restore().unwrap();
    let counter = stable_storage.0 + Nat::from(1);
    ic_cdk::storage::stable_save((counter.clone(),)).unwrap();

    let perf_end = ic_cdk::api::call::performance_counter(0);

    record_performance(perf_start, perf_end);
    counter
}

#[ic_cdk_macros::query]
pub fn get() -> Nat {
    let stable_storage: (Nat,) = ic_cdk::storage::stable_restore().unwrap();
    stable_storage.0
}

#[ic_cdk_macros::update]
pub fn reset() -> Nat {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let counter: Nat = Nat::from(0);
    ic_cdk::storage::stable_save((counter.clone(),)).unwrap();

    let perf_end = ic_cdk::api::call::performance_counter(0);

    record_performance(perf_start, perf_end);

    counter
}
