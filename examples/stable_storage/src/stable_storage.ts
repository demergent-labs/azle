import {
    Query,
    Update,
    Stable,
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
    country: Country;
};

type Child = {
    id: string;
};

type Country = Variant<{
    USA?: null;
    UK?: null;
    CANADA?: null
}>;

type Reaction = Variant<{
    Fire?: null;
    Great?: null;
    Fireworks?: Fireworks;
    Emotion?: Emotion;
}>;

type Fireworks = {
    id: string;
    name: string
};

type Emotion = Variant<{
    Happy?: null;
    Sad?: null;
}>;

type StableStorage = Stable<{
    stableInt: int;
    stableInt64: int64;
    stableInt32: int32;
    stableInt16: int16;
    stableInt8: int8;
    stableNat: nat;
    stableNat64: nat64;
    stableNat32: nat32;
    stableNat16: nat16;
    stableNat8: nat8;
    stableFloat64: float64;
    stableFloat32: float32;
    stableString: string;
    stablePrincipal: Principal;
    stableUser: User;
    stableReaction: Reaction;
    // stableBoolean: Migrate<boolean>;
    // To add a stable variable after a canister is deployed
    // you must wrap the variable's type in the Migrate type.
    // Then you must set its initial value in the PostUpgrade method and deploy/upgrade once.
    // After the first deploy/upgrade you should remove the Migrate type and the PostUpgrade
    // method initialization of the variable then deploy again.
}>;

export function init(): Init {
    ic.print('init');

    ic.stableStorage<StableStorage>().stableInt = 170141183460469231731687303715884105727n;
    ic.stableStorage<StableStorage>().stableInt64 = 9223372036854775807n;
    ic.stableStorage<StableStorage>().stableInt32 = 2147483647;
    ic.stableStorage<StableStorage>().stableInt16 = 32767;
    ic.stableStorage<StableStorage>().stableInt8 = 127;
    ic.stableStorage<StableStorage>().stableNat = 340282366920938463463374607431768211455n;
    ic.stableStorage<StableStorage>().stableNat64 = 18446744073709551615n;
    ic.stableStorage<StableStorage>().stableNat32 = 4294967295;
    ic.stableStorage<StableStorage>().stableNat16 = 65535;
    ic.stableStorage<StableStorage>().stableNat8 = 255;
    ic.stableStorage<StableStorage>().stableFloat64 = Math.E;
    ic.stableStorage<StableStorage>().stableFloat32 = Math.PI;
    ic.stableStorage<StableStorage>().stableString = 'Hello there';
    ic.stableStorage<StableStorage>().stablePrincipal = 'rrkah-fqaaa-aaaaa-aaaaq-cai';
    ic.stableStorage<StableStorage>().stableUser = {
        id: '0',
        children: [
            {
                id: '1'
            }
        ],
        country: {
            CANADA: null
        }
    };
    ic.stableStorage<StableStorage>().stableReaction = {
        Emotion: {
            Happy: null
        }
    };
}

export function preUpgrade(): PreUpgrade {
    ic.print('preUpgrade');
}

export function postUpgrade(): PostUpgrade {
    ic.print('postUpgrade');
}

export function readStableInt(): Query<int> {
    return ic.stableStorage<StableStorage>().stableInt;
}

export function writeStableInt(int: int): Update<void> {
    ic.stableStorage<StableStorage>().stableInt = int;
}

export function readStableInt64(): Query<int64> {
    return ic.stableStorage<StableStorage>().stableInt64;
}

export function writeStableInt64(int64: int64): Update<void> {
    ic.stableStorage<StableStorage>().stableInt64 = int64;
}

export function readStableInt32(): Query<int32> {
    return ic.stableStorage<StableStorage>().stableInt32;
}

export function writeStableInt32(int32: int32): Update<void> {
    ic.stableStorage<StableStorage>().stableInt32 = int32;
}

export function readStableInt16(): Query<int16> {
    return ic.stableStorage<StableStorage>().stableInt16;
}

export function writeStableInt16(int16: int16): Update<void> {
    ic.stableStorage<StableStorage>().stableInt16 = int16;
}

export function readStableInt8(): Query<int8> {
    return ic.stableStorage<StableStorage>().stableInt8;
}

export function writeStableInt8(int8: int8): Update<void> {
    ic.stableStorage<StableStorage>().stableInt8 = int8;
}

export function readStableNat(): Query<nat> {
    return ic.stableStorage<StableStorage>().stableNat;
}

export function writeStableNat(nat: nat): Update<void> {
    ic.stableStorage<StableStorage>().stableNat = nat;
}

export function readStableNat64(): Query<nat64> {
    return ic.stableStorage<StableStorage>().stableNat64;
}

export function writeStableNat64(nat64: nat64): Update<void> {
    ic.stableStorage<StableStorage>().stableNat64 = nat64;
}

export function readStableNat32(): Query<nat32> {
    return ic.stableStorage<StableStorage>().stableNat32;
}

export function writeStableNat32(nat32: nat32): Update<void> {
    ic.stableStorage<StableStorage>().stableNat32 = nat32;
}

export function readStableNat16(): Query<nat16> {
    return ic.stableStorage<StableStorage>().stableNat16;
}

export function writeStableNat16(nat16: nat16): Update<void> {
    ic.stableStorage<StableStorage>().stableNat16 = nat16;
}

export function readStableNat8(): Query<nat8> {
    return ic.stableStorage<StableStorage>().stableNat8;
}

export function writeStableNat8(nat8: nat8): Update<void> {
    ic.stableStorage<StableStorage>().stableNat8 = nat8;
}

export function readStableFloat64(): Query<float64> {
    return ic.stableStorage<StableStorage>().stableFloat64;
}

export function writeStableFloat64(float64: float64): Update<void> {
    ic.stableStorage<StableStorage>().stableFloat64 = float64;
}

export function readStableFloat32(): Query<float32> {
    return ic.stableStorage<StableStorage>().stableFloat32;
}

export function writeStableFloat32(float32: float32): Update<void> {
    ic.stableStorage<StableStorage>().stableFloat32 = float32;
}

export function readStableString(): Query<string> {
    return ic.stableStorage<StableStorage>().stableString;
}

export function writeStableString(string: string): Update<void> {
    ic.stableStorage<StableStorage>().stableString = string;
}

export function readStablePrincipal(): Query<Principal> {
    return ic.stableStorage<StableStorage>().stablePrincipal;
}

export function writeStablePrincipal(principal: Principal): Update<void> {
    ic.stableStorage<StableStorage>().stablePrincipal = principal;
}

export function readStableUser(): Query<User> {
    return ic.stableStorage<StableStorage>().stableUser;
}

export function writeStableUser(user: User): Update<void> {
    ic.stableStorage<StableStorage>().stableUser = user;
}

export function readStableReaction(): Query<Reaction> {
    return ic.stableStorage<StableStorage>().stableReaction;
}

export function writeStableReaction(reaction: Reaction): Update<void> {
    ic.stableStorage<StableStorage>().stableReaction = reaction;
}
