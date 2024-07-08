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

        const methodCallback = (...args: any[]) => {
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

        globalThis._azleCanisterMethods.updates.push({
            name: propertyKey as string
            // TODO implement guard
        });

        globalThis._azleCanisterMethods.callbacks[propertyKey as string] =
            methodCallback;

        return descriptor;
    };
}
