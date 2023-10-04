import { ic } from './ic';
import { AzleIc } from './ic/types/azle_ic';
import { Buffer } from 'buffer';

declare global {
    var _azleIc: AzleIc;
    var _azleResolveIds: { [key: string]: (buf: ArrayBuffer) => void };
    var _azleRejectIds: { [key: string]: (err: any) => void };
    var icTimers: { [key: string]: string };
    var _azleTimerCallbackIds: { [key: string]: () => void };
    var Buffer: BufferConstructor;
    // var console: Console;
    // var crypto: Crypto;
    var icTimers: {
        [key: string]: string;
    };
    // var TextDecoder: any;
    // var TextEncoder: any;
}

// export declare var globalThis: {
//     Buffer: BufferConstructor;
//     console: any;
//     crypto: {
//         getRandomValues: () => Uint8Array;
//     };
//     TextDecoder: any;
//     TextEncoder: any;
// };

globalThis.TextDecoder = require('text-encoding').TextDecoder;
globalThis.TextEncoder = require('text-encoding').TextEncoder;
globalThis.icTimers ||= {};
globalThis._azleResolveIds = {};
globalThis._azleRejectIds = {};
globalThis._azleTimerCallbackIds = {};

globalThis.console = {
    ...globalThis.console,
    log: (...args: any[]) => {
        ic.print(...args);
    }
};

// TODO be careful we are using a random seed of 0 I think
// TODO the randomness is predictable
globalThis.crypto = {
    ...globalThis.crypto,
    getRandomValues: (() => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    }) as any
};

globalThis.Buffer = Buffer;
