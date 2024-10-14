import { IDL } from '@dfinity/candid';

import { executeAndReplyWithCandidSerde } from '../execute_with_candid_serde';

export function postUpgrade<This, Args extends any[], Return>(
    paramIdlTypes: IDL.Type[]
) {
    return (
        originalMethod: (this: This, ...args: Args) => Return,
        context: ClassMethodDecoratorContext
    ): void => {
        const index = globalThis._azleCanisterMethodsIndex++;
        const name = context.name as string;

        globalThis._azleMethodMeta.post_upgrade = {
            name,
            index
        };

        globalThis._azleInitAndPostUpgradeIdlTypes.push(
            IDL.Func(paramIdlTypes, [], ['post_upgrade'])
        );

        globalThis._azleCallbacks[index.toString()] = (
            ...args: any[]
        ): void => {
            executeAndReplyWithCandidSerde(
                'postUpgrade',
                args,
                originalMethod.bind(globalThis._azleCanisterClassInstance),
                paramIdlTypes,
                undefined,
                false
            );
        };

        if (globalThis._azleRecordBenchmarks) {
            globalThis._azleCanisterMethodNames[index.toString()] = name;
        }
    };
}
