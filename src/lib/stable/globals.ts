import { IDL } from '@dfinity/candid';
import { TextDecoder, TextEncoder } from 'text-encoding';

import { MethodMeta } from '../../build/stable/utils/types';
import { jsonReplacer } from '../stable/stable_structures/stable_json';
import { print } from './ic_apis';
import { AzleIc } from './ic_apis/azle_ic';

type Callbacks = {
    [key: string]: (...args: any) => any;
};

declare global {
    // eslint-disable-next-line no-var
    var _azleCallbacks: Callbacks;
    // eslint-disable-next-line no-var
    var _azleCanisterClassInstance: any;
    // eslint-disable-next-line no-var
    var _azleCanisterMethodIdlTypes: { [key: string]: IDL.FuncClass };
    // eslint-disable-next-line no-var
    var _azleCanisterMethodsIndex: number;
    // eslint-disable-next-line no-var
    var _azleExperimental: boolean;
    // eslint-disable-next-line no-var
    var _azleIc: AzleIc;
    // eslint-disable-next-line no-var
    var _azleIcTimers: { [key: string]: string };
    // eslint-disable-next-line no-var
    var _azleInitAndPostUpgradeIdlTypes: IDL.FuncClass[];
    // eslint-disable-next-line no-var
    var _azleInitCalled: boolean;
    // eslint-disable-next-line no-var
    var _azleInsideCanister: boolean;
    // eslint-disable-next-line no-var
    var _azleMethodMeta: MethodMeta;
    // eslint-disable-next-line no-var
    var _azleNodeWasmEnvironment: boolean;
    // eslint-disable-next-line no-var
    var _azlePostUpgradeCalled: boolean;
    // eslint-disable-next-line no-var
    var _azleRejectIds: { [key: string]: (err: any) => void };
    // eslint-disable-next-line no-var
    var _azleResolveIds: { [key: string]: (buf: ArrayBuffer) => void };
    // eslint-disable-next-line no-var
    var _azleTimerCallbacks: { [key: string]: () => void };
}

globalThis._azleInsideCanister =
    globalThis._azleIc === undefined ? false : true;

// TODO do we need to disable setTimeout, setInterval, etc?
// TODO do we need to disable any other wasmedge-quickjs globals
// TODO that we don't think are stable yet?
if (globalThis._azleInsideCanister === true) {
    globalThis._azleCallbacks = {};

    globalThis._azleCanisterMethodsIndex = 0;

    globalThis._azleCanisterMethodIdlTypes = {};

    globalThis._azleInitAndPostUpgradeIdlTypes = [];

    globalThis._azleMethodMeta = {
        queries: [],
        updates: []
    };

    globalThis._azleTimerCallbacks = {};

    globalThis._azleIcTimers = {};

    globalThis._azleRejectIds = {};

    globalThis._azleResolveIds = {};

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

    globalThis._azleInitCalled = false;
    globalThis._azlePostUpgradeCalled = false;

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
