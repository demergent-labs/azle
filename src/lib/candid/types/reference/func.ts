import { IDL } from '@dfinity/candid';

import { CandidType, Parent, toIdlArray } from '../../index';
import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';
import { Principal } from './principal';

export type Func = [Principal, string];
type Mode = 'query' | 'update' | 'oneway';

const modeToCandid = {
    query: ['query'],
    oneway: ['oneway'],
    update: []
};

export function Func(
    paramCandidTypes: CandidType[],
    returnCandidTypes: CandidType,
    mode: Mode
) {
    return {
        tsType: {} as Func,
        toBytes(data: any) {
            return encode(this, data);
        },
        fromBytes(bytes: Uint8Array) {
            return decode(this, bytes);
        },
        getIdl(parents: Parent[]) {
            return IDL.Func(
                toIdlArray(paramCandidTypes, parents),
                toIdlArray(returnCandidTypes, parents),
                modeToCandid[mode]
            );
        }
    };
}
