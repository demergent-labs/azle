import {
    Canister,
    CanisterResult,
    ic,
    Init,
    PostUpgrade,
    Principal,
    Query,
    UpdateAsync,
    Variant
} from 'azle';

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
// We use the zero address but any principal could be used.
let install: Principal = 'aaaaa-aa';
let someone: Principal = 'aaaaa-aa';

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
export function whoami(): Query<Principal> {
    return ic.caller();
}

// Return the principal identifier of this canister.
export function* id(): UpdateAsync<Principal> {
    const thisCanister = ic.canisters.WhoAmICanister<WhoAmICanister>(ic.id());

    const result: WhoAmIResult = yield thisCanister.whoami();

    return result.ok ?? '';
}

// Return the principal identifier of this canister via the global `ic` object.
// This is much quicker than `id()` above because it isn't making a cross-
// canister call to itself. Additionally, it can now be a `Query` which means it
// doesn't have to go through consensus.
export function idQuick(): Query<Principal> {
    return ic.id();
}
