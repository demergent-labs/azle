import { nat64, Record } from 'azle';

export const PerfResult = Record({
    wasm_body_only: nat64,
    wasm_including_prelude: nat64
});
