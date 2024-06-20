import { IDL } from '@dfinity/candid';

import { executeMethod } from './execute_method';

export function postUpgrade(paramIdls: IDL.Type[]): MethodDecorator {
    return <T>(
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> | void => {
        const originalMethod = (descriptor.value as any).bind(target);

        const methodCallback = (...args: any[]) => {
            globalThis._azlePostUpgradeCalled = true;

            executeMethod(
                'postUpgrade',
                args,
                originalMethod,
                paramIdls,
                undefined,
                false // TODO implement manual check
            );
        };

        descriptor.value = methodCallback as any;

        globalThis._azleCanisterMethods.post_upgrade = {
            name: propertyKey as string
        };

        globalThis._azleCanisterMethods.callbacks[propertyKey as string] =
            methodCallback;

        return descriptor;
    };
}
