import { ic } from './ic';
import { AzleIc } from './ic/types/azle_ic';
import { Buffer } from 'buffer';

declare global {
    var _azleIc: AzleIc | undefined;
    var _azleResolveIds: { [key: string]: (buf: ArrayBuffer) => void };
    var _azleRejectIds: { [key: string]: (err: any) => void };
    var _azleIcTimers: { [key: string]: string };
    var _azleTimerCallbacks: { [key: string]: () => void };
    var _azleGuardFunctions: { [key: string]: () => any };
}

globalThis.TextDecoder = require('text-encoding').TextDecoder;
globalThis.TextEncoder = require('text-encoding').TextEncoder;
globalThis._azleIcTimers = {};
globalThis._azleResolveIds = {};
globalThis._azleRejectIds = {};
globalThis._azleTimerCallbacks = {};
globalThis._azleGuardFunctions = {};

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
