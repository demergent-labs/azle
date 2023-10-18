import { CandidType, Parent, toIdlArray } from '../../index';
import { IDL } from '@dfinity/candid';
import { Principal } from './principal';

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
): [Principal, string] & { _azleCandidType?: '_azleCandidType' } {
    return {
        getIdl(parents: Parent[]) {
            return IDL.Func(
                toIdlArray(paramCandidTypes, parents),
                toIdlArray(returnCandidTypes, parents),
                modeToCandid[mode]
            );
        }
    } as any;
}
