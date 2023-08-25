import { IDL } from '@dfinity/candid';

import {
    CandidClass,
    ReturnCandidClass,
    toCandidClasses,
    toReturnCandidClass
} from './property_decorators';
import { display } from './utils';

type Mode = 'query' | 'update';

const modeToCandid = {
    query: ' query',
    update: ''
};

export function query(paramsIdls: CandidClass[], returnIdl: ReturnCandidClass) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        return setupCanisterMethod(
            paramsIdls,
            returnIdl,
            'query',
            key,
            descriptor
        );
    };
}

export function update(
    paramsIdls: CandidClass[],
    returnIdl: ReturnCandidClass
) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        return setupCanisterMethod(
            paramsIdls,
            returnIdl,
            'update',
            key,
            descriptor
        );
    };
}

function setupCanisterMethod(
    paramsIdls: CandidClass[],
    returnIdl: ReturnCandidClass,
    mode: Mode,
    key: string,
    descriptor: PropertyDescriptor
) {
    paramsIdls = toCandidClasses(paramsIdls);
    const returnIdls = toReturnCandidClass(returnIdl);
    globalThis._azleCandidMethods.push(
        `${key}: (${paramsIdls
            .map((paramIdl) => display(paramIdl))
            .join(', ')}) -> (${returnIdls.map((returnIdl) =>
            display(returnIdl)
        )})${modeToCandid[mode]};`
    );

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const decoded = IDL.decode(paramsIdls, args[0]);

        if (returnIdls.length === 0) {
            originalMethod(...decoded);
            return;
        }
        return new Uint8Array(
            IDL.encode(returnIdls, [originalMethod(...decoded)])
        ).buffer;
    };

    return descriptor;
}
