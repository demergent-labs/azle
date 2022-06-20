import type { Principal } from '@dfinity/principal';
export interface Child {
    id: string;
}
export type Country = { UK: null } | { USA: null } | { CANADA: null };
export type Emotion = { Sad: null } | { Happy: null };
export interface Fireworks {
    id: string;
    name: string;
}
export type Reaction =
    | { Emotion: Emotion }
    | { Great: null }
    | { Fire: null }
    | { Fireworks: Fireworks };
export interface User {
    id: string;
    country: Country;
    children: Array<Child>;
}
export interface _SERVICE {
    readStableFloat32: () => Promise<number>;
    readStableFloat64: () => Promise<number>;
    readStableInt: () => Promise<bigint>;
    readStableInt16: () => Promise<number>;
    readStableInt32: () => Promise<number>;
    readStableInt64: () => Promise<bigint>;
    readStableInt8: () => Promise<number>;
    readStableNat: () => Promise<bigint>;
    readStableNat16: () => Promise<number>;
    readStableNat32: () => Promise<number>;
    readStableNat64: () => Promise<bigint>;
    readStableNat8: () => Promise<number>;
    readStablePrincipal: () => Promise<Principal>;
    readStableReaction: () => Promise<Reaction>;
    readStableString: () => Promise<string>;
    readStableUser: () => Promise<User>;
    writeStableFloat32: (arg_0: number) => Promise<undefined>;
    writeStableFloat64: (arg_0: number) => Promise<undefined>;
    writeStableInt: (arg_0: bigint) => Promise<undefined>;
    writeStableInt16: (arg_0: number) => Promise<undefined>;
    writeStableInt32: (arg_0: number) => Promise<undefined>;
    writeStableInt64: (arg_0: bigint) => Promise<undefined>;
    writeStableInt8: (arg_0: number) => Promise<undefined>;
    writeStableNat: (arg_0: bigint) => Promise<undefined>;
    writeStableNat16: (arg_0: number) => Promise<undefined>;
    writeStableNat32: (arg_0: number) => Promise<undefined>;
    writeStableNat64: (arg_0: bigint) => Promise<undefined>;
    writeStableNat8: (arg_0: number) => Promise<undefined>;
    writeStablePrincipal: (arg_0: Principal) => Promise<undefined>;
    writeStableReaction: (arg_0: Reaction) => Promise<undefined>;
    writeStableString: (arg_0: string) => Promise<undefined>;
    writeStableUser: (arg_0: User) => Promise<undefined>;
}
