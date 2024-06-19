// TODO inspect message can read the arguments of the call
// TODO but it applies to all query and update calls
// TODO the Rust CDK allows you to define parameters
// TODO but it will break all of your other methods
// TODO so do we just leave params out?

export function inspectMessage<T>(
    _target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
    globalThis._azleCanisterMethods.inspect_message = {
        name: propertyKey as string
    };

    globalThis._azleCanisterMethods.callbacks[propertyKey as string] =
        descriptor.value as any;

    return descriptor;
}
