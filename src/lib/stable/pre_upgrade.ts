export function preUpgrade<T>(
    _target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
    globalThis._azleCanisterMethods.pre_upgrade = {
        name: propertyKey as string
    };

    globalThis._azleCanisterMethods.callbacks[propertyKey as string] =
        descriptor.value as any;

    return descriptor;
}
