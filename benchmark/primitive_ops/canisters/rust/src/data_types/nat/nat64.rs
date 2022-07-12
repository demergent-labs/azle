use crate::PerfResult;
use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static NAT64_INIT_HEAP_STORAGE_REF_CELL: RefCell<Nat64InitHeapStorage> = RefCell::default();
}

type Nat64InitHeapStorage = HashMap<String, u64>;

#[ic_cdk_macros::update]
pub fn nat64_init_stack(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let mut i = 0;

    while i < num_inits {
        let value: u64 = if i % 2 == 0 { 18_446_744_073_709_551_615 } else { 0 };
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
pub fn nat64_init_heap(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    NAT64_INIT_HEAP_STORAGE_REF_CELL.with(|nat64_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut nat64_init_heap_storage = nat64_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            nat64_init_heap_storage.insert(
                format!("element{}", i),
                if i % 2 == 0 { 18_446_744_073_709_551_615 } else { 0 }
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