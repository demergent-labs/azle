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

// TODO make this function's return type explicit https://github.com/demergent-labs/azle/issues/1860
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function Func(
    paramCandidTypes: CandidType[],
    returnCandidTypes: CandidType,
    mode: Mode
) {
    return {
        tsType: {} as Func,
        toBytes(data: Func): Uint8Array {
            return encode(this, data);
        },
        fromBytes(bytes: Uint8Array): Func {
            return decode<Func>(this, bytes) as Func;
        },
        getIdl(parents: Parent[]): IDL.FuncClass {
            return IDL.Func(
                toIdlArray(paramCandidTypes, parents),
                toIdlArray(returnCandidTypes, parents),
                modeToCandid[mode]
            );
        }
    };
}
