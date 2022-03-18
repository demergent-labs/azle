import { Rust } from '../../../../types';

export function generateIcObject(): Rust {
    return `
        let ic = boa_engine::object::ObjectInitializer::new(&mut boa_context)
            .function(
                azle_ic_caller,
                "caller",
                0
            )
            .function(
                azle_ic_canister_balance,
                "canisterBalance",
                0
            )
            .function(
                azle_ic_id,
                "id",
                0
            )
            .function(
                azle_ic_print,
                "print",
                0
            )
            .function(
                azle_ic_raw_rand,
                "rawRand",
                0
            )
            .function(
                azle_ic_time,
                "time",
                0
            )
            .function(
                azle_ic_trap,
                "trap",
                0
            )
            .build();
    `;
}