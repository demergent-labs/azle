import '../experimental';

import { handleUncaughtError } from '../../stable/error';
import { CandidType } from '../candid/candid_type';
import { decode } from '../candid/serde/decode';
import { encode } from '../candid/serde/encode';
import { ic } from '../ic';
import { CanisterMethodInfo } from './types/canister_method_info';

export function executeMethod(
    mode: CanisterMethodInfo<any, any>['mode'],
    args: any[],
    callback: any,
    paramCandidTypes: CandidType[],
    returnCandidType: CandidType,
    manual: boolean
): void {
    const decodedArgs =
        mode === 'inspectMessage' ? args : decode(paramCandidTypes, args[0]);

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
                    ic.reply({ raw: encode(returnCandidType, result) });
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
            ic.reply({ raw: encode(returnCandidType, result) });
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
        console.info(`final instructions: ${ic.instructionCounter()}`);
    }
}
