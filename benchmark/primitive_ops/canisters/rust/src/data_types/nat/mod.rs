use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static NAT_INIT_HEAP_STORAGE_REF_CELL: RefCell<NatInitHeapStorage> = RefCell::default();
}

type NatInitHeapStorage = HashMap<String, ic_cdk::export::candid::Nat>;

#[derive(candid::CandidType)]
pub struct NatResult {
    value: ic_cdk::export::candid::Nat,
    wasm_instructions: u64
}

#[ic_cdk_macros::update]
pub fn nat_init_stack(num_inits: u32) -> NatResult {
    let mut i = 0;
    let mut value = ic_cdk::export::candid::Nat(0u128.into());

    while i < num_inits {
        value = if i % 2 == 0 { ic_cdk::export::candid::Nat(340_282_366_920_938_463_463_374_607_431_768_211_455u128.into()) } else { ic_cdk::export::candid::Nat(0u128.into()) };
        i += 1;
    }

    NatResult {
        value,
        wasm_instructions: ic_cdk::api::call::performance_counter(0)
    }
}

#[ic_cdk_macros::update]
pub fn nat_init_heap(num_inits: u32) -> NatResult {
    NAT_INIT_HEAP_STORAGE_REF_CELL.with(|nat_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut nat_init_heap_storage = nat_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            nat_init_heap_storage.insert(
                format!("bool{}", i),
                if i % 2 == 0 { ic_cdk::export::candid::Nat(340_282_366_920_938_463_463_374_607_431_768_211_455u128.into()) } else { ic_cdk::export::candid::Nat(0u128.into()) }
            );
            
            i += 1;
        }
        
        NatResult {
            value: if let Some(value) = nat_init_heap_storage.get("bool0") { value.clone() } else { ic_cdk::export::candid::Nat(0u128.into()) },
            wasm_instructions: ic_cdk::api::call::performance_counter(0)
        }
    })
}