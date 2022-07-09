use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static OPT_INIT_HEAP_STORAGE_REF_CELL: RefCell<OptInitHeapStorage> = RefCell::default();
}

type OptInitHeapStorage = HashMap<String, Option<bool>>;

#[ic_cdk_macros::update]
pub fn opt_init_stack(num_inits: u32) -> u64 {
    let mut i = 0;

    while i < num_inits {
        let value: Option<bool> = if i % 2 == 0 { Some(true) } else { None };
        std::convert::identity(value); // Trying to ensure that the value assignment above is not optimized away
        i += 1;
    }

    ic_cdk::api::call::performance_counter(0)
}

#[ic_cdk_macros::update]
pub fn opt_init_heap(num_inits: u32) -> u64 {
    OPT_INIT_HEAP_STORAGE_REF_CELL.with(|opt_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut opt_init_heap_storage = opt_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            opt_init_heap_storage.insert(
                format!("element{}", i),
                if i % 2 == 0 { Some(true) } else { None }
            );
            
            i += 1;
        }
    });

    ic_cdk::api::call::performance_counter(0)
}