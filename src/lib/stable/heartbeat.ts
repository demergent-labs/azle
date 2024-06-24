export function heartbeat<T>(
    _target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
    globalThis._azleCanisterMethods.heartbeat = {
        name: propertyKey as string
    };

    globalThis._azleCanisterMethods.callbacks[propertyKey as string] =
        descriptor.value as any;

    return descriptor;
}

// TODO do we need this?
// TODO it would be nice if QuickJS would just panic
// TODO on all uncaught exceptions
// function executeHeartbeat(callback: any) {
//     const result = callback();

//     if (
//         result !== undefined &&
//         result !== null &&
//         typeof result.then === 'function'
//     ) {
//         result.catch((error: any) => {
//             ic.trap(error.toString());
//         });
//     }

//     return;
// }
