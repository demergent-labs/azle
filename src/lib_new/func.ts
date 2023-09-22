import { IDL, Principal } from './index';
import {
    CandidClass,
    toReturnIDLType,
    toParamIDLTypes,
    ReturnCandidClass
} from './utils';

type Mode = 'query' | 'update' | 'oneway';

const modeToCandid = {
    query: ['query'],
    oneway: ['oneway'],
    update: [] // TODO what is the proper way to do updates
};

export class Func {
    constructor(principal: Principal, name: string) {}
}

export function func(
    paramsIdls: CandidClass[],
    returnIdl: ReturnCandidClass,
    mode: Mode
) {
    return (target: any) => {
        return class extends target {
            principal: Principal;
            name: string;
            constructor(principal: Principal, name: string) {
                super();
                this.principal = principal;
                this.name = name;
            }
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
