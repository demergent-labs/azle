use std::cell::RefCell;

thread_local! {
    static CURRENT_MESSAGE: RefCell<String> = RefCell::new(String::from(""));
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

#[ic_cdk_macros::query]
fn query() -> String {
    CURRENT_MESSAGE.with(|current_message| current_message.borrow().clone())
}

#[ic_cdk_macros::update]
fn update(message: String) -> () {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    CURRENT_MESSAGE.with(|current_message| {
        *current_message.borrow_mut() = message;
    });

    let perf_end = ic_cdk::api::call::performance_counter(0);
    record_performance(perf_start, perf_end);
}
