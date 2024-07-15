import { IDL } from '@dfinity/candid';

import { executeAndReplyWithCandidSerde } from './execute_with_candid_serde';

export function init<This, Args extends any[], Return>(
    paramIdlTypes: IDL.Type[]
) {
    return (
        originalMethod: (this: This, ...args: Args) => Return,
        context: ClassMethodDecoratorContext
    ): void => {
        const index = globalThis._azleCanisterMethodsIndex++;

        globalThis._azleCanisterMethods.init = {
            name: context.name as string,
            index
        };

        globalThis._azleCanisterMethods.callbacks[index.toString()] = (
            ...args: any[]
        ): void => {
            executeAndReplyWithCandidSerde(
                'init',
                args,
                originalMethod.bind(globalThis._azleCanisterClassInstance),
                paramIdlTypes,
                undefined,
                false
            );
        };
    };
}
