import {
    Canister,
    CanisterResult,
    ic,
    Init,
    nat64,
    Opt,
    PostUpgrade,
    Principal,
    Query,
    Update,
    Variant
} from 'azle';

//#region Performance
type PerfResult = {
    wasm_body_only: nat64;
    wasm_including_prelude: nat64;
};

let perf_result: Opt<PerfResult> = null;

export function get_perf_result(): Query<Opt<PerfResult>> {
    return perf_result;
}

function record_performance(start: nat64, end: nat64): void {
    perf_result = {
        wasm_body_only: end - start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}
//#endregion

type WhoAmICanister = Canister<{
    installer(): CanisterResult<Principal>;
    argument(): CanisterResult<Principal>;
    whoami(): CanisterResult<Principal>;
    id(): CanisterResult<Principal>;
    idQuick(): CanisterResult<Principal>;
}>;

type WhoAmIResult = Variant<{
    ok: Principal;
    err: string;
}>;

// Initialize the variables to ensure that they aren't `undefined`.
// We use the zero principal but any principal could be used.
let install: Principal = Principal.fromText('aaaaa-aa');
let someone: Principal = Principal.fromText('aaaaa-aa');

// Manually save the calling principal and argument for later access.
export function init(somebody: Principal): Init {
    install = ic.caller();
    someone = somebody;
}

// Manually re-save these variables after new deploys.
export function postUpgrade(somebody: Principal): PostUpgrade {
    install = ic.caller();
    someone = somebody;
}

// Return the principal identifier of the wallet canister that installed this
// canister.
export function installer(): Query<Principal> {
    return install;
}

// Return the principal identifier that was provided as an installation
// argument to this canister.
export function argument(): Query<Principal> {
    return someone;
}

// Return the principal identifier of the caller of this method.
export function whoami(): Update<Principal> {
    const perf_start = ic.performance_counter(0);

    const caller = ic.caller();

    const perf_end = ic.performance_counter(0);
    record_performance(perf_start, perf_end);

    return caller;
}

// Return the principal identifier of this canister.
export function* id(): Update<Principal> {
    const pre_xnet_call_perf_start = ic.performance_counter(0);

    const thisCanister = ic.canisters.WhoAmICanister<WhoAmICanister>(ic.id());

    const pre_xnet_call_perf_end = ic.performance_counter(0);
    const result: WhoAmIResult = yield thisCanister.whoami();
    const post_xnet_call_perf_start = ic.performance_counter(0);

    const response = result.ok ?? Principal.fromText('aaaaa-aa');

    const post_xnet_call_perf_end = ic.performance_counter(0);
    const pre_xnet_call_perf =
        pre_xnet_call_perf_end - pre_xnet_call_perf_start;
    const post_xnet_call_perf =
        post_xnet_call_perf_end - post_xnet_call_perf_start;
    const total_perf = pre_xnet_call_perf + post_xnet_call_perf;
    perf_result = {
        wasm_body_only: total_perf,
        wasm_including_prelude: ic.performance_counter(0)
    };

    return response;
}

// Return the principal identifier of this canister via the global `ic` object.
// This is much quicker than `id()` above because it isn't making a cross-
// canister call to itself. Additionally, it can now be a `Query` which means it
// doesn't have to go through consensus.
export function id_quick(): Query<Principal> {
    return ic.id();
}
