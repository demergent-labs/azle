mod data_types {
    mod boolean;
    mod int;
    mod nat;
    // mod null;
}

#[ic_cdk_macros::update]
fn empty() -> u64 {
    ic_cdk::api::call::performance_counter(0)
}