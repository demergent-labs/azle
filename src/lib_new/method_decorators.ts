import { ic } from './ic';
import { GuardResult, IDL } from './index';

import {
    CandidClass,
    ReturnCandidClass,
    toParamIDLTypes,
    toReturnIDLType,
    CandidTypesDefs,
    CandidDef,
    extractCandid,
    Parent
} from './utils';
import { display } from './utils';
import {
    Service,
    serviceCall,
    ServiceConstructor,
    serviceDecorator
} from './service';
import { DecodeVisitor, EncodeVisitor } from './visitors/encode_decode/';

export type Manual<T> = void;

type Mode =
    | 'init'
    | 'postUpgrade'
    | 'preUpgrade'
    | 'query'
    | 'update'
    | 'heartbeat'
    | 'inspectMessage';

const modeToCandid = {
    query: ' query',
    update: ''
};

// TODO add the GuardResult return type
export type MethodArgs = { manual?: boolean; guard?: () => void };

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
            undefined,
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
            undefined,
            key,
            descriptor
        );
    };
}

export function preUpgrade(
    target: any,
    key: string,
    descriptor?: PropertyDescriptor
) {
    return setupCanisterMethod(
        target,
        [],
        [],
        'preUpgrade',
        false,
        undefined,
        key,
        descriptor
    );
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
        undefined,
        key,
        descriptor
    );
}

export function inspectMessage(
    target: any,
    key: string,
    descriptor?: PropertyDescriptor
) {
    return setupCanisterMethod(
        target,
        [],
        [],
        'inspectMessage',
        false,
        undefined,
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
                args.guard,
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
                args.guard,
                key,
                descriptor
            );
        }
    };
}

export function newTypesToStingArr(newTypes: CandidTypesDefs): string[] {
    return Object.entries(newTypes).map(
        ([name, candid]) => `type ${name} = ${candid};`
    );
}

export function handleRecursiveParams(
    idls: CandidClass[],
    parents: Parent[] = []
): [IDL.Type<any>[], CandidDef[], CandidTypesDefs] {
    const paramIdls = toParamIDLTypes(idls, parents);
    const paramInfo = paramIdls.map((paramIdl) => display(paramIdl, {}));
    return [paramIdls, ...extractCandid(paramInfo, {})];
}

export function handleRecursiveReturn(
    returnIdl: ReturnCandidClass,
    paramCandidTypeDefs: CandidTypesDefs,
    parents: Parent[] = []
): [IDL.Type<any>[], CandidDef[], CandidTypesDefs] {
    const returnIdls = toReturnIDLType(returnIdl, parents);
    const returnInfo = returnIdls.map((returnIdl) => display(returnIdl, {}));
    return [returnIdls, ...extractCandid(returnInfo, paramCandidTypeDefs)];
}

function setupCanisterMethod(
    target: any,
    paramsIdls: CandidClass[],
    returnIdl: ReturnCandidClass,
    mode: Mode,
    manual: boolean,
    guard: (() => GuardResult) | undefined,
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

        if (target instanceof Service) {
            addIDLForMethodToServiceConstructor(
                target.constructor,
                key,
                paramsIdls,
                returnIdl,
                mode
            );
        }
    }

    const originalMethod = descriptor.value;

    if (mode === 'query') {
        target.constructor._azleCanisterMethods.queries.push({
            name: key,
            composite: isAsync(originalMethod, key),
            guard_name: createGlobalGuard(guard, key)
        });
    }

    if (mode === 'update') {
        target.constructor._azleCanisterMethods.updates.push({
            name: key,
            guard_name: createGlobalGuard(guard, key)
        });
    }

    if (mode === 'heartbeat') {
        target.constructor._azleCanisterMethods.heartbeat = {
            name: key
        };
    }

    if (mode === 'inspectMessage') {
        target.constructor._azleCanisterMethods.inspect_message = {
            name: key
        };
    }

    if (mode === 'preUpgrade') {
        target.constructor._azleCanisterMethods.pre_upgrade = {
            name: key
        };
    }

    // This must remain a function and not an arrow function
    // in order to set the context (this) correctly
    descriptor.value = function (...args: any[]) {
        if (args[0] === '_AZLE_CROSS_CANISTER_CALL') {
            const serviceCallInner = serviceCall(key, paramsIdls, returnIdl);
            return serviceCallInner.call(this, ...args);
        }

        if (mode === 'heartbeat' || mode === 'preUpgrade') {
            originalMethod.call(this);
            return;
        }

        const decoded = IDL.decode(paramCandid[0], args[0]);
        const myDecodedObject = paramCandid[0].map((idl, index) => {
            return idl.accept(new DecodeVisitor(), {
                js_class: paramsIdls[index],
                js_data: decoded[index]
            });
        });

        const result = originalMethod.apply(this, myDecodedObject);

        if (
            mode === 'init' ||
            mode === 'postUpgrade' ||
            mode === 'inspectMessage'
        ) {
            return;
        }

        const is_promise =
            result !== undefined &&
            result !== null &&
            typeof result.then === 'function';

        if (is_promise) {
            result
                .then((result) => {
                    // TODO this won't be accurate because we have most likely had
                    // TODO cross-canister calls
                    console.log(
                        `final instructions: ${ic.instructionCounter()}`
                    );

                    if (!manual) {
                        const encodeReadyResult =
                            result === undefined ? [] : [result];
                        const encoded = IDL.encode(
                            returnCandid[0],
                            encodeReadyResult
                        );
                        ic.replyRaw(new Uint8Array(encoded));
                    }
                })
                .catch((error) => {
                    ic.trap(error.toString());
                });
        } else {
            if (!manual) {
                const encodeReadyResult = returnCandid[0].map((idl) => {
                    return idl.accept(new EncodeVisitor(), {
                        js_class: returnIdl,
                        js_data: result
                    });
                });
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

export function isAsync(originalFunction: any) {
    if (originalFunction[Symbol.toStringTag] === 'AsyncFunction') {
        return true;
    } else if (originalFunction.constructor.name === 'AsyncFunction') {
        return true;
    } else if (originalFunction.toString().includes('async ')) {
        return true;
    } else {
        return false;
    }
}

export function createGlobalGuard(
    guard: (() => GuardResult) | undefined,
    functionName: string
): string | undefined {
    if (guard === undefined) {
        return undefined;
    }

    const guardName = `_azleGuard_${functionName}`;

    (globalThis as any)[guardName] = guard;

    return guardName;
}

/**
 * Stores an IDL representation of the canister method into a private
 * `_azleFunctionInfo` object on the provided constructor. If that property doesn't
 * exist, then it will be added as a side-effect.
 *
 * @param constructor The class on which to store the IDL information. This
 *   should probably be a Service. This type should probably be tightened down.
 * @param methodName The public name of the canister method
 * @param paramIdls The IDLs of the parameters, coming from the `@query` and
 *   `@update` decorators.
 * @param returnIdl The IDL of the return type, coming from the `@query` and
 *   `@update` decorators.
 * @param mode The mode in which the method should be executed.
 */
function addIDLForMethodToServiceConstructor<T>(
    constructor: T & ServiceConstructor,
    methodName: string,
    paramIdls: CandidClass[],
    returnIdl: ReturnCandidClass,
    mode: 'query' | 'update'
): void {
    if (constructor._azleFunctionInfo === undefined) {
        constructor._azleFunctionInfo = {};
    }

    //  TODO: Technically, there is a possibility that the method name already
    // exists. We may want to handle that case.

    constructor._azleFunctionInfo[methodName] = {
        mode,
        paramIdls,
        returnIdl
    };
}
