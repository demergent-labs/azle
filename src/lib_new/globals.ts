import { ic } from './ic';
import { Buffer } from 'buffer';

declare var globalThis: {
    TextDecoder: any;
    TextEncoder: any;
    _azleCandidInitParams: any[];
    _azleCandidMethods: any[];
    console: any;
};

globalThis.TextDecoder = require('text-encoding').TextDecoder;
globalThis.TextEncoder = require('text-encoding').TextEncoder;

globalThis._azleCandidInitParams = [];
globalThis._azleCandidMethods = [];

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
