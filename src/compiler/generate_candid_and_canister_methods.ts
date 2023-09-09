import { CanisterMethods } from './utils/types';

export function generateCandidAndCanisterMethods(mainJs: string): {
    candid: string;
    canisterMethods: CanisterMethods;
} {
    const vm = require('vm');

    const sandbox = {
        globalThis: {},
        exports: {},
        console,
        TextDecoder,
        TextEncoder
    };
    const context = new vm.createContext(sandbox);

    const script = new vm.Script(mainJs);
    script.runInContext(context);

    return {
        candid: (sandbox.globalThis as any)._azleCandidService,
        canisterMethods: (sandbox.globalThis as any)._azleCanisterMethods
    };
}
