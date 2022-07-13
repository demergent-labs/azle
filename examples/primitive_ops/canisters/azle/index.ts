import { ic, Update } from 'azle';
import { PerfResult } from 'azle/benchmark';

export function empty(): Update<PerfResult> {
    const perf_start = ic.performance_counter(0);
    const perf_end = ic.performance_counter(0);

    return {
        wasm_body_only: perf_end - perf_start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}

export { blob_init_stack, blob_init_heap } from './data_types/blob';

export { boolean_init_stack, boolean_init_heap } from './data_types/boolean';

export {
    float32_init_stack,
    float32_init_heap
} from './data_types/float/float32';

export {
    float64_init_stack,
    float64_init_heap
} from './data_types/float/float64';

export { int_init_stack, int_init_heap } from './data_types/int/int';

export { int8_init_stack, int8_init_heap } from './data_types/int/int8';

export { int16_init_stack, int16_init_heap } from './data_types/int/int16';

export { int32_init_stack, int32_init_heap } from './data_types/int/int32';

export { int64_init_stack, int64_init_heap } from './data_types/int/int64';

export { nat_init_stack, nat_init_heap } from './data_types/nat/nat';

export { nat8_init_stack, nat8_init_heap } from './data_types/nat/nat8';

export { nat16_init_stack, nat16_init_heap } from './data_types/nat/nat16';

export { nat32_init_stack, nat32_init_heap } from './data_types/nat/nat32';

export { nat64_init_stack, nat64_init_heap } from './data_types/nat/nat64';

export { null_init_stack, null_init_heap } from './data_types/null';

export { opt_init_stack, opt_init_heap } from './data_types/opt';

export {
    principal_init_stack,
    principal_init_heap
} from './data_types/principal';

export { record_init_stack, record_init_heap } from './data_types/record';

export { text_init_stack, text_init_heap } from './data_types/text';

export { variant_init_stack, variant_init_heap } from './data_types/variant';

export { vec_init_stack, vec_init_heap } from './data_types/vec';
