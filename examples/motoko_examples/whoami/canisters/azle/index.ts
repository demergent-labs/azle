import {
    CanisterResult,
    ExternalCanister,
    ic,
    $init,
    match,
    nat64,
    Opt,
    $postUpgrade,
    Principal,
    query,
    $query,
    Record,
    update,
    $update
} from 'azle';

//#region Performance
type PerfResult = Record<{
    wasm_body_only: nat64;
    wasm_including_prelude: nat64;
}>;

let perf_result: Opt<PerfResult> = null;

$query;
export function get_perf_result(): Opt<PerfResult> {
    return perf_result;
}

function record_performance(start: nat64, end: nat64): void {
    perf_result = {
        wasm_body_only: end - start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
}
//#endregion

class WhoAmICanister extends ExternalCanister {
    @query
    installer: () => CanisterResult<Principal>;

    @query
    argument: () => CanisterResult<Principal>;

    @update
    whoami: () => CanisterResult<Principal>;

    @update
    id: () => CanisterResult<Principal>;

    @query
    id_quick: () => CanisterResult<Principal>;
}

// Initialize the variables to ensure that they aren't `undefined`.
// We use the zero principal but any principal could be used.
let install: Principal = Principal.fromText('aaaaa-aa');
let someone: Principal = Principal.fromText('aaaaa-aa');

// Manually save the calling principal and argument for later access.
$init;
export function init(somebody: Principal) {
    install = ic.caller();
    someone = somebody;
}

// Manually re-save these variables after new deploys.
$postUpgrade;
export function post_upgrade(somebody: Principal) {
    install = ic.caller();
    someone = somebody;
}

// Return the principal identifier of the wallet canister that installed this
// canister.
$query;
export function installer(): Principal {
    return install;
}

// Return the principal identifier that was provided as an installation
// argument to this canister.
$query;
export function argument(): Principal {
    return someone;
}

// Return the principal identifier of the caller of this method.
$update;
export function whoami(): Principal {
    const perf_start = ic.performanceCounter(0);

    const caller = ic.caller();

    const perf_end = ic.performanceCounter(0);
    record_performance(perf_start, perf_end);

    return caller;
}

// Return the principal identifier of this canister.
$update;
export async function id(): Promise<Principal> {
    const pre_xnet_call_perf_start = ic.performanceCounter(0);

    const this_canister = new WhoAmICanister(ic.id());

    const pre_xnet_call_perf_end = ic.performanceCounter(0);
    const result = await this_canister.whoami().call();
    const post_xnet_call_perf_start = ic.performanceCounter(0);

    const response = match(result, {
        Ok: (ok) => ok,
        Err: () => Principal.fromText('aaaaa-aa')
    });

    const post_xnet_call_perf_end = ic.performanceCounter(0);
    const pre_xnet_call_perf =
        pre_xnet_call_perf_end - pre_xnet_call_perf_start;
    const post_xnet_call_perf =
        post_xnet_call_perf_end - post_xnet_call_perf_start;
    const total_perf = pre_xnet_call_perf + post_xnet_call_perf;
    perf_result = {
        wasm_body_only: total_perf,
        wasm_including_prelude: ic.performanceCounter(0)
    };

    return response;
}

// Return the principal identifier of this canister via the global `ic` object.
// This is much quicker than `id()` above because it isn't making a cross-
// canister call to itself. Additionally, it can now be a `Query` which means it
// doesn't have to go through consensus.
$query;
export function id_quick(): Principal {
    return ic.id();
}
