import './state';

// @ts-ignore
import { TextDecoder, TextEncoder } from '@sinonjs/text-encoding';

import { AzleIcExperimental } from '#experimental/lib/ic/azle_ic_experimental';

import { CanisterClassMeta } from './canister_methods';
import { AzleIc } from './ic_apis/azle_ic_stable';
import { jsonReplacer } from './stable_structures/stable_json';
import { Action } from './state';

declare global {
    // eslint-disable-next-line no-var
    var _azleActions: Action[];
    // eslint-disable-next-line no-var
    var _azleCanisterClassMeta: CanisterClassMeta | undefined;
    // eslint-disable-next-line no-var
    var _azleCanisterMethodNames: { [key: string]: string };
    // eslint-disable-next-line no-var
    var _azleDispatch: (action: Action) => void;
    // eslint-disable-next-line no-var
    var _azleExperimental: boolean;
    // eslint-disable-next-line no-var
    var _azleIcExperimental: AzleIcExperimental | undefined;
    // eslint-disable-next-line no-var
    var _azleIcpReplicaWasmEnvironment: boolean;
    // eslint-disable-next-line no-var
    var _azleIc: AzleIc | undefined;
    // eslint-disable-next-line no-var
    var _azleInitCalled: boolean;
    // eslint-disable-next-line no-var
    var _azleNodejsWasmEnvironment: boolean;
    // eslint-disable-next-line no-var
    var _azlePostUpgradeCalled: boolean;
    // eslint-disable-next-line no-var
    var _azleRejectCallbacks: { [globalRejectId: string]: (err: any) => void };
    // eslint-disable-next-line no-var
    var _azleResolveCallbacks: {
        [globalResolveId: string]: (buf: Uint8Array | ArrayBuffer) => void;
    };
    // eslint-disable-next-line no-var
    var _azleTimerCallbacks: { [timerId: string]: () => Promise<void> };
}

// TODO do we need to disable any other wasmedge-quickjs globals
// TODO that we don't think are stable yet?
if (
    globalThis._azleIcpReplicaWasmEnvironment === true ||
    globalThis._azleNodejsWasmEnvironment === true
) {
    globalThis._azleDispatch({
        type: 'SET_TEXT_DECODER',
        payload: TextDecoder,
        location: {
            filepath: 'azle/src/stable/lib/global.ts',
            functionName: ''
        }
    });

    globalThis._azleDispatch({
        type: 'SET_TEXT_ENCODER',
        payload: TextEncoder,
        location: {
            filepath: 'azle/src/stable/lib/global.ts',
            functionName: ''
        }
    });

    globalThis._azleDispatch({
        type: 'SET_CRYPTO',
        payload: {
            ...globalThis.crypto,
            getRandomValues: (array) => {
                if (
                    array instanceof Int8Array === false &&
                    array instanceof Uint8Array === false &&
                    array instanceof Uint8ClampedArray === false &&
                    array instanceof Int16Array === false &&
                    array instanceof Uint16Array === false &&
                    array instanceof Int32Array === false &&
                    array instanceof Uint32Array === false &&
                    array instanceof BigInt64Array === false &&
                    array instanceof BigUint64Array === false
                ) {
                    throw new TypeError(
                        'Expected an Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, BigInt64Array, or BigUint64Array'
                    );
                }

                const byteLength = array.byteLength;

                if (byteLength === 0) {
                    return array;
                }

                if (byteLength > 65_536) {
                    throw new Error(
                        `QuotaExceeded: array cannot be larger than 65_536 bytes`
                    );
                }

                const bytes =
                    globalThis._azleIc !== undefined
                        ? globalThis._azleIc.randBytes(byteLength)
                        : globalThis._azleIcExperimental !== undefined
                          ? new Uint8Array(
                                globalThis._azleIcExperimental.randBytes(
                                    byteLength
                                )
                            )
                          : ((): never => {
                                throw new Error(
                                    `Neither globalThis._azleIc nor globalThis._azleIcExperimental are defined`
                                );
                            })();

                let targetView = new Uint8Array(
                    array.buffer,
                    array.byteOffset,
                    byteLength
                );

                targetView.set(bytes);

                return array;
            }
        },
        location: {
            filepath: 'azle/src/stable/lib/global.ts',
            functionName: ''
        }
    });

    globalThis._azleDispatch({
        type: 'SET_CONSOLE',
        payload: {
            ...globalThis.console,
            log,
            error: log,
            warn: log,
            info: log
        },
        location: {
            filepath: 'azle/src/stable/lib/global.ts',
            functionName: ''
        }
    });

    if (globalThis._azleExperimental === false) {
        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'fetch',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });

        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'Buffer',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });

        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'window',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });

        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'global',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });

        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'self',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });

        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'URL',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });

        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'WebAssembly',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });

        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'setTimeout',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });

        globalThis._azleDispatch({
            type: 'SET_GLOBAL_EXPERIMENTAL_ERROR_PROPERTY',
            payload: 'clearTimeout',
            location: {
                filepath: 'azle/src/stable/lib/global.ts',
                functionName: ''
            }
        });
    }
}

export function log(...args: any[]): void {
    const jsonStringifiedArgs = args
        .map((arg) => {
            if (arg instanceof Error) {
                return `${arg.name}: ${arg.message} at ${arg.stack}`;
            } else {
                return JSON.stringify(arg, jsonReplacer, 4);
            }
        })
        .join(' ');

    if (globalThis._azleIc !== undefined) {
        return globalThis._azleIc.debugPrint(jsonStringifiedArgs);
    } else if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.debugPrint(jsonStringifiedArgs);
    }

    throw new Error(`No global debugPrint implementation found`);
}
