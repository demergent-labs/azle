import './state';

// @ts-ignore
import { TextDecoder, TextEncoder } from 'fast-text-encoding';

// In the case of executing this file in an environment that has
// the global `window` or `global` objects defined (such as our tests in Node.js),
// then TextDecoder and TextEncoder will be undefined above.
// Thus we use ?? to handle those cases.
globalThis._azleDispatch({
    type: 'SET_TEXT_DECODER',
    payload: TextDecoder ?? global.TextDecoder ?? window.TextDecoder,
    location: {
        filepath: 'azle/src/stable/lib/text_decoder_and_encoder.ts',
        functionName: ''
    }
});

globalThis._azleDispatch({
    type: 'SET_TEXT_ENCODER',
    payload: TextEncoder ?? global.TextEncoder ?? window.TextEncoder,
    location: {
        filepath: 'azle/src/stable/lib/text_decoder_and_encoder.ts',
        functionName: ''
    }
});
