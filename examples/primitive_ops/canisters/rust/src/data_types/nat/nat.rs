use crate::PerfResult;
use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static NAT_INIT_HEAP_STORAGE_REF_CELL: RefCell<NatInitHeapStorage> = RefCell::default();
}

type NatInitHeapStorage = HashMap<String, ic_cdk::export::candid::Nat>;

#[ic_cdk_macros::update]
pub fn nat_init_stack(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    let mut i = 0;

    while i < num_inits {
        let value: ic_cdk::export::candid::Nat = if i % 2 == 0 { ic_cdk::export::candid::Nat(340_282_366_920_938_463_463_374_607_431_768_211_455u128.into()) } else { ic_cdk::export::candid::Nat(0u128.into()) };
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
pub fn nat_init_heap(num_inits: u32) -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);

    NAT_INIT_HEAP_STORAGE_REF_CELL.with(|nat_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut nat_init_heap_storage = nat_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            nat_init_heap_storage.insert(
                format!("element{}", i),
                if i % 2 == 0 { ic_cdk::export::candid::Nat(340_282_366_920_938_463_463_374_607_431_768_211_455u128.into()) } else { ic_cdk::export::candid::Nat(0u128.into()) }
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