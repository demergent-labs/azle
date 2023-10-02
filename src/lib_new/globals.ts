import { ic } from '../lib_functional/ic';
import { Buffer } from 'buffer';

export declare var globalThis: {
    _azleCandidInitParams: any[];
    _azleCandidMethods: any[];
    _azleCandidTypes: any[];
    Buffer: BufferConstructor;
    console: any;
    crypto: {
        getRandomValues: () => Uint8Array;
    };
    icTimers: {
        [key: string]: string;
    };
    TextDecoder: any;
    TextEncoder: any;
};

globalThis.TextDecoder = require('text-encoding').TextDecoder;
globalThis.TextEncoder = require('text-encoding').TextEncoder;
globalThis.icTimers ||= {};

globalThis.console = {
    ...globalThis.console,
    log: (...args: any[]) => {
        ic.print(...args);
    }
};

// TODO be careful we are using a random seed of 0 I think
// TODO the randomness is predictable
globalThis.crypto = {
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    }
};

globalThis.Buffer = Buffer;
