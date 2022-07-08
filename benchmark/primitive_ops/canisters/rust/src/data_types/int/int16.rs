use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static INT16_INIT_HEAP_STORAGE_REF_CELL: RefCell<Int16InitHeapStorage> = RefCell::default();
}

type Int16InitHeapStorage = HashMap<String, i16>;

#[ic_cdk_macros::update]
pub fn int16_init_stack(num_inits: u32) -> u64 {
    let mut i = 0;

    while i < num_inits {
        let value: i16 = if i % 2 == 0 { 32_767 } else { 0 };
        ic_cdk::println!("{}", value);
        i += 1;
    }

    ic_cdk::api::call::performance_counter(0)
}

#[ic_cdk_macros::update]
pub fn int16_init_heap(num_inits: u32) -> u64 {
    INT16_INIT_HEAP_STORAGE_REF_CELL.with(|int16_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut int16_init_heap_storage = int16_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            int16_init_heap_storage.insert(
                format!("element{}", i),
                if i % 2 == 0 { 32_767 } else { 0 }
            );
            
            i += 1;
        }
    });

    ic_cdk::api::call::performance_counter(0)
}