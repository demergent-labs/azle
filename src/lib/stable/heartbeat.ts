import { handleUncaughtError } from './error';

export function heartbeat<T>(
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
    const index = globalThis._azleCanisterMethodsIndex++;

    globalThis._azleCanisterMethods.heartbeat = {
        name: propertyKey as string,
        index
    };

    globalThis._azleCanisterMethods.callbacks[index.toString()] =
        async (): Promise<void> => {
            try {
                await (descriptor.value as any).bind(target)();
            } catch (error) {
                handleUncaughtError(error);
            }
        };

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
