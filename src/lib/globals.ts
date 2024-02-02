import { ic } from './ic';
import { AzleIc } from './ic/types/azle_ic';
import { Buffer } from 'buffer';
import { jsonReplacer } from './stable_structures/stable_json';
import * as process from 'process';
import { v4 } from 'uuid';
import { azleFetch } from './fetch';

declare global {
    var _azleInsideCanister: boolean;
    var _azleWasmtimeCandidEnvironment: boolean;
    var _azleIc: AzleIc | undefined;
    var _azleResolveIds: { [key: string]: (buf: ArrayBuffer) => void };
    var _azleRejectIds: { [key: string]: (err: any) => void };
    var _azleIcTimers: { [key: string]: string };
    var _azleTimerCallbacks: { [key: string]: () => void };
    var _azleGuardFunctions: { [key: string]: () => any };
    var _azleWebAssembly: any;
}

globalThis._azleInsideCanister =
    globalThis._azleIc === undefined ? false : true;

if (globalThis._azleInsideCanister) {
    const log = (...args: any[]) => {
        const jsonStringifiedArgs = args
            .map((arg) => JSON.stringify(arg, jsonReplacer, 4))
            .join(' ');

        ic.print(jsonStringifiedArgs);
    };

    globalThis.console = {
        ...globalThis.console,
        log,
        error: log,
        warn: log
    };

    const originalSetTimeout = setTimeout;

    (globalThis as any).setTimeout = (
        handler: TimerHandler,
        timeout?: number
    ) => {
        if (timeout === undefined || timeout === 0) {
            return originalSetTimeout(handler, 0);
        }

        // TODO change this to throw once errors throw and show up properly
        // TODO should this throw an error or just not do anything? At least a warning would be good right?
        ic.trap(`setTimeout cannot be called with milliseconds above 0`);
    };

    globalThis.TextDecoder = require('text-encoding').TextDecoder;
    globalThis.TextEncoder = require('text-encoding').TextEncoder;
    globalThis._azleIcTimers = {};
    globalThis._azleResolveIds = {};
    globalThis._azleRejectIds = {};
    globalThis._azleTimerCallbacks = {};
    globalThis._azleGuardFunctions = {};

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

    globalThis.Buffer = Buffer;

    globalThis.process = process;
    globalThis.clearInterval = () => {}; // TODO should this throw an error or just not do anything? At least a warning would be good right?

    globalThis.global = globalThis;
    (globalThis as any).self = globalThis;

    globalThis.TypeError = globalThis.Error;

    globalThis.WebAssembly = {
        instantiate: (...args: any[]) => {
            const uuid = v4();

            const instantiatedSource = globalThis._azleWebAssembly.instantiate(
                uuid,
                ...args
            );
            const exportEntries = Object.entries(
                instantiatedSource.instance.exports
            );

            for (let i = 0; i < exportEntries.length; i++) {
                const [key, value] = exportEntries[i];

                if (typeof value === 'function') {
                    instantiatedSource.instance.exports[key] = value.bind({
                        instanceUuid: uuid,
                        exportName: key
                    });
                }
            }

            return instantiatedSource;
        }
    } as any;

    globalThis.fetch = azleFetch;
}
