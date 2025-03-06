import '#experimental/lib/assert_experimental';

import { handleUncaughtError } from '#lib/error';
import { msgArgData, msgReply, performanceCounter } from '#lib/ic_apis/index';

import { CandidType } from '../candid/candid_type';
import { decode } from '../candid/serde/decode';
import { encode } from '../candid/serde/encode';
import { CanisterMethodInfo } from './types/canister_method_info';

export function executeMethod(
    mode: CanisterMethodInfo<any, any>['mode'],
    callback: any,
    paramCandidTypes: CandidType[],
    returnCandidType: CandidType,
    manual: boolean
): void {
    const args = msgArgData();

    const decodedArgs =
        mode === 'inspectMessage' ? args : decode(paramCandidTypes, args);

    const result = getResult(decodedArgs, callback);

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
                if (!manual) {
                    msgReply(encode(returnCandidType, result));
                }

                // TODO this won't be accurate because we have most likely had
                // TODO cross-canister calls
                reportFinalInstructions();
            })
            .catch((error: any) => {
                handleUncaughtError(error);
            });
    } else {
        if (!manual) {
            msgReply(encode(returnCandidType, result));
        }

        reportFinalInstructions();
    }
}

function getResult(args: any[], callback: any): any {
    try {
        return callback(...args);
    } catch (error) {
        handleUncaughtError(error);
    }
}

function reportFinalInstructions(): void {
    if (process.env.AZLE_INSTRUCTION_COUNT === 'true') {
        console.info(`final instructions: ${performanceCounter(1)}`);
    }
}
