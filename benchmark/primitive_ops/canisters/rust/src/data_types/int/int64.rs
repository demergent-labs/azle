use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static INT64_INIT_HEAP_STORAGE_REF_CELL: RefCell<Int64InitHeapStorage> = RefCell::default();
}

type Int64InitHeapStorage = HashMap<String, i64>;

#[ic_cdk_macros::update]
pub fn int64_init_stack(num_inits: u32) -> u64 {
    let mut i = 0;

    while i < num_inits {
        let value: i64 = if i % 2 == 0 { 9_223_372_036_854_775_807 } else { 0 };
        bencher::black_box(&value); // Trying to ensure that the value assignment above is not optimized away
        i += 1;
    }

    ic_cdk::api::call::performance_counter(0)
}

#[ic_cdk_macros::update]
pub fn int64_init_heap(num_inits: u32) -> u64 {
    INT64_INIT_HEAP_STORAGE_REF_CELL.with(|int64_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut int64_init_heap_storage = int64_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            int64_init_heap_storage.insert(
                format!("element{}", i),
                if i % 2 == 0 { 9_223_372_036_854_775_807 } else { 0 }
            );
            
            i += 1;
        }
    });

    ic_cdk::api::call::performance_counter(0)
}