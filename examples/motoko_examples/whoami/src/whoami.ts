import {
    Canister,
    CanisterResult,
    ic,
    Init,
    Principal,
    Query,
    Stable,
    UpdateAsync,
    Variant
} from 'azle';

type WhoAmICanister = Canister<{
    // installer(): CanisterResult<Principal>;
    argument(): CanisterResult<Principal>;
    whoami(): CanisterResult<Principal>;
    id(): CanisterResult<Principal>;
    idQuick(): CanisterResult<Principal>;
}>;

type WhoAmIResult = Variant<{
    ok: Principal;
    err: string;
}>;

type StableStorage = Stable<{
    someone: Principal,
}>

// Save the principal to stable storage for later access
export function initialize(someone: Principal): Init {
    ic.stableStorage<StableStorage>().someone = someone;
}

// Return the principal identifier of the wallet canister that installed this
// canister.
// export function installer(): Query<Principal> {
//     return ic.installer();
//     // TODO: See https://github.com/demergent-labs/azle/issues/271
// }

// Return the principal identifier that was provided as an installation
// argument to this canister.
export function argument(): Query<Principal> {
    return ic.stableStorage<StableStorage>().someone;
}

// Return the principal identifier of the caller of this method.
export function whoami(): Query<Principal> {
    return ic.caller();
}

// Return the principal identifier of this canister.
export function* id(): UpdateAsync<Principal> {
    const thisCanister = ic.canisters.WhoAmICanister<WhoAmICanister>(ic.id());

    const result: WhoAmIResult = yield thisCanister.whoami();

    return result.ok || ""
}

// Return the principal identifier of this canister via the global `ic` object.
// This is much quicker than `id()` above because it isn't making a cross-
// canister call to itself. Additionally, it can now be a `Query` which means it
// doesn't have to go through consensus.
export function idQuick(): Query<Principal> {
    return ic.id();
}
