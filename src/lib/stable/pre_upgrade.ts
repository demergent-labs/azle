export function preUpgrade<T>(
    _target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
    const index = globalThis._azleCanisterMethodsIndex++;

    globalThis._azleCanisterMethods.pre_upgrade = {
        name: propertyKey as string,
        index
    };

    globalThis._azleCanisterMethods.callbacks[index.toString()] =
        descriptor.value as any;

    return descriptor;
}
