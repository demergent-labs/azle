use crate::PerfResult;
use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static INT_INIT_HEAP_STORAGE_REF_CELL: RefCell<IntInitHeapStorage> = RefCell::default();
}

type IntInitHeapStorage = HashMap<String, ic_cdk::export::candid::Int>;

#[ic_cdk_macros::update]
pub fn int_init_stack(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let mut i = 0;

    while i < num_inits {
        let value: ic_cdk::export::candid::Int = if i % 2 == 0 { ic_cdk::export::candid::Int(170_141_183_460_469_231_731_687_303_715_884_105_727i128.into()) } else { ic_cdk::export::candid::Int(0i128.into()) };
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
pub fn int_init_heap(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    INT_INIT_HEAP_STORAGE_REF_CELL.with(|int_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut int_init_heap_storage = int_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            int_init_heap_storage.insert(
                format!("element{}", i),
                if i % 2 == 0 { ic_cdk::export::candid::Int(170_141_183_460_469_231_731_687_303_715_884_105_727i128.into()) } else { ic_cdk::export::candid::Int(0i128.into()) }
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