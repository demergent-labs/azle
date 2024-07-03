import { IDL } from '@dfinity/candid';

import { executeWithCandidSerde } from './execute_with_candid_serde';
import { createGlobalGuard } from './guard';

export function update(
    paramIdls: IDL.Type[],
    returnIdl?: IDL.Type,
    options?: {
        manual?: boolean;
        guard?: () => void; // TODO can guard functions be async?
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

        globalThis._azleCanisterMethods.updates.push({
            name: propertyKey as string,
            guard_name:
                options?.guard === undefined
                    ? undefined
                    : createGlobalGuard(options?.guard, propertyKey as string)
        });

        globalThis._azleCanisterMethods.callbacks[propertyKey as string] =
            methodCallback;

        return descriptor;
    };
}
