use crate::PerfResult;
use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static RECORD_INIT_HEAP_STORAGE_REF_CELL: RefCell<RecordInitHeapStorage> = RefCell::default();
}

#[derive(candid::CandidType, Debug)]
struct User {
    principal: ic_cdk::export::Principal,
    age: u32,
    deceased: bool,
    dna: Vec<u8>,
    height: f32,
    username: String
}

type RecordInitHeapStorage = HashMap<String, User>;

#[ic_cdk_macros::update]
pub fn record_init_stack(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let mut i = 0;

    while i < num_inits {
        let value: User = if i % 2 == 0 { User {
            principal: ic_cdk::export::Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").unwrap(),
            age: 43,
            deceased: false,
            dna: vec![0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            height: 6.25,
            username: "djohn".to_string()
        } } else { User {
            principal: ic_cdk::export::Principal::from_text("aaaaa-aa").unwrap(),
            age: 123,
            deceased: true,
            dna: vec![1, 0, 2, 3, 4, 5, 6, 7, 8, 9],
            height: 5.45,
            username: "gramps".to_string()
        } };
        bencher::black_box(&value); // Trying to ensure that the value assignment above is not optimized away
        i += 1;
    }

    let perf_end = ic_cdk::api::call::performance_counter(0);

    PerfResult {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic_cdk::api::call::performance_counter(0)
    }
}

#[ic_cdk_macros::update]
pub fn record_init_heap(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    RECORD_INIT_HEAP_STORAGE_REF_CELL.with(|record_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut record_init_heap_storage = record_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            record_init_heap_storage.insert(
                format!("element{}", i),
                if i % 2 == 0 { User {
                    principal: ic_cdk::export::Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").unwrap(),
                    age: 43,
                    deceased: false,
                    dna: vec![0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    height: 6.25,
                    username: "djohn".to_string()
                } } else { User {
                    principal: ic_cdk::export::Principal::from_text("aaaaa-aa").unwrap(),
                    age: 123,
                    deceased: true,
                    dna: vec![1, 0, 2, 3, 4, 5, 6, 7, 8, 9],
                    height: 5.45,
                    username: "gramps".to_string()
                } }
            );
            
            i += 1;
        }
    });

    let perf_end = ic_cdk::api::call::performance_counter(0);

    PerfResult {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic_cdk::api::call::performance_counter(0)
    }
}