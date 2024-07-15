import { IDL } from '@dfinity/candid';

import { executeWithCandidSerde } from './execute_with_candid_serde';

export function query<This, Args extends any[], Return>(
    paramIdlTypes: IDL.Type[],
    returnIdlTypes: IDL.Type,
    options?: {
        composite?: boolean;
        manual?: boolean;
    }
) {
    return (
        originalMethod: (this: This, ...args: Args) => Return,
        context: ClassMethodDecoratorContext<
            This,
            (this: This, ...args: Args) => Return
        >
    ): void => {
        const index = globalThis._azleCanisterMethodsIndex++;

        globalThis._azleCanisterMethods.queries.push({
            name: context.name as string,
            index,
            composite: options?.composite ?? false
        });

        globalThis._azleCanisterMethods.callbacks[index.toString()] = (
            ...args: any[]
        ): void => {
            executeWithCandidSerde(
                'query',
                args,
                originalMethod.bind(globalThis._azleCanisterClassInstance),
                paramIdlTypes,
                returnIdlTypes,
                options?.manual ?? false
            );
        };
    };
}
