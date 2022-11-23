import {
    blob,
    Func,
    Query,
    Update,
    PreUpgrade,
    PostUpgrade,
    ic,
    Init,
    int,
    int64,
    int32,
    int16,
    int8,
    nat,
    nat64,
    nat32,
    nat16,
    nat8,
    float64,
    float32,
    Principal,
    Variant,
    Opt
} from 'azle';

type User = {
    id: string;
    children: Child[];
};

type Child = {
    id: string;
};

type Reaction = Variant<{
    Fire: null;
    Great: null;
}>;

type StableFunc = Func<(param: string) => Query<boolean>>;

type StableStorage = {
    stable_blob: blob;
    stable_blobs: blob[];
    stable_int: int;
    stable_ints: int[];
    stable_int64: int64;
    stable_int32: int32;
    stable_int16: int16;
    stable_int8: int8;
    stable_nat: nat;
    stable_nat64: nat64;
    stable_nat32: nat32;
    stable_nat16: nat16;
    stable_nat8: nat8;
    stable_float64: float64;
    stable_float32: float32;
    stable_string: string;
    stable_principal: Principal;
    stable_user: User;
    stable_users: User[];
    stable_reaction: Reaction;
    stable_func: StableFunc;
    stable_boolean: boolean;
    stable_null: null;
    stable_opt: Opt<int>;
};

let stable_storage: StableStorage = ic.stable_storage();

export function init(): Init {
    console.log('init');

    stable_storage.stable_blob = Uint8Array.from([0, 1, 2, 3, 4, 5]);
    stable_storage.stable_blobs = [
        Uint8Array.from([0, 1, 2, 3, 4, 5]),
        Uint8Array.from([0, 1, 2, 3, 4, 5])
    ];
    stable_storage.stable_int =
        170_141_183_460_469_231_731_687_303_715_884_105_727n;
    stable_storage.stable_ints = [
        170_141_183_460_469_231_731_687_303_715_884_105_727n,
        170_141_183_460_469_231_731_687_303_715_884_105_727n
    ];
    stable_storage.stable_int64 = 9_223_372_036_854_775_807n;
    stable_storage.stable_int32 = 2_147_483_647;
    stable_storage.stable_int16 = 32_767;
    stable_storage.stable_int8 = 127;
    stable_storage.stable_nat =
        340_282_366_920_938_463_463_374_607_431_768_211_455n;
    stable_storage.stable_nat64 = 18_446_744_073_709_551_615n;
    stable_storage.stable_nat32 = 4_294_967_295;
    stable_storage.stable_nat16 = 65_535;
    stable_storage.stable_nat8 = 255;
    stable_storage.stable_float64 = Math.E;
    stable_storage.stable_float32 = Math.PI;
    stable_storage.stable_string = 'Hello there';
    stable_storage.stable_principal = Principal.fromText(
        'rrkah-fqaaa-aaaaa-aaaaq-cai'
    );
    stable_storage.stable_user = {
        id: '0',
        children: [
            {
                id: '1'
            }
        ]
    };
    stable_storage.stable_reaction = {
        Fire: null
    };
    stable_storage.stable_func = [Principal.fromText('aaaaa-aa'), 'raw_rand'];
    stable_storage.stable_boolean = true;
    stable_storage.stable_null = null;
    stable_storage.stable_opt = null;
}

export function pre_upgrade(): PreUpgrade {
    console.log('pre_upgrade');
}

export function post_upgrade(): PostUpgrade {
    console.log('post_upgrade');
}

export function read_stable_blob(): Query<blob> {
    return stable_storage.stable_blob;
}

export function write_stable_blob(blob: blob): Update<void> {
    stable_storage.stable_blob = blob;
}

export function read_stable_blobs(): Query<blob[]> {
    return stable_storage.stable_blobs;
}

export function write_stable_blobs(blobs: blob[]): Update<void> {
    stable_storage.stable_blobs = blobs;
}

export function read_stable_int(): Query<int> {
    return stable_storage.stable_int;
}

export function write_stable_int(int: int): Update<void> {
    stable_storage.stable_int = int;
}

export function read_stable_ints(): Query<int[]> {
    return stable_storage.stable_ints;
}

export function write_stable_ints(ints: int[]): Update<void> {
    stable_storage.stable_ints = ints;
}

export function read_stable_int64(): Query<int64> {
    return stable_storage.stable_int64;
}

export function write_stable_int64(int64: int64): Update<void> {
    stable_storage.stable_int64 = int64;
}

export function read_stable_int32(): Query<int32> {
    return stable_storage.stable_int32;
}

export function write_stable_int32(int32: int32): Update<void> {
    stable_storage.stable_int32 = int32;
}

export function read_stable_int16(): Query<int16> {
    return stable_storage.stable_int16;
}

export function write_stable_int16(int16: int16): Update<void> {
    stable_storage.stable_int16 = int16;
}

export function read_stable_int8(): Query<int8> {
    return stable_storage.stable_int8;
}

export function write_stable_int8(int8: int8): Update<void> {
    stable_storage.stable_int8 = int8;
}

export function read_stable_nat(): Query<nat> {
    return stable_storage.stable_nat;
}

export function write_stable_nat(nat: nat): Update<void> {
    stable_storage.stable_nat = nat;
}

export function read_stable_nat64(): Query<nat64> {
    return stable_storage.stable_nat64;
}

export function write_stable_nat64(nat64: nat64): Update<void> {
    stable_storage.stable_nat64 = nat64;
}

export function read_stable_nat32(): Query<nat32> {
    return stable_storage.stable_nat32;
}

export function write_stable_nat32(nat32: nat32): Update<void> {
    stable_storage.stable_nat32 = nat32;
}

export function read_stable_nat16(): Query<nat16> {
    return stable_storage.stable_nat16;
}

export function write_stable_nat16(nat16: nat16): Update<void> {
    stable_storage.stable_nat16 = nat16;
}

export function read_stable_nat8(): Query<nat8> {
    return stable_storage.stable_nat8;
}

export function write_stable_nat8(nat8: nat8): Update<void> {
    stable_storage.stable_nat8 = nat8;
}

export function read_stable_float64(): Query<float64> {
    return stable_storage.stable_float64;
}

export function write_stable_float64(float64: float64): Update<void> {
    stable_storage.stable_float64 = float64;
}

export function read_stable_float32(): Query<float32> {
    return stable_storage.stable_float32;
}

export function write_stable_float32(float32: float32): Update<void> {
    stable_storage.stable_float32 = float32;
}

export function read_stable_string(): Query<string> {
    return stable_storage.stable_string;
}

export function write_stable_string(string: string): Update<void> {
    stable_storage.stable_string = string;
}

export function read_stable_principal(): Query<Principal> {
    return stable_storage.stable_principal;
}

export function write_stable_principal(principal: Principal): Update<void> {
    stable_storage.stable_principal = principal;
}

export function read_stable_user(): Query<User> {
    return stable_storage.stable_user;
}

export function write_stable_user(user: User): Update<void> {
    stable_storage.stable_user = user;
}

export function read_stable_reaction(): Query<Reaction> {
    return stable_storage.stable_reaction;
}

export function write_stable_reaction(reaction: Reaction): Update<void> {
    stable_storage.stable_reaction = reaction;
}

export function read_stable_func(): Query<StableFunc> {
    return stable_storage.stable_func;
}

export function write_stable_func(func: StableFunc): Update<void> {
    stable_storage.stable_func = func;
}

export function read_stable_boolean(): Query<boolean> {
    return stable_storage.stable_boolean;
}

export function write_stable_boolean(boolean: boolean): Update<void> {
    stable_storage.stable_boolean = boolean;
}

export function read_stable_null(): Query<null> {
    return stable_storage.stable_null;
}

export function write_stable_null(null_: null): Update<void> {
    stable_storage.stable_null = null_;
}

export function read_stable_opt(): Query<Opt<int>> {
    return stable_storage.stable_opt;
}

export function write_stable_opt(opt: Opt<int>): Update<void> {
    stable_storage.stable_opt = opt;
}
