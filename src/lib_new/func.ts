import { IDL } from './index';
import { CandidClass, toReturnIDLType, toParamIDLTypes } from './utils';

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
                    toParamIDLTypes(paramsIdls),
                    toReturnIDLType(returnIdl),
                    modeToCandid[mode]
                );
            }
        };
    };
}
