import './experimental';

import { Buffer } from 'buffer';
import * as process from 'process';
import { TextDecoder, TextEncoder } from 'text-encoding';
import { URL } from 'url';
import { v4 } from 'uuid';

import { azleFetch } from './fetch';

declare global {
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
}

globalThis._azleInsideCanister =
    globalThis._azleIc === undefined ? false : true;

if (globalThis._azleInsideCanister === true) {
    // Even though these are set in stable/globals
    // we must set them again here because importing the url module above
    // seemingly resets globalThis.TextDecoder and globalThis.TextEncoder
    // to the wasmedge-quickjs versions which break with a RangeError: The "ascii" encoding is not supported
    globalThis.TextDecoder = TextDecoder;
    globalThis.TextEncoder = TextEncoder;

    globalThis.window = globalThis as any;

    const originalSetTimeout = setTimeout;

    (globalThis as any).setTimeout = (
        handler: TimerHandler,
        timeout?: number
    ): number => {
        if (timeout !== undefined && timeout !== 0) {
            console.warn(
                `Azle Warning: setTimeout may not behave as expected with milliseconds above 0; called with ${timeout} milliseconds`,
                new Error().stack
            );
        }

        return originalSetTimeout(handler, 0);
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

    globalThis.clearInterval = (): void => {}; // TODO should this throw an error or just not do anything? At least a warning would be good right?

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

    RegExp.prototype.exec = function (string): RegExpExecArray | null {
        const match = originalExec.call(this, string);
        if (match) {
            RegExp.leftContext = (string ?? '').substring(0, match.index);
        }
        return match;
    };

    global.Intl = require('intl');
    require('intl/locale-data/jsonp/en.js');
}

function stdioWrite(message: string): void {
    // eslint-disable-next-line
    const ansiEscapeRegex = /\u001b\[.*?m/g;
    const newlineRegex = /\n/g;
    const messageAnsiCodesRemoved = message
        .replace(ansiEscapeRegex, '')
        .replace(newlineRegex, '');
    console.info(messageAnsiCodesRemoved);
}
