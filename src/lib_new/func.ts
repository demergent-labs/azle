import { IDL } from '@dfinity/candid';
import {
    CandidClass,
    CandidType,
    toCandidClass,
    toCandidClasses
} from './property_decorators';

type Mode = 'query' | 'update' | 'oneway';
let my_thing = 0;

export class Func {
    static getIDL() {
        return this.constructor._azleEncoder;
    }
}

export function func(
    paramsIdls: (CandidType | CandidClass)[],
    returnIdl: CandidType | CandidClass,
    mode: Mode
) {
    return (target) => {
        addToAzleCandidMap(target, mode, paramsIdls, returnIdl);
        return class extends Func {};
    };
}

function addToAzleCandidMap(
    target,
    mode: Mode,
    paramIdls: (CandidType | CandidClass)[],
    returnIdl: CandidType | CandidClass
) {
    target.constructor._azleParamsIdls = toCandidClasses(paramIdls);
    target.constructor._azleReturnIdl = toCandidClass(returnIdl);
    target.constructor._azleTODO_GET_NAME_FOR_THIS = mode;
    // throw target.constructor._azleParamsIdls;
    target.constructor._azleEncoder = IDL.Func(
        target.constructor._azleParamsIdls,
        [target.constructor._azleReturnIdl],
        [mode]
    );
    // throw target.constructor._azleEncoder;
    if (my_thing > 0) {
        throw 'We made it here I guess we called this multiple times';
    }
    my_thing += 1;
}
