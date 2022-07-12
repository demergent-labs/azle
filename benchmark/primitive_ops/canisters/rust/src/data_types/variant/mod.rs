use crate::PerfResult;
use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static VARIANT_INIT_HEAP_STORAGE_REF_CELL: RefCell<VariantInitHeapStorage> = RefCell::default();
}

#[derive(candid::CandidType, Debug)]
enum Reaction {
    Bad,
    Good,
    ThumbsUp(u32),
    Tip(ic_cdk::export::Principal)
}

type VariantInitHeapStorage = HashMap<String, Reaction>;

#[ic_cdk_macros::update]
pub fn variant_init_stack(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let mut i = 0;

    while i < num_inits {
        let value: Reaction = if i % 2 == 0 { Reaction::ThumbsUp(2) } else { Reaction::Good };
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
pub fn variant_init_heap(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    VARIANT_INIT_HEAP_STORAGE_REF_CELL.with(|variant_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut variant_init_heap_storage = variant_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            variant_init_heap_storage.insert(
                format!("element{}", i),
                if i % 2 == 0 { Reaction::ThumbsUp(2) } else { Reaction::Good }
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