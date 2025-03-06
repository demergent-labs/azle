import '#experimental/lib/experimental';

import { IDL } from '@dfinity/candid';

import { CandidType, Parent, toIdlTypeArray } from '../../index';
import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';
import { Principal } from './principal';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type Func = [Principal, string];
type Mode = 'query' | 'update' | 'oneway';

const modeToCandid = {
    query: ['query'],
    oneway: ['oneway'],
    update: []
};

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
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
        getIdlType(parents: Parent[]): IDL.FuncClass {
            return IDL.Func(
                toIdlTypeArray(paramCandidTypes, parents),
                toIdlTypeArray(returnCandidTypes, parents),
                modeToCandid[mode]
            );
        }
    };
}
