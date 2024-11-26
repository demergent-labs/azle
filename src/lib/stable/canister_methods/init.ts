import { IDL } from '@dfinity/candid';

import { handleUncaughtError } from '../error';
import { executeAndReplyWithCandidSerde } from '../execute_with_candid_serde';

export function init<This, Args extends any[], Return>(
    paramIdlTypes: IDL.Type[]
) {
    return (
        originalMethod: (this: This, ...args: Args) => Return,
        context: ClassMethodDecoratorContext
    ): void => {
        const index = globalThis._azleCanisterMethodsIndex++;
        const name = context.name as string;
        const indexString = index.toString();

        globalThis._azleMethodMeta.init = {
            name,
            index
        };

        globalThis._azleInitAndPostUpgradeIdlTypes.push(
            IDL.Func(paramIdlTypes, [], ['init'])
        );

        globalThis._azleCallbacks[indexString] = async (
            args: Uint8Array
        ): Promise<void> => {
            try {
                await executeAndReplyWithCandidSerde(
                    'init',
                    args,
                    originalMethod.bind(globalThis._azleCanisterClassInstance),
                    paramIdlTypes,
                    undefined,
                    false
                );
            } catch (error: any) {
                handleUncaughtError(error);
            }
        };
    };
}
