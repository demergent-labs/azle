use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static INT8_INIT_HEAP_STORAGE_REF_CELL: RefCell<Int8InitHeapStorage> = RefCell::default();
}

type Int8InitHeapStorage = HashMap<String, i8>;

#[ic_cdk_macros::update]
pub fn int8_init_stack(num_inits: u32) -> u64 {
    let mut i = 0;

    while i < num_inits {
        let value: i8 = if i % 2 == 0 { 127 } else { 0 };
        bencher::black_box(&value); // Trying to ensure that the value assignment above is not optimized away
        i += 1;
    }

    ic_cdk::api::call::performance_counter(0)
}

#[ic_cdk_macros::update]
pub fn int8_init_heap(num_inits: u32) -> u64 {
    INT8_INIT_HEAP_STORAGE_REF_CELL.with(|int8_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut int8_init_heap_storage = int8_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            int8_init_heap_storage.insert(
                format!("element{}", i),
                if i % 2 == 0 { 127 } else { 0 }
            );
            
            i += 1;
        }
    });

    ic_cdk::api::call::performance_counter(0)
}