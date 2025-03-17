import './state';

// @ts-ignore
import { TextDecoder, TextEncoder } from '@sinonjs/text-encoding';

import { AzleIcExperimental } from '#experimental/lib/ic/azle_ic_experimental';

import { ExportedCanisterClass } from './canister_methods';
import { AzleIcStable } from './ic_apis/azle_ic_stable';
import { jsonReplacer } from './stable_structures/stable_json';
import { Action } from './state';

declare global {
    // eslint-disable-next-line no-var
    var _azleActions: Action[];
    // eslint-disable-next-line no-var
    var _azleCanisterMethodNames: { [key: string]: string };
    // eslint-disable-next-line no-var
    var _azleDispatch: (action: Action) => void;
    // eslint-disable-next-line no-var
    var _azleExperimental: boolean;
    // eslint-disable-next-line no-var
    var _azleExportedCanisterClassInstance: ExportedCanisterClass | undefined;
    // eslint-disable-next-line no-var
    var _azleIcExperimental: AzleIcExperimental | undefined;
    // eslint-disable-next-line no-var
    var _azleIcpReplicaWasmEnvironment: boolean;
    // eslint-disable-next-line no-var
    var _azleIcStable: AzleIcStable | undefined;
    // eslint-disable-next-line no-var
    var _azleInitCalled: boolean;
    // eslint-disable-next-line no-var
    var _azleNodeWasmEnvironment: boolean;
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
    globalThis._azleNodeWasmEnvironment === true
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

    // TODO be careful we are using a random seed of 0 I think
    // TODO the randomness is predictable
    globalThis._azleDispatch({
        type: 'SET_CRYPTO',
        payload: {
            ...globalThis.crypto,
            getRandomValues: ((array: Uint8Array) => {
                // TODO the type is wrong of array
                // TODO this could possibly be any kind of TypedArray

                for (let i = 0; i < array.length; i++) {
                    array[i] = Math.floor(Math.random() * 256);
                }

                return array;
            }) as any
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

    if (globalThis._azleIcStable !== undefined) {
        return globalThis._azleIcStable.debugPrint(jsonStringifiedArgs);
    } else if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.debugPrint(jsonStringifiedArgs);
    }

    throw new Error(`No global debugPrint implementation found`);
}
