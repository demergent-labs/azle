import { ic } from '../ic';
import { CandidType } from '../candid/candid_type';
import { decode } from '../candid/serde/decode';
import { encode } from '../candid/serde/encode';
import { CanisterMethodInfo } from './types/canister_method_info';

export function executeMethod(
    mode: CanisterMethodInfo<any, any>['mode'],
    args: any[],
    callback: any,
    paramCandidTypes: CandidType[],
    returnCandidType: CandidType,
    manual: boolean
) {
    const decodedArgs = decode(paramCandidTypes, args[0]);

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
