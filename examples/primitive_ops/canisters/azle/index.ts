import { Canister, ic, update } from 'azle';
import { PerfResult } from './perf_result';

const empty = update([], PerfResult, () => {
    const perf_start = ic.performanceCounter(0);
    const perf_end = ic.performanceCounter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
});

import { blob_init_stack, blob_init_heap } from './data_types/blob';
import { boolean_init_stack, boolean_init_heap } from './data_types/boolean';
import {
    float32_init_stack,
    float32_init_heap
} from './data_types/float/float32';
import {
    float64_init_stack,
    float64_init_heap
} from './data_types/float/float64';
import { int_init_stack, int_init_heap } from './data_types/int/int';
import { int8_init_stack, int8_init_heap } from './data_types/int/int8';
import { int16_init_stack, int16_init_heap } from './data_types/int/int16';
import { int32_init_stack, int32_init_heap } from './data_types/int/int32';
import { int64_init_stack, int64_init_heap } from './data_types/int/int64';
import { nat_init_stack, nat_init_heap } from './data_types/nat/nat';
import { nat8_init_stack, nat8_init_heap } from './data_types/nat/nat8';
import { nat16_init_stack, nat16_init_heap } from './data_types/nat/nat16';
import { nat32_init_stack, nat32_init_heap } from './data_types/nat/nat32';
import { nat64_init_stack, nat64_init_heap } from './data_types/nat/nat64';
import { null_init_stack, null_init_heap } from './data_types/null';
import { opt_init_stack, opt_init_heap } from './data_types/opt';
import {
    principal_init_stack,
    principal_init_heap
} from './data_types/principal';
import { record_init_stack, record_init_heap } from './data_types/record';
import { text_init_stack, text_init_heap } from './data_types/text';
import { variant_init_stack, variant_init_heap } from './data_types/variant';
import { vec_init_stack, vec_init_heap } from './data_types/vec';

export default Canister({
    empty,
    blob_init_stack,
    blob_init_heap,
    boolean_init_stack,
    boolean_init_heap,
    float32_init_heap,
    float32_init_stack,
    float64_init_stack,
    float64_init_heap,
    int_init_stack,
    int_init_heap,
    int8_init_stack,
    int8_init_heap,
    int16_init_stack,
    int16_init_heap,
    int32_init_stack,
    int32_init_heap,
    int64_init_stack,
    int64_init_heap,
    nat_init_stack,
    nat_init_heap,
    nat8_init_stack,
    nat8_init_heap,
    nat16_init_stack,
    nat16_init_heap,
    nat32_init_stack,
    nat32_init_heap,
    nat64_init_stack,
    nat64_init_heap,
    null_init_stack,
    null_init_heap,
    opt_init_stack,
    opt_init_heap,
    principal_init_stack,
    principal_init_heap,
    record_init_stack,
    record_init_heap,
    text_init_stack,
    text_init_heap,
    variant_init_stack,
    variant_init_heap,
    vec_init_stack,
    vec_init_heap
});
