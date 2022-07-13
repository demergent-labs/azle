use crate::PerfResult;
use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static PRINCIPAL_INIT_HEAP_STORAGE_REF_CELL: RefCell<PrincipalInitHeapStorage> = RefCell::default();
}

type PrincipalInitHeapStorage = HashMap<String, ic_cdk::export::Principal>;

#[ic_cdk_macros::update]
pub fn principal_init_stack(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let mut i = 0;

    while i < num_inits {
        let value: ic_cdk::export::Principal = if i % 2 == 0 { ic_cdk::export::Principal::from_text("rrkah-fqaaa-aaaaa-aaaaq-cai").unwrap() } else { ic_cdk::export::Principal::from_text("aaaaa-aa").unwrap() };
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
pub fn principal_init_heap(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    PRINCIPAL_INIT_HEAP_STORAGE_REF_CELL.with(|principal_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut principal_init_heap_storage = principal_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            principal_init_heap_storage.insert(
                format!("element{}", i),
                if i % 2 == 0 { ic_cdk::export::Principal::from_text("rrkah-fqaaa-aaaaa-aaaaq-cai").unwrap() } else { ic_cdk::export::Principal::from_text("aaaaa-aa").unwrap() }
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