globalThis.TextDecoder = require('text-encoding').TextDecoder;
globalThis.TextEncoder = require('text-encoding').TextEncoder;

globalThis._azleCandidInitParams = [];
globalThis._azleCandidMethods = [];

globalThis.console = {
    ...globalThis.console,
    log: (...args) => {
        ic.print(...args);
    }
};
