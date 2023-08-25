import { IDL } from '@dfinity/candid';

import {
    CandidClass,
    CandidType,
    toCandidClass,
    toCandidClasses
} from './property_decorators';
import { display } from './utils';

type Mode = 'query' | 'update';

const modeToCandid = {
    query: ' query',
    update: ''
};

export function query(
    paramsIdls: (CandidType | CandidClass)[],
    returnIdl: CandidType | CandidClass
) {
    return (target, key, descriptor) => {
        return setupCanisterMethod(
            paramsIdls,
            returnIdl,
            'query',
            target,
            key,
            descriptor
        );
    };
}

export function update(
    paramsIdls: (CandidType | CandidClass)[],
    returnIdl: CandidType | CandidClass
) {
    return (target, key, descriptor) => {
        return setupCanisterMethod(
            paramsIdls,
            returnIdl,
            'update',
            target,
            key,
            descriptor
        );
    };
}

function setupCanisterMethod(
    paramsIdls: (CandidType | CandidClass)[],
    returnIdl: CandidType | CandidClass,
    mode: Mode,
    target,
    key,
    descriptor
) {
    paramsIdls = toCandidClasses(paramsIdls);
    returnIdl = toCandidClass(returnIdl);
    globalThis._azleCandidMethods.push(
        `${key}: (${paramsIdls
            .map((paramIdl) => display(paramIdl))
            .join(', ')}) -> (${display(returnIdl)})${modeToCandid[mode]};`
    );

    const originalMethod = descriptor.value;

    descriptor.value = function (...args) {
        const decoded = IDL.decode(paramsIdls, args[0]);

        return new Uint8Array(
            IDL.encode([returnIdl], [originalMethod(...decoded)])
        ).buffer;
    };

    return descriptor;
}
