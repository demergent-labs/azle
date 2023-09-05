import { IDL } from '@dfinity/candid';

globalThis.TextDecoder = require('text-encoding').TextDecoder;
globalThis.TextEncoder = require('text-encoding').TextEncoder;

type CandidBytes = ArrayBuffer;

export function test<query>(candidBytes: CandidBytes): CandidBytes {
    const decoded = IDL.decode([IDL.Text, IDL.Text], candidBytes);
    const param1 = decoded[0];
    const param2 = decoded[1];
    // return IDL.Text.encodeValue(param1 + param2).buffer;
    return new Uint8Array(IDL.encode([IDL.Text], [`${param1} ${param2}`]))
        .buffer;
}

class MyRecord {
    @candid('text')
    id: string;

    @candid('float32')
    fav_num: number;

    @nat32
    fav_nat: number;

    @int
    fav_int: bigint;
}

class Temperature {
    @candid.null
    Hot: null;

    @candid.null
    Warm: null;

    @candid.null
    LukeWarm: null;

    @candid.null
    RoomTemp: null;

    @candid.null
    Cool: null;

    @candid.null
    Cold: null;

    @candid.null
    Freezing: null;
}
