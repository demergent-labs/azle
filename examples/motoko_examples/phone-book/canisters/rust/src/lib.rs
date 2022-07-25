use std::cell::RefCell;
use std::collections::HashMap;

thread_local! {
    static PHONE_BOOK_REF_CELL: RefCell<PhoneBook> = RefCell::default();
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

#[derive(Clone, candid::CandidType, serde::Deserialize)]
pub struct Entry {
    desc: String,
    phone: String,
}

type PhoneBook = HashMap<String, Entry>;

#[ic_cdk_macros::update]
pub fn insert(name: String, entry: Entry) -> () {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    PHONE_BOOK_REF_CELL.with(|phone_book_ref_cell| {
        phone_book_ref_cell.borrow_mut().insert(name.clone(), entry.clone())
    });

    let perf_end = ic_cdk::api::call::performance_counter(0);

    record_performance(perf_start, perf_end);
}

#[ic_cdk_macros::query]
pub fn lookup(name: String) -> Option<Entry> {
    PHONE_BOOK_REF_CELL.with(|phone_book_ref_cell| {
        phone_book_ref_cell
            .borrow()
            .get(&name)
            .cloned()
    })
}
