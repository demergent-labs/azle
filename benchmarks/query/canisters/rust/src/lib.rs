use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static QUERY_BOOL_INIT_HEAP_STORAGE_REF_CELL: RefCell<QueryBoolInitHeapStorage> = RefCell::default();
}

type QueryBoolInitHeapStorage = HashMap<String, bool>;

#[derive(candid::CandidType)]
struct QueryBoolResult {
    boolean: bool,
    wasm_instructions: u64
}

#[ic_cdk_macros::query]
fn query_empty() -> u64 {
    ic_cdk::api::call::performance_counter(0)
}

#[ic_cdk_macros::query]
fn query_bool_init_stack(num_inits: u32) -> QueryBoolResult {
    let mut i = 0;
    let mut boolean = false;

    while i < num_inits {
        boolean = if i % 2 == 0 { true } else { false };
        i += 1;
    }

    QueryBoolResult {
        boolean,
        wasm_instructions: ic_cdk::api::call::performance_counter(0)
    }
}

#[ic_cdk_macros::query]
fn query_bool_init_heap(num_inits: u32) -> QueryBoolResult {
    QUERY_BOOL_INIT_HEAP_STORAGE_REF_CELL.with(|query_bool_init_heap_storage_ref_cell| {
        let mut i = 0;
        let mut query_bool_init_head_storage = query_bool_init_heap_storage_ref_cell.borrow_mut();

        while i < num_inits {
            query_bool_init_head_storage.insert(
                format!("bool{}", i),
                if i % 2 == 0 { true } else { false }
            );
            
            i += 1;
        }
        
        QueryBoolResult {
            boolean: if let Some(boolean) = query_bool_init_head_storage.get("bool0") { boolean.clone() } else { true },
            wasm_instructions: ic_cdk::api::call::performance_counter(0)
        }
    })
}

// TODO The size of the binary (at least the string size, so the JS size) does not seem to matter
// TODO next steps are figuring out if it's just the VM, which I think it is
// TODO If we are using the VM inefficiently, then that's good
// TODO but I fear we are using the VM correctly and it's simply inefficient

// TODO we want to set this up more similarly to Azle
// TODO store the context, retrieve it, etc
// TODO also do a blank one and cut out that cycle cost as a fixed cost

// fn custom_getrandom(_buf: &mut [u8]) -> Result<(), getrandom::Error> { Ok(()) }

// getrandom::register_custom_getrandom!(custom_getrandom);

// #[ic_cdk_macros::query]
// fn query_boa() -> u64 {
//     ic_cdk::api::print(MAIN_JS);

//     let mut context = boa_engine::Context::default();

//     let return_value = context.eval(r#"
//         const string = 'hello there sir';
//     "#).unwrap();

//     ic_cdk::api::call::performance_counter(0)
// }