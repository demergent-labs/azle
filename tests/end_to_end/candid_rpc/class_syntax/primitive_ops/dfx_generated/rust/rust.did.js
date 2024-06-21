export const idlFactory = ({ IDL }) => {
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    return IDL.Service({
        blob_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        blob_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        boolean_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        boolean_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        empty: IDL.Func([], [PerfResult], []),
        float32_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        float32_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        float64_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        float64_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        int16_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        int16_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        int32_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        int32_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        int64_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        int64_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        int8_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        int8_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        int_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        int_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        nat16_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        nat16_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        nat32_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        nat32_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        nat64_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        nat64_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        nat8_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        nat8_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        nat_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        nat_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        null_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        null_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        opt_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        opt_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        principal_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        principal_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        record_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        record_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        text_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        text_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        variant_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        variant_init_stack: IDL.Func([IDL.Nat32], [PerfResult], []),
        vec_init_heap: IDL.Func([IDL.Nat32], [PerfResult], []),
        vec_init_stack: IDL.Func([IDL.Nat32], [PerfResult], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
