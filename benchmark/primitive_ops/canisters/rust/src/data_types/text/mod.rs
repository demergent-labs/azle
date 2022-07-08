use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static TEXT_INIT_HEAP_STORAGE_REF_CELL: RefCell<TextInitHeapStorage> = RefCell::default();
}

type TextInitHeapStorage = HashMap<String, String>;

#[ic_cdk_macros::update]
pub fn text_init_stack(num_inits: u32) -> u64 {
    let mut i = 0;

    while i < num_inits {
        let value: String = if i % 2 == 0 { "hello".to_string() } else { "".to_string() };
        ic_cdk::println!("{}", value);
        i += 1;
    }

    ic_cdk::api::call::performance_counter(0)
}

#[ic_cdk_macros::update]
pub fn text_init_heap(num_inits: u32) -> u64 {
    TEXT_INIT_HEAP_STORAGE_REF_CELL.with(|text_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut text_init_heap_storage = text_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            text_init_heap_storage.insert(
                format!("element{}", i),
                if i % 2 == 0 { "hello".to_string() } else { "".to_string() }
            );
            
            i += 1;
        }
    });
        
    ic_cdk::api::call::performance_counter(0)
}