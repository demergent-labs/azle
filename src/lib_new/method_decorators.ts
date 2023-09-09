import { ic } from './ic';
import { IDL } from './index';

import {
    CandidClass,
    ReturnCandidClass,
    toParamCandidClasses,
    toReturnCandidClass,
    CandidTypesDefs,
    CandidDef,
    extractCandid
} from './utils';
import { display } from './utils';
import { serviceCall, serviceDecorator } from './service';

export type Manual<T> = void;

type Mode = 'init' | 'postUpgrade' | 'query' | 'update' | 'heartbeat';

const modeToCandid = {
    query: ' query',
    update: ''
};

type MethodArgs = { manual: boolean };

// Until we can figure how how to type check Funcs, Variants, and Records we are just going to have to use any here
// export function query(paramsIdls: CandidClass[], returnIdl: ReturnCandidClass) {
export function init(paramsIdls: any[]): any {
    return (target: any, key: string, descriptor?: PropertyDescriptor) => {
        return setupCanisterMethod(
            target,
            paramsIdls,
            [],
            'init',
            false,
            key,
            descriptor
        );
    };
}

// Until we can figure how how to type check Funcs, Variants, and Records we are just going to have to use any here
// export function query(paramsIdls: CandidClass[], returnIdl: ReturnCandidClass) {
export function postUpgrade(paramsIdls: any[]): any {
    return (target: any, key: string, descriptor?: PropertyDescriptor) => {
        return setupCanisterMethod(
            target,
            paramsIdls,
            [],
            'postUpgrade',
            false,
            key,
            descriptor
        );
    };
}

export function heartbeat(
    target: any,
    key: string,
    descriptor?: PropertyDescriptor
) {
    return setupCanisterMethod(
        target,
        [],
        [],
        'heartbeat',
        false,
        key,
        descriptor
    );
}

// Until we can figure how how to type check Funcs, Variants, and Records we are just going to have to use any here
// export function query(paramsIdls: CandidClass[], returnIdl: ReturnCandidClass) {
export function query(
    paramsIdls: any[],
    returnIdl: any,
    args: MethodArgs = { manual: false }
): any {
    return (target: any, key: string, descriptor?: PropertyDescriptor) => {
        if (descriptor === undefined) {
            serviceDecorator(target, key, paramsIdls, returnIdl);
        } else {
            return setupCanisterMethod(
                target,
                paramsIdls,
                returnIdl,
                'query',
                args.manual,
                key,
                descriptor
            );
        }
    };
}

// export function update(
//     paramsIdls: CandidClass[],
//     returnIdl: ReturnCandidClass
export function update(
    paramsIdls: any[],
    returnIdl: any,
    args: MethodArgs = { manual: false }
): any {
    return (target: any, key: string, descriptor?: PropertyDescriptor) => {
        if (descriptor === undefined) {
            serviceDecorator(target, key, paramsIdls, returnIdl);
        } else {
            return setupCanisterMethod(
                target,
                paramsIdls,
                returnIdl,
                'update',
                args.manual,
                key,
                descriptor
            );
        }
    };
}

function newTypesToStingArr(newTypes: CandidTypesDefs): string[] {
    return Object.entries(newTypes).map(
        ([name, candid]) => `type ${name} = ${candid}`
    );
}

function handleRecursiveParams(
    idls: CandidClass[]
): [CandidClass[], CandidDef[], CandidTypesDefs] {
    const paramIdls = toParamCandidClasses(idls);
    const paramInfo = paramIdls.map((paramIdl) => display(paramIdl, {}));
    return [paramIdls, ...extractCandid(paramInfo, {})];
}

function handleRecursiveReturn(
    returnIdl: ReturnCandidClass,
    paramCandidTypeDefs: CandidTypesDefs
): [CandidClass[], CandidDef[], CandidTypesDefs] {
    const returnIdls = toReturnCandidClass(returnIdl);
    const returnInfo = returnIdls.map((returnIdl) => display(returnIdl, {}));
    return [returnIdls, ...extractCandid(returnInfo, paramCandidTypeDefs)];
}

function setupCanisterMethod(
    target: any,
    paramsIdls: CandidClass[],
    returnIdl: ReturnCandidClass,
    mode: Mode,
    manual: boolean,
    key: string,
    descriptor: PropertyDescriptor
) {
    const paramCandid = handleRecursiveParams(paramsIdls);
    const returnCandid = handleRecursiveReturn(returnIdl, paramCandid[2]);

    if (target.constructor._azleCanisterMethods === undefined) {
        target.constructor._azleCanisterMethods = {
            queries: [],
            updates: []
        };
    }

    if (target.constructor._azleCandidInitParams === undefined) {
        target.constructor._azleCandidInitParams = [];
    }

    if (mode === 'init' || mode === 'postUpgrade') {
        target.constructor._azleCandidInitParams = paramCandid[1];
    }

    if (target.constructor._azleCandidTypes === undefined) {
        target.constructor._azleCandidTypes = [];
    }

    target.constructor._azleCandidTypes = [
        ...target.constructor._azleCandidTypes,
        ...newTypesToStingArr(returnCandid[2])
    ];

    if (mode === 'query' || mode === 'update') {
        if (target.constructor._azleCandidMethods === undefined) {
            target.constructor._azleCandidMethods = [];
        }

        target.constructor._azleCandidMethods.push(
            `${key}: (${paramCandid[1].join(', ')}) -> (${returnCandid[1]})${
                modeToCandid[mode]
            };`
        );
    }

    if (mode === 'query') {
        target.constructor._azleCanisterMethods.queries.push({
            name: key
        });
    }

    if (mode === 'update') {
        target.constructor._azleCanisterMethods.updates.push({
            name: key
        });
    }

    if (mode === 'heartbeat') {
        target.constructor._azleCanisterMethods.heartbeat = {
            name: key
        };
    }

    const originalMethod = descriptor.value;

    // This must remain a function and not an arrow function
    // in order to set the context (this) correctly
    descriptor.value = function (...args: any[]) {
        if (args[0] === '_AZLE_CROSS_CANISTER_CALL') {
            const serviceCallInner = serviceCall(key, paramsIdls, returnIdl);
            return serviceCallInner.call(this, ...args);
        }

        if (mode === 'heartbeat') {
            originalMethod.call(this);
            return;
        }

        const decoded = IDL.decode(paramCandid[0], args[0]);

        const result = originalMethod.apply(this, decoded);

        if (mode === 'init' || mode === 'postUpgrade') {
            return;
        }

        if (
            result !== undefined &&
            result !== null &&
            typeof result.then === 'function'
        ) {
            result
                .then((result) => {
                    const encodeReadyResult =
                        result === undefined ? [] : [result];

                    const encoded = IDL.encode(
                        returnCandid[0],
                        encodeReadyResult
                    );

                    // TODO this won't be accurate because we have most likely had
                    // TODO cross-canister calls
                    console.log(
                        `final instructions: ${ic.instructionCounter()}`
                    );

                    if (!manual) {
                        ic.replyRaw(new Uint8Array(encoded));
                    }
                })
                .catch((error) => {
                    ic.trap(error.toString());
                });
        } else {
            const encodeReadyResult = result === undefined ? [] : [result];

            if (!manual) {
                const encoded = IDL.encode(returnCandid[0], encodeReadyResult);
                ic.replyRaw(new Uint8Array(encoded));
            }

            console.log(`final instructions: ${ic.instructionCounter()}`);
        }
    };

    if (mode === 'init') {
        globalThis._azleInitName = key;
    }

    if (mode === 'postUpgrade') {
        globalThis._azlePostUpgradeName = key;
    }

    return descriptor;
}
