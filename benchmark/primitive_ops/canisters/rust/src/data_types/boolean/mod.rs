use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static BOOLEAN_INIT_HEAP_STORAGE_REF_CELL: RefCell<BooleanInitHeapStorage> = RefCell::default();
}

type BooleanInitHeapStorage = HashMap<String, bool>;

#[derive(candid::CandidType)]
pub struct BooleanResult {
    value: bool,
    wasm_instructions: u64
}

#[ic_cdk_macros::update]
pub fn boolean_init_stack(num_inits: u32) -> BooleanResult {
    let mut i = 0;
    let mut value = false;

    while i < num_inits {
        value = if i % 2 == 0 { true } else { false };
        i += 1;
    }

    BooleanResult {
        value,
        wasm_instructions: ic_cdk::api::call::performance_counter(0)
    }
}

#[ic_cdk_macros::update]
pub fn boolean_init_heap(num_inits: u32) -> BooleanResult {
    BOOLEAN_INIT_HEAP_STORAGE_REF_CELL.with(|boolean_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut boolean_init_heap_storage = boolean_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            boolean_init_heap_storage.insert(
                format!("bool{}", i),
                if i % 2 == 0 { true } else { false }
            );
            
            i += 1;
        }
        
        BooleanResult {
            value: if let Some(value) = boolean_init_heap_storage.get("bool0") { value.clone() } else { true },
            wasm_instructions: ic_cdk::api::call::performance_counter(0)
        }
    })
}