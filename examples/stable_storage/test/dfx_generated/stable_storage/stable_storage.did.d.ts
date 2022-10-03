import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Child {
    id: string;
}
export interface User {
    id: string;
    children: Array<Child>;
}
export interface _SERVICE {
    readStableBlob: ActorMethod<[], Array<number>>;
    readStableBlobs: ActorMethod<[], Array<Array<number>>>;
    readStableFloat32: ActorMethod<[], number>;
    readStableFloat64: ActorMethod<[], number>;
    readStableInt: ActorMethod<[], bigint>;
    readStableInt16: ActorMethod<[], number>;
    readStableInt32: ActorMethod<[], number>;
    readStableInt64: ActorMethod<[], bigint>;
    readStableInt8: ActorMethod<[], number>;
    readStableInts: ActorMethod<[], Array<bigint>>;
    readStableNat: ActorMethod<[], bigint>;
    readStableNat16: ActorMethod<[], number>;
    readStableNat32: ActorMethod<[], number>;
    readStableNat64: ActorMethod<[], bigint>;
    readStableNat8: ActorMethod<[], number>;
    readStablePrincipal: ActorMethod<[], Principal>;
    readStableString: ActorMethod<[], string>;
    readStableUser: ActorMethod<[], User>;
    writeStableBlob: ActorMethod<[Array<number>], undefined>;
    writeStableBlobs: ActorMethod<[Array<Array<number>>], undefined>;
    writeStableFloat32: ActorMethod<[number], undefined>;
    writeStableFloat64: ActorMethod<[number], undefined>;
    writeStableInt: ActorMethod<[bigint], undefined>;
    writeStableInt16: ActorMethod<[number], undefined>;
    writeStableInt32: ActorMethod<[number], undefined>;
    writeStableInt64: ActorMethod<[bigint], undefined>;
    writeStableInt8: ActorMethod<[number], undefined>;
    writeStableInts: ActorMethod<[Array<bigint>], undefined>;
    writeStableNat: ActorMethod<[bigint], undefined>;
    writeStableNat16: ActorMethod<[number], undefined>;
    writeStableNat32: ActorMethod<[number], undefined>;
    writeStableNat64: ActorMethod<[bigint], undefined>;
    writeStableNat8: ActorMethod<[number], undefined>;
    writeStablePrincipal: ActorMethod<[Principal], undefined>;
    writeStableString: ActorMethod<[string], undefined>;
    writeStableUser: ActorMethod<[User], undefined>;
}
