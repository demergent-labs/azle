// TODO add support/tests for func, service, reserved, and empty

import {
    blob,
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
    Variant
} from 'azle';

type User = {
    id: string;
    children: Child[];
    // country: Country;
};

type Child = {
    id: string;
};

// type Country = Variant<{
//     USA: null;
//     UK: null;
//     CANADA: null;
// }>;

// type Reaction = Variant<{
//     Fire: null;
//     Great: null;
//     // Fireworks: Fireworks; // TODO uncomment and add all of these back in
//     // Emotion: Emotion;
// }>;

// type Fireworks = {
//     id: string;
//     name: string;
// };

// type Emotion = Variant<{
//     Happy: null;
//     Sad: null;
// }>;

// TODO test blob
// TODO test vec
// TODO everything
// TODO consider getting rid of the Stable type
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
    // stable_reaction: Reaction;
    // stable_boolean: Migrate<boolean>; // TODO I think we can get rid of this concept, but let's play with it
    // To add a stable variable after a canister is deployed
    // you must wrap the variable's type in the Migrate type.
    // Then you must set its initial value in the PostUpgrade method and deploy/upgrade once.
    // After the first deploy/upgrade you should remove the Migrate type and the PostUpgrade
    // method initialization of the variable then deploy again.
};
// TODO test out migrate, I think we can get rid of it

let stable_storage: StableStorage = ic.stable_storage();

// TODO add array tests for each type
export function init(): Init {
    console.log('init');

    stable_storage.stable_blob = Uint8Array.from([0, 1, 2, 3, 4, 5]);
    stable_storage.stable_blobs = [
        Uint8Array.from([0, 1, 2, 3, 4, 5]),
        Uint8Array.from([0, 1, 2, 3, 4, 5])
    ];
    stable_storage.stable_int = 170141183460469231731687303715884105727n;
    stable_storage.stable_ints = [
        170141183460469231731687303715884105727n,
        170141183460469231731687303715884105727n
    ];
    stable_storage.stable_int64 = 9223372036854775807n;
    stable_storage.stable_int32 = 2147483647;
    stable_storage.stable_int16 = 32767;
    stable_storage.stable_int8 = 127;
    stable_storage.stable_nat = 340282366920938463463374607431768211455n;
    stable_storage.stable_nat64 = 18446744073709551615n;
    stable_storage.stable_nat32 = 4294967295;
    stable_storage.stable_nat16 = 65535;
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
        // country: {
        //     CANADA: null
        // }
    };
    // stable_storage.stable_reaction = {
    //     Emotion: {
    //         Happy: null
    //     }
    // };
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

// export function read_stable_reaction(): Query<Reaction> {
//     return stable_storage.stable_reaction;
// }

// export function write_stable_reaction(reaction: Reaction): Update<void> {
//     stable_storage.stable_reaction = reaction;
// }
