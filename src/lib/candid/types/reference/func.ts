import { CandidType } from '../../index';
import { IDL } from '@dfinity/candid';
import { Principal } from './principal';
import { Parent, toParamIdls, toReturnIdl } from '../../index';

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
                toParamIdls(paramCandidTypes, parents),
                toReturnIdl(returnCandidTypes, parents),
                modeToCandid[mode]
            );
        }
    } as any;
}
