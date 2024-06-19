import { IDL } from '@dfinity/candid';

import { executeMethod } from './execute_method';

export function update(
    paramIdls: IDL.Type[],
    returnIdl?: IDL.Type
): MethodDecorator {
    return <T>(
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> | void => {
        const originalMethod = (descriptor.value as any).bind(target);

        const methodCallback = (...args: any[]) => {
            executeMethod(
                'update',
                args,
                originalMethod,
                paramIdls,
                returnIdl,
                false // TODO implement manual check
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
