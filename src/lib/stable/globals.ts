// @ts-ignore
import { TextDecoder, TextEncoder } from '@sinonjs/text-encoding';

import { AzleIcExperimental } from '../experimental/ic/azle_ic_experimental';
import { jsonReplacer } from '../stable/stable_structures/stable_json';
import { ExportedCanisterClass } from './canister_methods';
import { print } from './ic_apis';
import { AzleIcStable } from './ic_apis/azle_ic_stable';

declare global {
    // eslint-disable-next-line no-var
    var _azleCanisterMethodNames: { [key: string]: string };
    // eslint-disable-next-line no-var
    var _azleExperimental: boolean;
    // eslint-disable-next-line no-var
    var _azleExportedCanisterClassInstance: ExportedCanisterClass;
    // eslint-disable-next-line no-var
    var _azleIcExperimental: AzleIcExperimental;
    // eslint-disable-next-line no-var
    var _azleIcStable: AzleIcStable;
    // eslint-disable-next-line no-var
    var _azleIcTimers: { [key: string]: string };
    // eslint-disable-next-line no-var
    var _azleInitCalled: boolean;
    // eslint-disable-next-line no-var
    var _azleInsideCanister: boolean;
    // eslint-disable-next-line no-var
    var _azleNodeWasmEnvironment: boolean;
    // eslint-disable-next-line no-var
    var _azlePostUpgradeCalled: boolean;
    // eslint-disable-next-line no-var
    var _azleRecordBenchmarks: boolean;
    // eslint-disable-next-line no-var
    var _azleRejectCallbacks: { [key: string]: (err: any) => void };
    // eslint-disable-next-line no-var
    var _azleResolveCallbacks: {
        [key: string]: (buf: Uint8Array | ArrayBuffer) => void;
    };
    // eslint-disable-next-line no-var
    var _azleTimerCallbacks: { [key: string]: () => void };
}

globalThis._azleInsideCanister =
    globalThis._azleIcStable === undefined &&
    globalThis._azleIcExperimental === undefined
        ? false
        : true;

// TODO do we need to disable setTimeout, setInterval, etc?
// TODO do we need to disable any other wasmedge-quickjs globals
// TODO that we don't think are stable yet?
if (globalThis._azleInsideCanister === true) {
    globalThis.TextDecoder = TextDecoder;
    globalThis.TextEncoder = TextEncoder;

    // TODO be careful we are using a random seed of 0 I think
    // TODO the randomness is predictable
    globalThis.crypto = {
        ...globalThis.crypto,
        getRandomValues: ((array: Uint8Array) => {
            // TODO the type is wrong of array
            // TODO this could possibly be any kind of TypedArray

            for (let i = 0; i < array.length; i++) {
                array[i] = Math.floor(Math.random() * 256);
            }

            return array;
        }) as any
    };

    const log = (...args: any[]): void => {
        const jsonStringifiedArgs = args
            .map((arg) => {
                if (arg instanceof Error) {
                    return `${arg.name}: ${arg.message} at ${arg.stack}`;
                } else {
                    return JSON.stringify(arg, jsonReplacer, 4);
                }
            })
            .join(' ');

        print(jsonStringifiedArgs);
    };

    globalThis.console = {
        ...globalThis.console,
        log,
        error: log,
        warn: log,
        info: log
    };

    if (globalThis._azleExperimental === false) {
        createGlobalExperimentalErrorProperty('fetch');
        createGlobalExperimentalErrorProperty('Buffer');
        createGlobalExperimentalErrorProperty('window');
        createGlobalExperimentalErrorProperty('global');
        createGlobalExperimentalErrorProperty('self');
        createGlobalExperimentalErrorProperty('URL');
        createGlobalExperimentalErrorProperty('WebAssembly');
        createGlobalExperimentalErrorProperty('setTimeout');
        createGlobalExperimentalErrorProperty('clearTimeout');
    }
}

function createGlobalExperimentalErrorProperty(name: string): void {
    Object.defineProperty(globalThis, name, {
        get() {
            throw new Error(experimentalWarningMessage(name));
        }
    });
}

function experimentalWarningMessage(name: string): string {
    return `Azle: experimental mode must be enabled to use global ${name}. You can enable experimental mode in your dfx.json file like this:
{
    "canisters": {
        "canisterName": {
            "type": "azle",
            "main": "index.ts",
            "custom": {
                "experimental": true
            }
        }
    }
}
`;
}
