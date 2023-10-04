import { CandidType } from '../../index';
import { IDL } from '@dfinity/candid';
import { Principal } from './principal';
import { Parent, toParamIDLTypes, toReturnIDLType } from '../../index';

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
        getIDL(parents: Parent[]) {
            return IDL.Func(
                toParamIDLTypes(paramCandidTypes, parents),
                toReturnIDLType(returnCandidTypes, parents),
                modeToCandid[mode]
            );
        }
    } as any;
}
