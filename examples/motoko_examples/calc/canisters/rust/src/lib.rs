use std::cell::RefCell;
use candid::Int;

thread_local! {
    static COUNTER_REF_CELL: RefCell<Int> = RefCell::new(Int::from(0));
}

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

#[ic_cdk_macros::update]
pub fn add(n: Int) -> Int {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let result = COUNTER_REF_CELL.with(|counter_ref_cell| {
        *counter_ref_cell.borrow_mut() += n;
        counter_ref_cell.borrow().clone()
    });

    let perf_end = ic_cdk::api::call::performance_counter(0);

    record_performance(perf_start, perf_end);

    result
}

#[ic_cdk_macros::update]
pub fn sub(n: Int) -> Int {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let result = COUNTER_REF_CELL.with(|counter_ref_cell|{
        *counter_ref_cell.borrow_mut() -= n;
        counter_ref_cell.borrow().clone()
    });

    let perf_end = ic_cdk::api::call::performance_counter(0);

    record_performance(perf_start, perf_end);

    result
}

#[ic_cdk_macros::update]
pub fn mul(n: Int) -> Int {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let result = COUNTER_REF_CELL.with(|counter_ref_cell| {
        *counter_ref_cell.borrow_mut() *= n;
        counter_ref_cell.borrow().clone()
    });

    let perf_end = ic_cdk::api::call::performance_counter(0);

    record_performance(perf_start, perf_end);

    result
}

#[ic_cdk_macros::update]
pub fn div(n: Int) -> Option<Int> {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let result = COUNTER_REF_CELL.with(|counter_ref_cell| {
        if n == 0 {
            return None;
        }
        *counter_ref_cell.borrow_mut() /= n;
        Some(COUNTER_REF_CELL.with(|counter_ref_cell| counter_ref_cell.borrow().clone()))
    });

    let perf_end = ic_cdk::api::call::performance_counter(0);

    record_performance(perf_start, perf_end);

    result
}

#[ic_cdk_macros::update]
pub fn clearall() -> () {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    COUNTER_REF_CELL.with(|counter_ref_cell| *counter_ref_cell.borrow_mut() = Int::from(0));

    let perf_end = ic_cdk::api::call::performance_counter(0);

    record_performance(perf_start, perf_end);
}
