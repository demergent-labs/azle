import { TextDecoder, TextEncoder } from 'text-encoding';

// TODO all global variables used by stable should only be defined here
// TODO and not in the experimental globals file
declare global {
    // eslint-disable-next-line no-var
    var _azleCanisterClassInstance: any;
}

globalThis._azleCanisterMethodsIndex = 0;

globalThis.TextDecoder = TextDecoder;
globalThis.TextEncoder = TextEncoder;
