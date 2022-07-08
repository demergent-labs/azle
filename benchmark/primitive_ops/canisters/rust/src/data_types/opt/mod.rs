use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static OPTION_INIT_HEAP_STORAGE_REF_CELL: RefCell<OptionInitHeapStorage> = RefCell::default();
}

type OptionInitHeapStorage = HashMap<String, Option<bool>>;

#[ic_cdk_macros::update]
pub fn option_init_stack(num_inits: u32) -> u64 {
    let mut i = 0;

    while i < num_inits {
        let value: Option<bool> = if i % 2 == 0 { Some(true) } else { None };
        ic_cdk::println!("{:#?}", value);
        i += 1;
    }

    ic_cdk::api::call::performance_counter(0)
}

#[ic_cdk_macros::update]
pub fn option_init_heap(num_inits: u32) -> u64 {
    OPTION_INIT_HEAP_STORAGE_REF_CELL.with(|option_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut option_init_heap_storage = option_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            option_init_heap_storage.insert(
                format!("element{}", i),
                if i % 2 == 0 { Some(true) } else { None }
            );
            
            i += 1;
        }
    });

    ic_cdk::api::call::performance_counter(0)
}