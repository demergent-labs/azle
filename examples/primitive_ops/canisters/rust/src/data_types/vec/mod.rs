use crate::PerfResult;
use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static VEC_INIT_HEAP_STORAGE_REF_CELL: RefCell<VecInitHeapStorage> = RefCell::default();
}

type VecInitHeapStorage = HashMap<String, Vec<u32>>;

#[ic_cdk_macros::update]
pub fn vec_init_stack(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let mut i = 0;

    while i < num_inits {
        let value: Vec<u32> = if i % 2 == 0 { vec![0, 1, 2, 3, 4, 5, 6, 7, 8, 9] } else { vec![] };
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
pub fn vec_init_heap(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    VEC_INIT_HEAP_STORAGE_REF_CELL.with(|vec_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut vec_init_heap_storage = vec_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            vec_init_heap_storage.insert(
                format!("element{}", i),
                if i % 2 == 0 { vec![0, 1, 2, 3, 4, 5, 6, 7, 8, 9] } else { vec![] }
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