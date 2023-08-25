import { ic } from './ic';

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
