import { IDL } from '@dfinity/candid';

import { executeWithCandidSerde } from './execute_with_candid_serde';

export function init(paramIdls: IDL.Type[]): MethodDecorator {
    return <T>(
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> | void => {
        const originalMethod = (descriptor.value as any).bind(target);

        const methodCallback = (...args: any[]) => {
            executeWithCandidSerde(
                'init',
                args,
                originalMethod,
                paramIdls,
                undefined,
                false // TODO implement manual check
            );
        };

        descriptor.value = methodCallback as any;

        globalThis._azleCanisterMethods.init = {
            name: propertyKey as string
        };

        globalThis._azleCanisterMethods.callbacks[propertyKey as string] =
            methodCallback;

        return descriptor;
    };
}
