use std::cell::RefCell;

thread_local! {
    static COUNTER: RefCell<u128> = RefCell::new(0);
    static PERF_RESULT_REF_CELL: RefCell<Option<PerfResult>> = RefCell::default();
}

#[derive(candid::CandidType, Clone)]
pub struct PerfResult {
    wasm_body_only: u64,
    wasm_including_prelude: u64,
}

#[ic_cdk_macros::query]
pub fn get_perf_result() -> Option<PerfResult> {
    PERF_RESULT_REF_CELL
        .with(|perf_result_ref_cell| perf_result_ref_cell.borrow().as_ref().cloned())
}

#[ic_cdk_macros::query]
fn get() -> u128 {
    COUNTER.with(|counter| counter.borrow().clone())
}

#[ic_cdk_macros::update]
fn inc() -> () {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    COUNTER.with(|counter| *counter.borrow_mut() += 1);

    let perf_end = ic_cdk::api::call::performance_counter(0);

    PERF_RESULT_REF_CELL.with(|perf_result_ref_cell| {
        let mut perf_result = perf_result_ref_cell.borrow_mut();

        *perf_result = Some(PerfResult {
            wasm_body_only: perf_end - perf_start,
            wasm_including_prelude: ic_cdk::api::call::performance_counter(0),
        })
    });
}

#[ic_cdk_macros::update]
fn set(input: u128) -> () {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    COUNTER.with(|counter| *counter.borrow_mut() = input);

    let perf_end = ic_cdk::api::call::performance_counter(0);

    PERF_RESULT_REF_CELL.with(|perf_result_ref_cell| {
        let mut perf_result = perf_result_ref_cell.borrow_mut();

        *perf_result = Some(PerfResult {
            wasm_body_only: perf_end - perf_start,
            wasm_including_prelude: ic_cdk::api::call::performance_counter(0),
        })
    });
}
