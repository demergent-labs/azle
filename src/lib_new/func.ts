import { IDL } from '@dfinity/candid';
import {
    CandidClass,
    toReturnCandidClass,
    toParamCandidClasses
} from './utils';

type Mode = 'query' | 'update' | 'oneway';

const modeToCandid = {
    query: ['query'],
    oneway: ['oneway'],
    update: [] // TODO what is the proper way to do updates
};

export function func(
    paramsIdls: CandidClass[],
    returnIdl: CandidClass,
    mode: Mode
) {
    return (target: any) => {
        return class extends target {
            static getIDL() {
                return IDL.Func(
                    toParamCandidClasses(paramsIdls),
                    toReturnCandidClass(returnIdl),
                    modeToCandid[mode]
                );
            }
        };
    };
}
