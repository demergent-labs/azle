import { IDL } from '@dfinity/candid';

import { executeWithCandidSerde } from './execute_with_candid_serde';

export function update(
    paramIdls: IDL.Type[],
    returnIdl?: IDL.Type,
    options?: {
        manual?: boolean;
    }
): MethodDecorator {
    return <T>(
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> | void => {
        const originalMethod = (descriptor.value as any).bind(target);

        const methodCallback = (...args: any[]): void => {
            executeWithCandidSerde(
                'update',
                args,
                originalMethod,
                paramIdls,
                returnIdl,
                options?.manual ?? false
            );
        };

        descriptor.value = methodCallback as any;

        const index = globalThis._azleCanisterMethodsIndex++;

        globalThis._azleCanisterMethods.updates.push({
            name: propertyKey as string,
            index
        });

        globalThis._azleCanisterMethods.callbacks[index.toString()] =
            methodCallback;

        return descriptor;
    };
}
