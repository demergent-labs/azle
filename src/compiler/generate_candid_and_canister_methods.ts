import { CanisterMethods } from './utils/types';

export function generateCandidAndCanisterMethods(mainJs: string): {
    candid: string;
    canisterMethods: CanisterMethods;
} {
    const vm = require('vm');

    const sandbox = {
        globalThis: {},
        crypto: {
            getRandomValues: () => {
                let array = new Uint8Array(32);

                for (let i = 0; i < array.length; i++) {
                    array[i] = Math.floor(Math.random() * 256);
                }

                return array;
            }
        },
        exports: {},
        console,
        TextDecoder,
        TextEncoder
    };
    const context = new vm.createContext(sandbox);

    const script = new vm.Script(mainJs);
    script.runInContext(context);

    return {
        candid: (sandbox.exports as any).canisterMethods.candid,
        canisterMethods: (sandbox.exports as any).canisterMethods
    };
}
