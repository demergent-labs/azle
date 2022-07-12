import { Benchmark, run_benchmarks } from 'azle/benchmark';
import { createActor as createActorAzle } from './dfx_generated/azle';
import { createActor as createActorRust } from './dfx_generated/rust';

// TODO a simple exec_sync could get us these ids in a less fragile way
const azle_canister = createActorAzle('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const motoko_canister = createActorAzle('ryjl3-tyaaa-aaaaa-aaaba-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const rust_canister = createActorRust('rkp4c-7iaaa-aaaaa-aaaca-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const benchmarks: Benchmark[] = [
    {
        canister_method: 'empty',
        benchmark_description: '',
        args: []
    },
    ...get_blob_benchmarks(),
    ...get_boolean_benchmarks(),
    ...get_float32_benchmarks(),
    ...get_float64_benchmarks(),
    ...get_int_benchmarks(),
    ...get_int8_benchmarks(),
    ...get_int16_benchmarks(),
    ...get_int32_benchmarks(),
    ...get_int64_benchmarks(),
    ...get_nat_benchmarks(),
    ...get_nat8_benchmarks(),
    ...get_nat16_benchmarks(),
    ...get_nat32_benchmarks(),
    ...get_nat64_benchmarks(),
    ...get_null_benchmarks(),
    ...get_opt_benchmarks(),
    ...get_principal_benchmarks(),
    ...get_record_benchmarks(),
    ...get_text_benchmarks(),
    ...get_variant_benchmarks(),
    ...get_vec_benchmarks()
];

run_benchmarks(
    benchmarks,
    azle_canister,
    motoko_canister,
    rust_canister,
    10,
    `benchmarks`,
    process.argv[2] !== 'no-setup'
);

function get_blob_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'blob_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'blob_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'blob_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'blob_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'blob_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'blob_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_boolean_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'boolean_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'boolean_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'boolean_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'boolean_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'boolean_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'boolean_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_float32_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'float32_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'float32_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'float32_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'float32_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'float32_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'float32_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_float64_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'float64_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'float64_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'float64_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'float64_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'float64_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'float64_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_int_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'int_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'int_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'int_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'int_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'int_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'int_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_int8_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'int8_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'int8_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'int8_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'int8_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'int8_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'int8_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_int16_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'int16_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'int16_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'int16_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'int16_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'int16_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'int16_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_int32_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'int32_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'int32_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'int32_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'int32_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'int32_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'int32_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_int64_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'int64_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'int64_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'int64_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'int64_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'int64_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'int64_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_nat_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'nat_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'nat_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'nat_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'nat_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'nat_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'nat_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_nat8_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'nat8_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'nat8_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'nat8_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'nat8_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'nat8_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'nat8_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_nat16_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'nat16_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'nat16_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'nat16_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'nat16_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'nat16_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'nat16_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_nat32_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'nat32_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'nat32_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'nat32_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'nat32_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'nat32_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'nat32_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_nat64_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'nat64_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'nat64_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'nat64_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'nat64_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'nat64_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'nat64_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_null_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'null_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'null_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'null_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'null_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'null_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'null_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_opt_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'opt_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'opt_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'opt_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'opt_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'opt_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'opt_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_principal_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'principal_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'principal_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'principal_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'principal_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'principal_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'principal_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_record_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'record_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'record_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'record_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'record_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'record_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'record_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_text_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'text_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'text_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'text_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'text_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'text_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'text_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_variant_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'variant_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'variant_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'variant_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'variant_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'variant_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'variant_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}

function get_vec_benchmarks(): Benchmark[] {
    return [
        {
            canister_method: 'vec_init_stack',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'vec_init_stack',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'vec_init_stack',
            benchmark_description: '100',
            args: [100]
        },
        {
            canister_method: 'vec_init_heap',
            benchmark_description: '1',
            args: [1]
        },
        {
            canister_method: 'vec_init_heap',
            benchmark_description: '10',
            args: [10]
        },
        {
            canister_method: 'vec_init_heap',
            benchmark_description: '100',
            args: [100]
        }
    ];
}
