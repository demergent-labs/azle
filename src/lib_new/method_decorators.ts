import { ic } from './ic';
import { IDL } from '@dfinity/candid';

import {
    CandidClass,
    ReturnCandidClass,
    toCandidClasses,
    toReturnCandidClass
} from './utils';
import { display } from './utils';
import { serviceDecorator } from './service';

type Mode = 'query' | 'update';

const modeToCandid = {
    query: ' query',
    update: ''
};

// Until we can figure how how to type check Funcs, Variants, and Records we are just going to have to use any here
// export function query(paramsIdls: CandidClass[], returnIdl: ReturnCandidClass) {
export function query(paramsIdls: any[], returnIdl: any): any {
    return (target: any, key: string, descriptor?: PropertyDescriptor) => {
        if (descriptor === undefined) {
            serviceDecorator(target, key, paramsIdls, returnIdl);
        } else {
            return setupCanisterMethod(
                paramsIdls,
                returnIdl,
                'query',
                key,
                descriptor
            );
        }
    };
}

// export function update(
//     paramsIdls: CandidClass[],
//     returnIdl: ReturnCandidClass
export function update(paramsIdls: any[], returnIdl: any): any {
    return (target: any, key: string, descriptor?: PropertyDescriptor) => {
        if (descriptor === undefined) {
            serviceDecorator(target, key, paramsIdls, returnIdl);
        } else {
            return setupCanisterMethod(
                paramsIdls,
                returnIdl,
                'update',
                key,
                descriptor
            );
        }
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

        const result = originalMethod(...decoded);

        if (typeof result.then === 'function') {
            result
                .then((result) => {
                    const encodeReadyResult =
                        result === undefined ? [] : [result];

                    const encoded = IDL.encode(returnIdls, encodeReadyResult);

                    ic.replyRaw(new Uint8Array(encoded));
                })
                .catch((error) => {
                    ic.trap(error.toString());
                });
        } else {
            const encodeReadyResult = result === undefined ? [] : [result];

            const encoded = IDL.encode(returnIdls, encodeReadyResult);

            ic.replyRaw(new Uint8Array(encoded));
        }
    };

    return descriptor;
}
