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
    const index = globalThis._azleCanisterMethodsIndex++;

    globalThis._azleCanisterMethods.inspect_message = {
        name: propertyKey as string,
        index
    };

    globalThis._azleCanisterMethods.callbacks[index.toString()] =
        descriptor.value as any;

    return descriptor;
}
