mod data_types {
    mod blob;
    mod boolean;
    mod float {
        mod float32;
        mod float64;
    }
    mod int {
        mod int;
        mod int8;
        mod int16;
        mod int32;
        mod int64;
    }
    mod nat {
        mod nat;
        mod nat8;
        mod nat16;
        mod nat32;
        mod nat64;
    }
    mod null;
    mod opt;
    mod principal;
    mod record;
    mod text;
    mod variant;
    mod vec;
}

#[derive(candid::CandidType)]
pub struct PerfResult {
    wasm_body_only: u64,
    wasm_including_prelude: u64
}

#[ic_cdk_macros::update]
pub fn empty() -> PerfResult {
    let perf_start = ic_cdk::api::call::performance_counter(0);
    let perf_end = ic_cdk::api::call::performance_counter(0);
        
    PerfResult {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic_cdk::api::call::performance_counter(0)
    }
}