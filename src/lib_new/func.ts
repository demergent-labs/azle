import { IDL } from '@dfinity/candid';
import {
    CandidClass,
    ReturnCandidClass,
    toReturnCandidClass,
    toCandidClasses
} from './property_decorators';

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
                    toCandidClasses(paramsIdls),
                    toReturnCandidClass(returnIdl),
                    modeToCandid[mode]
                );
            }
        };
    };
}
