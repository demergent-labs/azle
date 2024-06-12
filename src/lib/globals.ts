import { Buffer } from 'buffer';
import * as process from 'process';
import { TextDecoder, TextEncoder } from 'text-encoding';
import { URL } from 'url';
import { v4 } from 'uuid';

import { azleFetch } from './fetch';
import { ic } from './ic';
import { AzleIc } from './ic/types/azle_ic';
import { jsonReplacer } from './stable_structures/stable_json';

declare global {
    // eslint-disable-next-line no-var
    var _azleInsideCanister: boolean;
    // eslint-disable-next-line no-var
    var _azleWasmtimeCandidEnvironment: boolean;
    // eslint-disable-next-line no-var
    var _azleIc: AzleIc | undefined;
    // eslint-disable-next-line no-var
    var _azleResolveIds: { [key: string]: (buf: ArrayBuffer) => void };
    // eslint-disable-next-line no-var
    var _azleRejectIds: { [key: string]: (err: any) => void };
    // eslint-disable-next-line no-var
    var _azleIcTimers: { [key: string]: string };
    // eslint-disable-next-line no-var
    var _azleTimerCallbacks: { [key: string]: () => void };
    // eslint-disable-next-line no-var
    var _azleGuardFunctions: { [key: string]: () => any };
    // eslint-disable-next-line no-var
    var _azleWebAssembly: any;
    // eslint-disable-next-line no-var
    var _azleOutgoingHttpOptionsSubnetSize: number | undefined;
    // eslint-disable-next-line no-var
    var _azleOutgoingHttpOptionsMaxResponseBytes: bigint | undefined;
    // eslint-disable-next-line no-var
    var _azleOutgoingHttpOptionsCycles: bigint | undefined;
    // eslint-disable-next-line no-var
    var _azleOutgoingHttpOptionsTransformMethodName: string | undefined;
    // eslint-disable-next-line no-var
    var _azleOutgoingHttpOptionsTransformContext: Uint8Array | undefined;
    // eslint-disable-next-line no-var
    var _azleInitCalled: boolean;
    // eslint-disable-next-line no-var
    var _azlePostUpgradeCalled: boolean;
}

globalThis._azleInsideCanister =
    globalThis._azleIc === undefined ? false : true;

if (globalThis._azleInsideCanister) {
    globalThis._azleInitCalled = false;
    globalThis._azlePostUpgradeCalled = false;

    globalThis.window = globalThis as any;

    const log = (...args: any[]) => {
        const jsonStringifiedArgs = args
            .map((arg) => {
                if (arg instanceof Error) {
                    return `${arg.name}: ${arg.message} at ${arg.stack}`;
                } else {
                    return JSON.stringify(arg, jsonReplacer, 4);
                }
            })
            .join(' ');

        ic.print(jsonStringifiedArgs);
    };

    globalThis.console = {
        ...globalThis.console,
        log,
        error: log,
        warn: log,
        info: log
    };

    const originalSetTimeout = setTimeout;

    (globalThis as any).setTimeout = (
        handler: TimerHandler,
        timeout?: number
    ) => {
        if (timeout !== undefined && timeout !== 0) {
            console.warn(
                `Azle Warning: setTimeout may not behave as expected with milliseconds above 0; called with ${timeout} milliseconds`,
                new Error().stack
            );
        }

        return originalSetTimeout(handler, 0);
    };

    globalThis.TextDecoder = TextDecoder;
    globalThis.TextEncoder = TextEncoder;
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

    // TODO These write implementations are not correct, they are just good enough
    // TODO to get NestJS logging looking pretty good
    globalThis.process = {
        ...process,
        stdout: {
            write: (message: string) => {
                stdioWrite(message);
            }
        } as any,
        stderr: {
            write: (message: string) => {
                stdioWrite(message);
            }
        } as any
    };

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

            for (const [key, value] of exportEntries) {
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

    (globalThis as any).fetch = azleFetch;

    (globalThis as any).URL = URL;

    // Unfortunately NestJS needs RegExp.leftContext to work
    const originalExec = RegExp.prototype.exec;

    Object.defineProperty(RegExp.prototype, 'leftContext', {
        value: '',
        writable: true,
        configurable: true
    });

    RegExp.prototype.exec = function (string) {
        const match = originalExec.call(this, string);
        if (match) {
            RegExp.leftContext = (string ?? '').substring(0, match.index);
        }
        return match;
    };

    global.Intl = require('intl');
    require('intl/locale-data/jsonp/en.js');
}

function stdioWrite(message: string) {
    // eslint-disable-next-line
    const ansiEscapeRegex = /\u001b\[.*?m/g;
    const newlineRegex = /\n/g;
    const messageAnsiCodesRemoved = message
        .replace(ansiEscapeRegex, '')
        .replace(newlineRegex, '');
    console.info(messageAnsiCodesRemoved);
}
