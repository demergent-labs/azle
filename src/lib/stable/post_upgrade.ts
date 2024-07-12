import { IDL } from '@dfinity/candid';

import { executeWithCandidSerde } from './execute_with_candid_serde';

export function postUpgrade(paramIdls: IDL.Type[]): MethodDecorator {
    return <T>(
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> | void => {
        const originalMethod = (descriptor.value as any).bind(target);

        const methodCallback = (...args: any[]): void => {
            executeWithCandidSerde(
                'postUpgrade',
                args,
                originalMethod,
                paramIdls,
                undefined,
                false // TODO implement manual check
            );
        };

        descriptor.value = methodCallback as any;

        const index = globalThis._azleCanisterMethodsIndex++;

        globalThis._azleCanisterMethods.post_upgrade = {
            name: propertyKey as string,
            index
        };

        globalThis._azleCanisterMethods.callbacks[index.toString()] =
            methodCallback;

        return descriptor;
    };
}
