import { handleUncaughtError } from './error';

export function preUpgrade<T>(
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
    const index = globalThis._azleCanisterMethodsIndex++;

    globalThis._azleCanisterMethods.pre_upgrade = {
        name: propertyKey as string,
        index
    };

    globalThis._azleCanisterMethods.callbacks[index.toString()] = (): void => {
        try {
            (descriptor.value as any).bind(target)();
        } catch (error) {
            handleUncaughtError(error);
        }
    };

    return descriptor;
}
