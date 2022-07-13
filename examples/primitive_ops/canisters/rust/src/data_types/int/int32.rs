use crate::PerfResult;
use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static INT32_INIT_HEAP_STORAGE_REF_CELL: RefCell<Int32InitHeapStorage> = RefCell::default();
}

type Int32InitHeapStorage = HashMap<String, i32>;

#[ic_cdk_macros::update]
pub fn int32_init_stack(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let mut i = 0;

    while i < num_inits {
        let value: i32 = if i % 2 == 0 { 2_147_483_647 } else { 0 };
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
pub fn int32_init_heap(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    INT32_INIT_HEAP_STORAGE_REF_CELL.with(|int32_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut int32_init_heap_storage = int32_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            int32_init_heap_storage.insert(
                format!("element{}", i),
                if i % 2 == 0 { 2_147_483_647 } else { 0 }
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