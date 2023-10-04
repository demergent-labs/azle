import { AzleVoid } from '../candid/types/primitive/void';
import { ic } from '../ic';
import { CandidType, TypeMapping } from '../candid';
import { decodeMultiple, encode } from '../candid/serde';

export * from './heartbeat';
export * from './init';
export * from './inspect_message';
export * from './post_upgrade';
export * from './pre_upgrade';
export * from './query';
export * from './update';

export function Manual(t: any): AzleVoid {
    return t;
}

export type MethodArgs = { manual?: boolean; guard?: () => void };

export type CanisterMethodInfo<T extends ReadonlyArray<any>, K> = {
    mode:
        | 'query'
        | 'update'
        | 'init'
        | 'heartbeat'
        | 'inspectMessage'
        | 'postUpgrade'
        | 'preUpgrade';
    async: boolean;
    callback?: (...args: any) => any;
    paramCandidTypes: any[];
    returnCandidType: any;
    guard: (() => any) | undefined;
};

export type Callback<
    Params extends ReadonlyArray<CandidType>,
    Return extends CandidType
> = (
    ...args: { [K in keyof Params]: TypeMapping<Params[K]> }
) => TypeMapping<Return> | Promise<TypeMapping<Return>>;

export function executeMethod(
    mode: CanisterMethodInfo<any, any>['mode'],
    args: any[],
    callback: any,
    paramCandidTypes: CandidType[],
    returnCandidType: CandidType,
    manual: boolean
) {
    if (mode === 'heartbeat') {
        const result = callback();

        if (
            result !== undefined &&
            result !== null &&
            typeof result.then === 'function'
        ) {
            result.catch((error: any) => {
                ic.trap(error.toString());
            });
        }

        return;
    }

    if (mode === 'preUpgrade') {
        callback();
        return;
    }

    const decodedArgs = decodeMultiple(paramCandidTypes, args[0]);

    const result = callback(...decodedArgs);

    if (
        mode === 'init' ||
        mode === 'postUpgrade' ||
        mode === 'inspectMessage'
    ) {
        return;
    }

    if (
        result !== undefined &&
        result !== null &&
        typeof result.then === 'function'
    ) {
        result
            .then((result: any) => {
                // TODO this won't be accurate because we have most likely had
                // TODO cross-canister calls
                reportFinalInstructions();

                if (!manual) {
                    ic.replyRaw(encode(returnCandidType, result));
                }
            })
            .catch((error: any) => {
                ic.trap(error.toString());
            });
    } else {
        if (!manual) {
            ic.replyRaw(encode(returnCandidType, result));
        }

        reportFinalInstructions();
    }
}

function reportFinalInstructions() {
    if (process.env.AZLE_INSTRUCTION_COUNT === 'true') {
        console.log(`final instructions: ${ic.instructionCounter()}`);
    }
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
